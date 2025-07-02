import AppLogo from "@/components/app/app-logo";
import AuthLink from "./auth-link";
import ErrorBoundary from "../../error-boundary";
export type AuthLinkType = "login" | "register";

type ContainerProps = {
	children: React.ReactNode;
	auth_link?: AuthLinkType;
};
export default function AuthContainer({ children, auth_link }: ContainerProps) {
	return (
		<div className="flex flex-col gap-24 px-20 py-10">
			<header className="flex items-center justify-between">
				<AppLogo scope="4" size={128} />
				<AuthLink link_type={auth_link} />
			</header>
			<div className="flex items-center justify-center w-full mx-auto md:max-w-4xl lg:max-w-6xl">
				<ErrorBoundary>{children}</ErrorBoundary>
			</div>
		</div>
	);
}
