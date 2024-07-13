export const formDataConfig = {
	headers: {
		'Content-Type': 'multipart/form-data'
	}
};

export const CITIZENSHIPLIST = ['Ghanaian', 'Non-Ghanaian'].map((item) => item.toUpperCase());

export const DISABILITYLIST = [
	'None',
	'Deaf or Hard of earing',
	'Mental Health Condition',
	'Intellectual Disability',
	'Acquired Brain Injuries',
	'Spectrum Disorder',
	'Physical Disability',
	'Upper lim disability',
	'Lower lim disability',
	'Manual Dexterity',
	'Disability in co-ordination with different organs of the body',
	'Visual Imperment'
].map((item) => item.toUpperCase());

export const TITLELIST = ['MR', 'MRS', 'MISS', 'DR', 'PROF'];
export const GENDERLIST = ['MALE', 'FEMALE'];

export const ACCOMODATIONSOURCE: string[] = ['OFFICIAL', 'RENTED', 'PERSONAL'];

export const ACCOMODATIONTYPE: string[] = [
	'Flat',
	'Compound house',
	'Self-contained',
	'Semi-detached',
	'Detached',
	'Out-house'
].map((item) => item.toUpperCase());

export const DELIVERYTPES = ['CS', 'NORMAL'];
export const ACCOUNTTYPE = ['SAVINGS', 'CURRENT'];

export const CERTIFICATES = [
	'PROFESSOR',
	'PHD',
	'MASTERS DEGREE',
	'FIRST DEGREE',
	'DIPLOMA',
	'CERTIFICATE'
];
