import { Toaster } from "sonner";

export default function AppToaster() {
	return (
		<Toaster
			richColors={true}
			position={"top-right"}
			toastOptions={{
				classNames: {
					error: "!bg-error-500 !text-white",
				},
			}}
		/>
	);
}
