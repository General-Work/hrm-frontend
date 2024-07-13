import { SvelteKitAuth } from '@auth/sveltekit';
import CredentialsProvider from '@auth/sveltekit/providers/credentials';
import { accountConfirmation, userInfo } from './auth';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {},
				otp: {}
			},
			async authorize(credentials): Promise<any> {
				const { email, otp } = credentials as {
					email: string;
					otp: string;
				};
				return new Promise(async (resolve, reject) => {
					try {
						const user = await accountConfirmation({ email, otp });
						if (!user.success) {
							reject(user.message || 'Invalid credentials');
							return;
						}
						resolve(user.data);
					} catch (error) {
						reject(error);
					}
				});
			}
		})
	],
	session: {
		strategy: 'jwt',
		maxAge: 1 * 24 * 60 * 60
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				//@ts-ignore
				token.accessToken = user.accessToken;
				// token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			//@ts-ignore
			session.accessToken = token.accessToken;
			//@ts-ignore

			// session.user = token.user;

			return session;
		}
	},
	secret: import.meta.env.VITE_AUTH_SECRET,
	debug: process.env.NODE_ENV == 'development',
	trustHost: true,
	pages: {
		signIn: '/login',
		error: '/login'
	}
});
