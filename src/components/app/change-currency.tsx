import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import classNames from "classnames";
import Image from "next/image";
import getCurrencies from "@/services/extras/get-currencies";
import { Currency } from "@/types/currency.types";
import useCookie from "@/hooks/use-cookie";
import { variables } from "@/constants";

type SelectProps = {
	containerStyle?: string;
	selectStyle?: string;
};

export default React.memo(function ChangeCurrency(props: SelectProps) {
	const [currencies, setCurrencies] = React.useState<Currency[]>([]);
	const { cookie, setCookie } = useCookie(variables.STORAGE_KEYS.currency_id, "");

	// const [activeCurrency, setActiveCurrency] = React.useState<Currency | null>(null);

	const currency_id = cookie ?? "";

	const { isFetching } = useQuery(["get-currencies"], getCurrencies, {
		onSuccess: (data) => {
			setCurrencies(data);
			// setActiveCurrency(data.find((item) => item.id === currency_id) ?? null);
		},
	});

	const change = (id: string) => {
		setCookie(id);
	};

	const currencyOptions = currencies.map((item) => ({
		value: item.id,
		title: item.currency_code,
		flag: item.currency_flag,
	}));

	const container = classNames("", props.containerStyle);

	const selectContainer = classNames(
		"w-full  shadow-none capitalize !outline-none !ring-0",
		props.selectStyle
	);

	return (
		<div className={container}>
			<Select value={currency_id} onValueChange={change} name={"currency_id"} disabled={isFetching}>
				<SelectTrigger className={selectContainer}>
					<SelectValue placeholder={"Select a currency"} />
				</SelectTrigger>
				<SelectContent className="overflow-y-auto max-h-64">
					{currencyOptions.map((item, idx) => (
						<SelectItem value={item.value} key={idx} className="">
							<div className="flex items-center gap-2 capitalize">
								<Image src={item.flag} alt={item.title} width={20} height={20} />
								<span className="w-full">{item.title}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
});
