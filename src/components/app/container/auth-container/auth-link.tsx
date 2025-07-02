import Link from "next/link";
import { AuthLinkType } from ".";

type AuthLinkProps = {
	link_type?: AuthLinkType;
};
export default function AuthLink({ link_type }: AuthLinkProps) {
	if (!link_type) return null;

	const data = authLinkData[link_type];

	if (!data) return null;

	return (
		<div className="flex items-center gap-5">
			<p className="text-neutral-700 body-1 whitespace-nowrap">{data.text}</p>
			<Link href={data.link_href} className="w-full py-2 rounded-lg button-primary">
				{data.link_text}
			</Link>
		</div>
	);
}

const authLinkData = {
	register: {
		text: "Don't have an account?",
		link_text: "Sign up",
		link_href: "/register",
	},
	login: {
		text: "Already have an account?",
		link_text: "Sign in",
		link_href: "/",
	},
};
