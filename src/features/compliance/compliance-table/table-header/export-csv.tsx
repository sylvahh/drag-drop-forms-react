import * as React from "react";
import AppButton from "@/components/app/app-button";
import { HeaderProps } from ".";
import exportCustomersCSV from "@/services/customer/export-customers-csv";
import { toast } from "sonner";
import useAppSelector from "@/store/hooks";
import useCustomNavigation from "@/hooks/use-navigation";

export default React.memo(function ExportCSV(props: HeaderProps) {
	const { business } = useAppSelector("business");
	const [isLoading, setIsLoading] = React.useState(false);
	const { queryParams } = useCustomNavigation();

	// Get filter parameters
	const queries = queryParams.getQueries([
		"page",
		"customer_status",
		"search",
		"created_at",
		"last_transaction_date",
	]);

	const handleExportCSV = async () => {
		if (!business.id) return;
		try {
			toast.info("Exporting CSV...");
			setIsLoading(true);
			const response = await exportCustomersCSV({
				business_id: business.id ?? "",
				...(queries as any),
			});

			const fileName = `customers_${new Date().toISOString()}_${Object.entries(queries)
				.map(([key, value]) => `${key}=${value}`)
				.join("_")}.csv`;

			// Create a temporary link element
			const link = document.createElement("a");
			link.href = response.csv_link;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error(error);
			toast.error("Error exporting CSV");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AppButton
			variant="black"
			className=""
			onClick={handleExportCSV}
			isLoading={isLoading}
			disabled={props.disabled}
		>
			Export CSV
		</AppButton>
	);
});
