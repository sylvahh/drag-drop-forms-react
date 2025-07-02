import React from "react";
import "./index.css";
import classNames from "classnames";

type ButtonNativeAttributes = React.ComponentPropsWithoutRef<"button">;

// define the ref type
type Ref = HTMLButtonElement;

type LoaderType = "simple" | "spinner" | "bars" | "dots" | "bars-dots";
type Variant =
	| "default"
	| "primary"
	| "muted"
	| "secondary"
	| "outline"
	| "ghost"
	| "destructive"
	| "black";

interface ButtonProps extends ButtonNativeAttributes {
	isLoading?: boolean;
	disabled?: boolean;
	className?: string;
	loaderType?: LoaderType;
	variant?: Variant;
	leftIcon?: React.ReactElement;
	rightIcon?: React.ReactElement;
}
const AppButton = React.forwardRef<Ref, ButtonProps>((props: ButtonProps, ref) => {
	const {
		type,
		rightIcon,
		loaderType = "bars",
		leftIcon,
		isLoading,
		disabled,
		className,
		variant = "default",
		children,
		...rest
	} = props;
	const { newIcon: icon, iconPlacement } = React.useMemo(() => {
		let newIcon = rightIcon || leftIcon;

		if (isLoading) {
			newIcon = <div data-testid={loaderType} className={`w-4 h-4 ${loaderType}`} />;
		}
		return {
			newIcon,
			iconPlacement: rightIcon ? ("right" as const) : ("left" as const),
		};
	}, [isLoading, rightIcon, leftIcon, loaderType]);

	const cn = classNames(className, {
		"button-default": variant === "default",
		"button-primary text-white": variant === "primary",
		"button-secondary": variant === "secondary",
		"button-destructive ": variant === "destructive",
		"button-outline": variant === "outline",
		"button-muted": variant === "muted",
		"button-ghost": variant === "ghost",
		"button-black": variant === "black",
	});
	return (
		<button
			type={type ? "submit" : "button"}
			ref={ref}
			className={cn}
			disabled={isLoading || disabled}
			{...rest}
		>
			{/** render icon before */}
			{icon && iconPlacement === "left" ? (
				<span className={`inline-flex shrink-0 self-center ${children && !isLoading && "mr-2"}`}>
					{icon}
				</span>
			) : null}

			{/** hide button text during loading state */}
			{!isLoading && children}

			{/** render icon after */}
			{icon && iconPlacement === "right" ? (
				<span className={`inline-flex shrink-0 self-center  ${children && !isLoading && "ml-2"}`}>
					{icon}
				</span>
			) : null}
		</button>
	);
});

AppButton.displayName = "AppButton";

export default AppButton;
