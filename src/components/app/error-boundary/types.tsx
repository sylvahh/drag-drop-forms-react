export type ErrorBoundaryState = {
	errorInfo: React.ErrorInfo;
	error: Error;
	hasError: boolean;
};

export type ErrorBoundaryProps = {
	children?: any;
	user?: string;
};
