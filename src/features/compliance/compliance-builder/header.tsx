import BackButton from "@/components/app/back-button";
import { useFormBuilder } from "./builder-context";
import { Input } from "@/components/ui/form-input";
import * as React from "react";
import { ArrowLeft, Check, Download, Eye, PenLine } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AppButton from "@/components/app/app-button";
import useCustomNavigation from "@/hooks/use-navigation";

export default function Header() {
	const { complianceFlow, updateComplianceFlow, lastUpdatedAt } = useFormBuilder();
	const { queryParams } = useCustomNavigation();

	const [name, setName] = React.useState("");
	const [editMode, setEditMode] = React.useState(false);

	const complianceName = React.useMemo(() => {
		const name = complianceFlow?.name ?? "untitled";
		setName(name);
		return name;
	}, [complianceFlow]);

	const save = () => {
		updateComplianceFlow({ name });
		setEditMode(false);
	};

	const preview = () => {
		queryParams.set("tab", "preview");
	};

	return (
		<div className="px-5 py-3 bg-gray-100/20 border-b border-gray-200 flex justify-between">
			<div className="flex items-center gap-2">
				<BackButton
					icon={<ArrowLeft />}
					text="Back to flows"
					className="text-neutral-600 body-3 hover:!scale-100"
				/>

				<Separator className="h-8 " orientation="vertical" />

				<div className="flex flex-col gap-0">
					<div className="flex items-center ">
						{editMode ? (
							<React.Fragment>
								<Input
									value={name}
									onChange={(e) => setName(e.target.value)}
									containerStyle="!w-fit"
									className="!p-0 !rounded-sm !w-20 body-3"
								/>
								<Check onClick={save} className="ml-1 size-3.5" />
							</React.Fragment>
						) : (
							<React.Fragment>
								<h1 className="body-3 text-neutral-900">{complianceName} </h1>
								<PenLine onClick={() => setEditMode(!editMode)} className="ml-1 size-3.5" />
							</React.Fragment>
						)}
					</div>
					<small className="body-4 text-neutral-700">
						Last Saved:{" "}
						{new Date(lastUpdatedAt).toLocaleString("default", {
							month: "numeric",
							day: "numeric",
							year: "numeric",
							hour: "numeric",
							minute: "2-digit",
							second: "2-digit",
						})}
					</small>
				</div>
			</div>
			<div className="flex gap-2 items-center">
				<AppButton
					variant="outline"
					leftIcon={<Download className="size-4" />}
					className="flex items-center gap-1 py-2 rounded-lg border-neutral-300"
				>
					Export JSON
				</AppButton>
				<Separator orientation="vertical" className="h-8" />
				<AppButton
					variant="outline"
					onClick={preview}
					leftIcon={<Eye className="size-4" />}
					className="flex items-center gap-1 py-2 rounded-lg border-neutral-300"
				>
					Preview
				</AppButton>
			</div>
		</div>
	);
}
