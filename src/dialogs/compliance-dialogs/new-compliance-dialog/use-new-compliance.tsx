import ensureError, { formatZodErrors } from "@/lib/ensure-error";
import * as React from "react";
import { toast } from "sonner";
import { newComplianceInitial, newComplianceSchema } from "./schema";
import useAppSelector from "@/store/hooks";
import useActions from "@/store/actions";
import createCompliance from "@/services/compliance/create-compliance";
import { z } from "zod";
import useCustomNavigation from "@/hooks/use-navigation";

export default function useNewCompliance() {
	const { dialog } = useAppSelector("ui");
	const [formData, setFormData] = React.useState(newComplianceInitial);
	const [errors, setErrors] = React.useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = React.useState(false);
	const { ui } = useActions();
	const { navigate } = useCustomNavigation();

	const updateForm = (
		name: keyof typeof formData,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
	) => {
		setErrors({});
		const value = typeof e === "string" ? e : e.target.value;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const submit = async () => {
		setErrors({});
		setIsLoading(true);
		try {
			const formValues = newComplianceSchema.parse(formData);

			const response = await createCompliance({
				name: formValues.name,
				description: formValues.description,
				status: "draft",
			});

			if (response) {
				showSuccessDialog(response.id);
			}
		} catch (err) {
			if (err instanceof z.ZodError) {
				const errors = formatZodErrors(err);
				setErrors(errors);
				return;
			}
			const errMsg = ensureError(err).message;
			toast.error(errMsg, {
				position: "top-center",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const showSuccessDialog = (id: string) => {
		const proceed = () => {
			ui.resetDialog();
			navigate(`/builder/${id}`);
		};
		ui.changeDialog({
			show: true,
			type: "success",
			data: {
				title: "Compliance flow created successfully",
				text: "You can now use this compliance flow to create compliance, do you to proceed to the next step?",
			},
			action: proceed,
		});
	};

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "new_compliance_flow";
	}, [dialog.show, dialog.type]);

	const close = () => {
		if (isLoading) return;
		setFormData(newComplianceInitial);
		ui.resetDialog();
	};

	return {
		open,
		close,
		isLoading,
		formData,
		updateForm,
		errors,
		submit,
	};
}
