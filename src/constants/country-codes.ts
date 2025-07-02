export type CountryCode = {
	id: string;
	name: string;
	code: string;
	iso: string;
};

export const countryCodes: CountryCode[] = [
	{
		id: "1",
		name: "United States",
		code: "+1",
		iso: "US",
	},
	{
		id: "2",
		name: "United Kingdom",
		code: "+44",
		iso: "GB",
	},
	{
		id: "3",
		name: "Nigeria",
		code: "+234",
		iso: "NG",
	},
	{
		id: "4",
		name: "Canada",
		code: "+1",
		iso: "CA",
	},
	{
		id: "5",
		name: "India",
		code: "+91",
		iso: "IN",
	},
	{
		id: "6",
		name: "South Africa",
		code: "+27",
		iso: "ZA",
	},
	{
		id: "7",
		name: "Australia",
		code: "+61",
		iso: "AU",
	},
	{
		id: "8",
		name: "China",
		code: "+86",
		iso: "CN",
	},
	{
		id: "9",
		name: "Germany",
		code: "+49",
		iso: "DE",
	},
	{
		id: "10",
		name: "France",
		code: "+33",
		iso: "FR",
	},
	{
		id: "11",
		name: "Brazil",
		code: "+55",
		iso: "BR",
	},
	{
		id: "12",
		name: "Japan",
		code: "+81",
		iso: "JP",
	},
	{
		id: "13",
		name: "Mexico",
		code: "+52",
		iso: "MX",
	},
	{
		id: "14",
		name: "Italy",
		code: "+39",
		iso: "IT",
	},
	{
		id: "15",
		name: "Spain",
		code: "+34",
		iso: "ES",
	},
];

// Default country code to use
export const defaultCountryCode = countryCodes[0]; // United States
