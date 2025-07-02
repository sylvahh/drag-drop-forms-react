"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import classNames from "classnames";
import EmptyData from "@/components/app/empty-data";
import { Badge } from "@/components/ui/badge";
import { ComplianceFlow } from "@/types/compliance.types";
import AppButton from "@/components/app/app-button";
import TableActions from "./table-actions";

type TableProps = {
	data: ComplianceFlow[];
	isEmpty: boolean;
};

export default function ComplianceTable(props: TableProps) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No Compliance Flows added"
				text="Add your first compliance flow to start managing your compliance flows."
				className="!justify-start pt-10"
				action={<AppButton variant="black">Add Compliance Flow</AppButton>}
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-left">
					<TableHead>
						<Badge
							className="rounded-full size-2.5 p-0 bg-transparent border-[#5E5E5E] border-[1.5px]"
							title="Status"
						/>
					</TableHead>
					<TableHead>Flow Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.created_at);
					const statusClx = classNames("rounded-full size-2.5 p-0", {
						"bg-primary-300": item.status === "published",
						"bg-neutral-500": item.status === "draft",
					});

					return (
						<TableRow
							key={item.id}
							className="caption-standard whitespace-nowrap !text-neutral-700 !py-2 [&_td]:!py-2 cursor-pointer"
						>
							<TableCell>
								<Badge title={item.status.split("_").join(" ")} className={statusClx} />
							</TableCell>
							<TableCell className="first-letter:uppercase">{item.name}</TableCell>
							<TableCell className="capitalize" title={item.description}>
								{item.description}
							</TableCell>

							<TableCell>
								{date.toLocaleDateString("en-us", {
									dateStyle: "medium",
								})}
							</TableCell>

							<TableCell className="capitalize">
								<TableActions id={item.id} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
