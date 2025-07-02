import React from "react";
import eye from "./assets/eye.svg";
import eyeSlash from "./assets/eye-slash.svg";
import classNames from "classnames";

type InputNativeAttributes = React.ComponentPropsWithRef<"input">;

type Ref = HTMLInputElement;

interface InputProps extends InputNativeAttributes {
	label?: string;
	disabled?: boolean;
	containerStyle?: string;
	hideIcon?: boolean;
	invalid?: boolean;
	errorMessage?: string;
	overrideInvalid?: boolean;
}

const Input = React.forwardRef<Ref, InputProps>((props: InputProps, ref) => {
	const {
		name,
		type,
		label,
		className,
		placeholder,
		disabled,
		containerStyle,
		hideIcon,
		invalid,
		overrideInvalid: override_invalid,
		errorMessage,
		...rest
	} = props;
	const [togglePassword, setTogglePassword] = React.useState(false);

	const showPassword = type === "password" && !hideIcon && togglePassword;
	const unChecked = type === "checkbox" && !rest.checked;

	const { isInvalid } = React.useMemo(() => {
		let isInvalid = false;
		const userInput = rest.value?.toString();
		if (override_invalid) {
			isInvalid = true;
		} else if (invalid && !userInput && rest.required) {
			isInvalid = true;
		}
		return { isInvalid };
	}, [invalid, rest.value, rest.required, override_invalid]);

	const container = classNames("input-container z-50 ", containerStyle);

	const cn = classNames(className, {
		invalid: isInvalid || unChecked || errorMessage,
	});

	const errorCn = classNames("text-red-500 text-xs", {
		hidden: !errorMessage,
	});
	return (
		<div className={container}>
			{label && (
				<label htmlFor={name} className="capitalize ">
					{label} {rest.required && "*"}
				</label>
			)}
			<input
				ref={ref}
				className={cn}
				type={showPassword ? "text" : type}
				id={name}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
				{...rest}
			/>
			{type === "password" && !hideIcon ? (
				<div id="toggleBtn" onClick={() => setTogglePassword(!togglePassword)} className="icon">
					<img src={togglePassword ? eyeSlash : eye} alt="eye icon" className="w-5" />
				</div>
			) : null}
			<small className={errorCn}>{errorMessage}</small>
		</div>
	);
});

Input.displayName = "Input";

export default Input;
