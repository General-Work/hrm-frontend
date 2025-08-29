import type { IApplicantInfo, IUserInfo } from '$lib/types';
import { writable } from 'svelte/store';
import axios from 'axios';
import { axiosError, callResult, queryResult } from './shared';
import axiosInstance, { setAuthToken } from '$lib/axios';
import { getInitials, showError } from '$lib/utils';
// import axiosInstance from '$lib/axios';

export type IUserType = 'APPLICANT' | 'STAFF';

export const userInfo = writable<IUserInfo | null>();
export const isAuthenticated = writable(false);
export const authToken = writable<string>('');
export const accessToken = writable('');
export const idToken = writable('');
export const userType = writable<IUserType | null>(null);
export const authError = writable<unknown>();

let adapter: AuthAdapter | null = null;
let initialized = false;

function extractNumber(input: string): string {
	const trimmed = input.replace(/^0+/, '');
	return trimmed;
}

async function loginNewStaff(data: { contact: string; otp: string }) {
	try {
		const ret = await axiosInstance.post(`/applicant/login`, {
			...data,
			contact: extractNumber(data.contact)
		});
		// console.log('here', ret);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function generateOtp(phoneNumber: string) {
	try {
		const d = extractNumber(phoneNumber);
		const ret = await axiosInstance.get(`/applicant/generate-otp/${d}`);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

async function loginStaff(data: { staffId: string; password: string }) {
	try {
		const ret = await axiosInstance.post('/staff/login', {
			staffIdentificationNumber: data.staffId,
			password: data.password
		});
		// console.log({ ret });
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readAuthStaff() {
	try {
		const ret = await axiosInstance.get('/staff/auth-staff');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function generalLogin(email: string, otp: string, type: IUserType) {
	// console.log(initialized)
	if (initialized) {
		const authenticated = await adapter?.login(email, otp, type);
		if (authenticated) {
			setTokenDetails(adapter.idTokenParsed, type);
		} else {
			setTokenDetails(undefined, undefined);
		}
	}
}

async function setTokenDetails(details: IParsedToken | undefined, type: IUserType | undefined) {
	if (!details) {
		isAuthenticated.set(false);
		accessToken.set('');
		idToken.set('');
		userInfo.set(<any>null);
		userType.set(null);
	} else {
		if (!adapter) return;
		isAuthenticated.set(true);
		accessToken.set(adapter.token!);
		idToken.set(adapter.idToken!);
		authError.set(null);
		setAuthToken(adapter.token!);
		if (adapter.loginInfo) {
			adapter.loginInfo!.initials = `${getInitials(adapter.loginInfo.firstName)}${getInitials(adapter.loginInfo.lastName)}`;
			// adapter.loginInfo!.profileImage = adapter.loginInfo!.profileImage || '';
			// adapter.loginInfo!.pin = '';
			userInfo.set(adapter.loginInfo!);
		} else {
			setTimeout(async () => {
				if (type !== 'STAFF') return;
				try {
					const d = await readAuthStaff();
					if (d.success) {
						if (!adapter) return;
						adapter.loginInfo = d.data;
						adapter.loginInfo!.initials = `${getInitials(adapter.loginInfo!.firstName)}${getInitials(adapter.loginInfo!.lastName)}`;

						userInfo.set(adapter.loginInfo!);
					} else {
						// todo: what to do if we do not get the details we need
						console.log('Login failed with', d);
						showError(d.message);
						signout(type);
					}
				} catch (e) {
					isAuthenticated.set(false);
					accessToken.set('');
					idToken.set('');
					userInfo.set(<any>null);
					authError.set(e);
				}
			});
		}
		userType.set(type as IUserType);
	}
}

export async function authInit(type: IUserType, loginUrl?: string) {
	adapter = new AuthAdapter();
	try {
		const authenticated = adapter.init({
			onLoad: 'login-required',
			lsKey: type === 'STAFF' ? '__sss' : '__aaa',
			loginUrl
			// userType: type
		});
		if (authenticated) {
			setTokenDetails(adapter.idTokenParsed, type);
		} else {
			setTokenDetails(undefined, undefined);
		}
		initialized = true;
		// isLoading.set(false);
		// console.log(initialized);
	} catch (e) {
		initialized = false;
		console.log(initialized, e);

		authError.set(e ? e : 'Not initialized');
	}
}

export async function refreshToken(type: IUserType) {
	if (!initialized) return;
	try {
		if (!adapter) return;
		const refreshed = await adapter.updateToken(30);
		if (refreshed) {
			setTokenDetails(adapter.idTokenParsed, type);
		}
	} catch (e) {
		// todo: what to do with this?
	}
}

class AuthAdapter {
	refreshToken?: string;
	token?: string;
	idToken?: string;
	idTokenParsed?: IParsedToken;
	refreshTokenParsed?: IParsedToken;
	authenticated: boolean = false;
	lastError: unknown;
	static defaultLoginUrl: string = '/login';
	static defaultLsKey = '__xxx';
	loginInfo?: IUserInfo | IApplicantInfo;
	prevUrl?: string;
	private lsKey: string;
	private loginUrl: string;
	// private userType: IUserType;

	constructor(config?: Partial<IAuthAdapterConfig>) {
		this.lsKey = config?.lsKey || AuthAdapter.defaultLsKey;
	}

	init(config: IAuthAdapterConfig) {
		if (config.lsKey) {
			this.lsKey = config.lsKey;
		}
		if (config.loginUrl) this.loginUrl = config.loginUrl;

		// this.userType = config.userType;

		this.authenticated = false;
		var data = localStorage.getItem(this.lsKey); // Use instance lsKey
		if (data == null) return this.handleConfig(config);
		try {
			const authData = JSON.parse(data) as ITokenInfo;
			if (authData == null) return false;

			this.token = authData.accessToken;
			this.idToken = authData.accessToken;
			this.refreshToken = authData.refreshToken;
			this.idTokenParsed = AuthAdapter.parseJwt(this.idToken);
			this.refreshTokenParsed = AuthAdapter.parseJwt(this.refreshToken);
			this.authenticated = this.hasValidToken();
			// todo: check if not expired
			return true;
		} catch (e) {
			this.lastError = e;
			return false;
		}
	}

	async login(email: string, otp: string, type: IUserType) {
		try {
			var ret =
				type === 'STAFF'
					? await loginStaff({ staffId: email, password: otp })
					: await loginNewStaff({ contact: email, otp });
			if (ret.success) {
				this.token = ret.data.accessToken;
				this.idToken = ret.data.accessToken;
				this.refreshToken = ret.data.accessToken; // todo: get correct refresh token

				this.idTokenParsed = AuthAdapter.parseJwt(this.idToken);
				this.refreshTokenParsed = AuthAdapter.parseJwt(this.refreshToken);

				if (this.idTokenParsed) {
					this.loginInfo = ret.data;
					const tokens = {
						accessToken: this.idToken!,
						refreshToken: this.refreshToken!
					};
					localStorage.setItem(this.lsKey, JSON.stringify(tokens)); // Use instance lsKey
				}
				this.authenticated = !!this.idTokenParsed;
				return this.authenticated;
			} else {
				this.lastError = ret.message;
				showError(ret.message);
				return false;
			}
		} catch (e) {
			this.lastError = e;
			return false;
		}
	}

	async updateToken(minExpiration: number) {
		if (!this.refreshToken) return false;
		if (this.idTokenParsed) {
			const timeLeft = this.idTokenParsed.exp - new Date().getTime() / 1000;
			if (timeLeft > minExpiration) return false;
		}
		// todo: make the request for the new refresh token
		return false;
	}

	private handleConfig(config: IAuthAdapterConfig) {
		if (config.onLoad === 'check-sso') return;
		if (config.onLoad === 'login-required') {
			const loginUrl = config.loginUrl || AuthAdapter.defaultLoginUrl;
			if (!window.location.href.includes(loginUrl)) {
				this.prevUrl = window.location.href;
				window.location.href = loginUrl;
			}
		}
	}

	private hasValidToken() {
		if (!this.idTokenParsed) return false;
		return this.idTokenParsed.exp > new Date().getTime() / 1000;
	}

	private static parseJwt(token: string) {
		try {
			var b64 = token.split('.')[1];
			b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(
				window
					.atob(b64)
					.split('')
					.map(function (c) {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join('')
			);

			return JSON.parse(jsonPayload) as IParsedToken;
		} catch (e) {
			return undefined;
		}
	}

	clearStorage() {
		localStorage.removeItem(this.lsKey);
	}

	setLsKey(newKey: string) {
		this.lsKey = newKey;
	}

	getLsKey(): string {
		return this.lsKey;
	}

	static async signout(lsKey?: string) {
		const keyToRemove = lsKey || AuthAdapter.defaultLsKey;
		localStorage.removeItem(keyToRemove);
		window.location.href = '/';
	}
}

export async function signout(userType: IUserType) {
	await AuthAdapter.signout(userType === 'APPLICANT' ? '__aaa' : '__sss');
	// window.location.href = '/';
}

interface IAuthAdapterConfig {
	onLoad: 'check-sso' | 'login-required';
	lsKey?: string;
	loginUrl?: string;
	// userType: IUserType;
}

interface IParsedToken {
	aud: string;
	exp: number;
	fundId: string;
	id: string;
	iss: number;
	staffNumber: string;
	scope: string;
	name: string;
}

interface ITokenInfo {
	readonly accessToken: string;
	readonly refreshToken: string;
}
