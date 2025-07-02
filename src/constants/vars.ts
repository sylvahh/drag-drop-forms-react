export type EnvironmentVariables = {
	base_url: string;
	server: string;
	socket: string;
	socket_url: string;
};

export type StorageKeys = {
	email: string;
	session: string;
	currency_id: string;
	business_id: string;
	compliance_status: string;
};

const NODE_ENV = (process.env.NODE_ENV as string) ?? "";

export type Environment = "production" | "development";
const SERVICE_ENV = "development";

const BASE_URL = ``;
const SERVER = "";
const SOCKET = "";
const SOCKET_URL = ``;

const STORAGE_KEYS: StorageKeys = {
	email: "_pi_email",
	session: "_pi_session",
	currency_id: "_pi_currency_id",
	business_id: "_pi_business_id",
	compliance_status: "_pi_compliance_status",
};

const EXTERNAL_LINKS = {
	terms: "",
	privacy: "",
	compliance_form: "",
	invoice_link: "https://prolifi.com",
};	

const SUPPORT_EMAIL = "";

const ACTIVE: EnvironmentVariables = {
	base_url: BASE_URL,
	server: SERVER,
	socket: SOCKET,
	socket_url: SOCKET_URL,
};

export {
	NODE_ENV,
	SERVICE_ENV,
	ACTIVE,
	BASE_URL,
	SERVER,
	SOCKET,
	SOCKET_URL,
	STORAGE_KEYS,
	EXTERNAL_LINKS,
	SUPPORT_EMAIL,
};
