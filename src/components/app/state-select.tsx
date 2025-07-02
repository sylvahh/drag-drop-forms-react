import * as React from "react";
import SelectBox from "../ui/form-input/select-box";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import getStates from "@/services/extras/get-states";

type Props = {
	className?: string;
	value: string;
	onchange: (value: string) => void;
	countryId: string;
	disabled: boolean;
	placeholder?: string;
	invalid?: boolean;
};

export default React.memo(function StateSelect(props: Props) {
	const cn = classNames("", props.className);
	const { isFetching, data } = useQuery(
		["states", props.countryId],
		() => getStates({ country_id: props.countryId }),
		{
			enabled: !!props.countryId,
		}
	);

	const stateOptions = data?.map((state) => ({
		value: state.id,
		title: state.state_name,
	}));

	return (
		<SelectBox
			name="state_id"
			placeholder={props.placeholder ?? "State"}
			options={stateOptions}
			className={cn}
			contentMode="item-aligned"
			side="bottom"
			value={props.value}
			onchange={props.onchange}
			disabled={props.disabled || isFetching}
			invalid={props.invalid}
		/>
	);
});
