import getCountries from "@/services/extras/get-countries";
import useCustomNavigation from "@/hooks/use-navigation";
import { Country } from "@/types/country.types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import classNames from "classnames";
import Image from "next/image";

type SelectProps = {
	containerStyle?: string;
};

export default React.memo(function SelectCountry(props: SelectProps) {
	const { queryParams } = useCustomNavigation();
	const [countries, setCountries] = React.useState<Country[]>([]);

	const country_id = queryParams.get("country_id") ?? "";

	const { isFetching } = useQuery(["select-country"], getCountries, {
		onSuccess: (data) => {
			setCountries(data);
		},
	});

	const change = (id: string) => {
		queryParams.set("country_id", id);
	};

	const countryOptions = countries.map((item) => ({
		value: item.id,
		title: item.country_name,
		flag: item.flag_icon_path,
	}));

	const container = classNames("", props.containerStyle);

	const selectContainer = classNames("w-full  shadow-none capitalize !outline-none !ring-0");

	return (
		<div className={container}>
			<label htmlFor={"country"} className="capitalize text-b-2 text-neutral-500">
				Country
			</label>

			<Select value={country_id} onValueChange={change} name={"country_id"} disabled={isFetching}>
				<SelectTrigger className={selectContainer}>
					<SelectValue placeholder={"Select a country"} />
				</SelectTrigger>
				<SelectContent className="overflow-y-auto max-h-64 ">
					{countryOptions.map((item, idx) => (
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
