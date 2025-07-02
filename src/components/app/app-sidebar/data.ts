import * as icons from "./icons";
export type SidebarLink = {
	name: string;
	path: string;
	icon?: string;
	activeIcon?: string;
	relativePaths?: string[];
	subLinks?: SidebarLink[];
};

export const sidebarLinks: SidebarLink[] = [
	{
		name: "home",
		path: "/home",
		icon: icons.home_01,
		activeIcon: icons.home_02,
		relativePaths: [],
	},

	// {
	// 	name: "collections",
	// 	path: "/collections",
	// 	icon: icons.collections_01,
	// 	activeIcon: icons.collections_02,
	// 	relativePaths: [],
	// 	subLinks: [
	// 		{
	// 			name: "transactions",
	// 			path: "/collections/transactions",
	// 		},
	// 		{
	// 			name: "subscriptions",
	// 			path: "/collections/subscriptions",
	// 			subLinks: [
	// 				{
	// 					name: "plans",
	// 					path: "/collections/subscriptions/plans",
	// 				},
	// 				{
	// 					name: "subscribers",
	// 					path: "/collections/subscriptions/subscribers",
	// 				},
	// 			],
	// 		},

	// 		{
	// 			name: "installments",
	// 			path: "/collections/installments",
	// 			subLinks: [
	// 				{
	// 					name: "plans",
	// 					path: "/collections/installments/plans",
	// 				},
	// 				{
	// 					name: "transactions",
	// 					path: "/collections/installments/transactions",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: "invoices",
	// 			path: "/collections/invoices",
	// 		},

	// 		{
	// 			name: "product pages",
	// 			path: "/collections/product-pages",
	// 		},
	// 		{
	// 			name: "payment links",
	// 			path: "/collections/payment-links",
	// 		},
	// 	],
	// },

	{
		name: "settings",
		path: "/settings",
		icon: icons.settings_01,
		activeIcon: icons.settings_02,
		relativePaths: [],
	},
];
