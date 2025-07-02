import AppDialog from "@/components/app/app-dialog";
import * as React from "react";
import { formFields } from "./data";
import { Input } from "@/components/ui/form-input";
import AppButton from "@/components/app/app-button";
import useNewCustomer from "./use-new-compliance";
import Textarea from "@/components/ui/form-input/textarea";

export default React.memo(function NewComplianceDialog() {
	const { open, close, isLoading, formData, updateForm, submit, errors } = useNewCustomer();

	return (
		<AppDialog
			open={open}
			onClose={close}
			title="Create New Flow"
			description="Add a new compliance flow for businesses"
			titleClassName="text-center body-2 text-neutral-700"
			headerContainerClassName="border-b pb-5 !flex !items-center"
			footer={
				<div className="flex justify-end gap-3">
					<AppButton variant="muted" className="w-24" onClick={close} disabled={isLoading}>
						Cancel
					</AppButton>
					<AppButton variant="black" className="w-24" onClick={submit} isLoading={isLoading}>
						Create Flow
					</AppButton>
				</div>
			}
		>
			<form className="flex flex-col gap-3">
				{formFields.map((item) => {
					const formKey = item.name as keyof typeof formData;

					if (item.type === "textarea") {
						return (
							<Textarea
								key={item.name}
								{...item}
								value={formData[formKey] ?? ""}
								onChange={(e) => updateForm(formKey, e)}
								disabled={isLoading}
								errorMessage={errors[formKey]}
							/>
						);
					}

					return (
						<Input
							key={item.name}
							{...item}
							value={formData[formKey] ?? ""}
							onChange={(e) => updateForm(formKey, e)}
							disabled={isLoading}
							errorMessage={errors[formKey]}
						/>
					);
				})}
			</form>
		</AppDialog>
	);
});
