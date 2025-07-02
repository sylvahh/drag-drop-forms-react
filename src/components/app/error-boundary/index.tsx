"use client";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./types";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state = {
		error: {} as Error,
		errorInfo: {} as React.ErrorInfo,
		hasError: false,
	};

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// const sendData = {
		// 	source: "web",
		// 	message: error.message,
		// 	context: JSON.stringify(error),
		// 	userId: this.props.user ?? null,
		// 	isCritical: true,
		// };

		// axios.post(`/errors/`, sendData).catch(() => null);

		return this.setState({
			hasError: true,
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		const handlePress = () => {
			this.setState({ hasError: false });
		};

		if (!this.state.hasError) return this.props.children;
		return (
			<div className="w-full py-20">
				<div className="w-fit mx-auto flex flex-col gap-1 items-center justify-center">
					<AlertCircle name="bus-alert" className="size-20" color="black" />
					<p className="text-xl">Oops....</p>
					<p className="text-lg">Something Went Wrong</p>
					<p className="text-sm">{this.state.error && this.state.error.toString()}</p>
					<Button onClick={handlePress} className="mt-2">
						Retry
					</Button>
				</div>
			</div>
		);
	}
}

export default ErrorBoundary;
