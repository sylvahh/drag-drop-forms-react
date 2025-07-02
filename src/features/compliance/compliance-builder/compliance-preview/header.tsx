import AppButton from "@/components/app/app-button";
import AppLogo from "@/components/app/app-logo";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import updateCompliance from "@/services/compliance/update-compliance";
import { toast } from "sonner";
import * as React from "react";

type HeaderProps = {
	title: string;
	showActions: boolean;
};

export default function Header({ title, showActions }: HeaderProps) {
	const { navigate, params } = useCustomNavigation();
	const [isLoading, setIsLoading] = React.useState(false);
	const id = params.id;

	const handleBack = () => {
		if (isLoading) return;
		navigate("");
	};
	const handlePublish = async () => {
		try {
			setIsLoading(true);
			await updateCompliance({ id, status: "published" });
			toast.success("Compliance published successfully");
			navigate("/compliance");
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="px-5 py-3 bg-gray-100/20 border-b border-gray-200 flex justify-between items-center">
			<div className="flex gap-3 items-center">
				<AppLogo scope="1" />
				<h3 className="body-1">{title}</h3>
			</div>
			{showActions && (
				<div className="flex gap-5 [&_button]:p-2 [&_button]:w-24">
					<AppButton variant="muted" onClick={handleBack} disabled={isLoading}>
						Back
					</AppButton>
					<AppButton variant="black" isLoading={isLoading} onClick={handlePublish}>
						Publish
					</AppButton>
				</div>
			)}
		</div>
	);
}
