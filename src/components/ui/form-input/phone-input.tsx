import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { countryCodes, defaultCountryCode, CountryCode } from "@/constants/country-codes";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { sanitizeNumInput } from "@/lib/sanitize-num-input";

type InputNativeAttributes = React.ComponentPropsWithRef<"input">;

type Ref = HTMLInputElement;

interface PhoneInputProps extends Omit<InputNativeAttributes, "onChange"> {
	label?: string;
	disabled?: boolean;
	containerStyle?: string;
	invalid?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	errorMessage?: string;
	name?: string;
}

const PhoneInput = React.forwardRef<Ref, PhoneInputProps>((props, ref) => {
	const {
		name,
		label,
		className,
		placeholder,
		disabled,
		containerStyle,
		invalid,
		onChange,
		value,
		errorMessage,
		...rest
	} = props;

	// State for selected country code
	const [selectedCountry, setSelectedCountry] = useState<CountryCode>(defaultCountryCode);

	// State for phone number without country code
	const [phoneNumber, setPhoneNumber] = useState<string>("");

	// Set default phone number on initial render
	useEffect(() => {
		if (value) {
			// If the value already has a country code prefix, extract it
			const countryCodeMatch = countryCodes.find((c) => value.startsWith(c.code));

			if (countryCodeMatch) {
				setSelectedCountry(countryCodeMatch);
				setPhoneNumber(value.substring(countryCodeMatch.code.length));
			} else {
				setPhoneNumber(value);
			}
		} else {
			setPhoneNumber("");
		}
	}, [value]);

	// Handle country code change
	const handleCountryChange = (countryId: string) => {
		const country = countryCodes.find((c) => c.id === countryId) || defaultCountryCode;
		setSelectedCountry(country);

		// Update the formatted value with the new country code
		updateFormattedValue(phoneNumber, country);
	};

	// Handle phone number change
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPhone = e.target.value;
		setPhoneNumber( newPhone);

		// Send the phone number without country code to the parent form
		const event = {
			target: {
				name,
				value: newPhone,
			},
		} as React.ChangeEvent<HTMLInputElement>;

		onChange(event);

		// Also update the formatted value
		updateFormattedValue(newPhone, selectedCountry);
	};

	// Update the formatted value with country code
	const updateFormattedValue = (phone: string, country: CountryCode) => {
		const formattedValue = `${country.code}${phone[0] === "0" ? phone.slice(1) : phone}`;

		// Send the formatted value to the parent form
		const formattedEvent = {
			target: {
				name: `formatted_${name}`,
				value: formattedValue,
			},
		} as React.ChangeEvent<HTMLInputElement>;

		onChange(formattedEvent);
	};

	const { isInvalid } = React.useMemo(() => {
		let isInvalid = false;
		const userInput = value?.toString();
		if (invalid && !userInput && rest.required) {
			isInvalid = true;
		}
		return { isInvalid };
	}, [invalid, value, rest.required]);

	const container = classNames("input-container z-50", containerStyle);

	const inputCn = classNames("flex-1 rounded-r-md border p-2", className, {
		invalid: isInvalid || errorMessage,
	});

	const selectCn = classNames(
		"w-24 rounded-l-md border border-r-0 !py-2 !px-3 text-sm bg-white !outline-none !outline-0 input-style",
		{
			invalid: isInvalid || errorMessage,
		}
	);

	const errorCn = classNames("text-red-500 text-xs", {
		hidden: !errorMessage,
	});
	return (
		<div className={container}>
			{label && (
				<label htmlFor={name} className="capitalize outline-0">
					{label} {rest.required && "*"}
				</label>
			)}
			<div className="flex gap-1 items-center">
				{/* Country code dropdown */}
				<Select
					value={selectedCountry.id}
					onValueChange={handleCountryChange}
					name={name}
					disabled={disabled}
					required={rest.required}
				>
					<SelectTrigger className={selectCn}>
						<SelectValue className="!text-[2px]" placeholder={props.placeholder ?? "Select an item"} />
					</SelectTrigger>
					<SelectContent position="popper" side="right">
						{countryCodes.map((item, idx) => (
							<SelectItem value={item.id} key={idx} className="capitalize">
								{item.code} - {item.iso}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Phone number input */}
				<input
					ref={ref}
					className={inputCn}
					type="tel"
					id={name}
					name={name}
					placeholder={placeholder}
					disabled={disabled}
					value={sanitizeNumInput(phoneNumber)}
					onChange={handlePhoneChange}
					{...rest}
				/>
			</div>
			<small className={errorCn}>{errorMessage}</small>
		</div>
	);
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
