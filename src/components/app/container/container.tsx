import classNames from "classnames";
import ErrorBoundary from "../error-boundary";

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
	hasMaxWidth?: boolean;
};

export default function AppContainer({ children, className, hasMaxWidth = true }: ContainerProps) {
	// md:max-w-4xl lg:max-w-7xl
	const cn = classNames("px-5 lg:px-5 py-5 flex-wrap xl:flex-nowrap", className, {
		"md:max-w-4xl lg:max-w-7xl mx-auto": hasMaxWidth,
	});
	return (
		<div className={cn}>
			<ErrorBoundary> {children}</ErrorBoundary>
		</div>
	);
}
