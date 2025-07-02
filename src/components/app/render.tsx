import * as React from "react";
import LoadingBox from "./loading-box";
import ErrorBox from "./error-box";
import classNames from "classnames";
import { LOADER_TYPE } from "./spinner";
import ErrorBoundary from "./error-boundary";
import DataNotFound from "./data-not-found";
import EmptyData from "./empty-data";

type RenderProps = {
	children?: any;
	isError?: boolean;
	error?: unknown;
	loadingComponent?:
		| React.ReactNode
		| (() => React.ReactNode)
		| ((...args: any[]) => React.ReactNode);
	loadingComponentArgs?: any[];
	errorComponent?: React.ReactNode;
	isLoading?: boolean;
	roundedBg?: boolean;
	loadingPosition?: "top" | "center";
	loadingBoxClass?: string;
	loadType?: LOADER_TYPE;
	size?: "sm" | "md" | "lg";
	notFound?: boolean;
	notFoundComponent?: React.ReactNode;
	notFoundTitle?: string;
	notFoundText?: string;
	notFoundIcon?: string;
	notFoundClass?: string;
	isEmpty?: boolean;
	emptyComponent?: React.ReactNode;
	emptyClass?: string;
	emptyTitle?: string;
	emptyText?: string;
	emptyIcon?: string;
};

export default React.memo(function Render(props: RenderProps) {
	const {
		children,
		isLoading = false,
		isError = false,
		error,
		errorComponent,
		loadingComponent,
		loadingPosition = "top",
		size = "md",
		roundedBg = false,
		loadingBoxClass,
		// loadType = "simple",
		notFound = false,
		notFoundComponent,
		notFoundTitle,
		notFoundText,
		notFoundIcon,
		notFoundClass,
		loadType = "polygon",
		isEmpty = false,
		emptyComponent,
		emptyClass,
		emptyTitle = "No data",
		emptyText = "No data found",
		emptyIcon,
	} = props;

	const loadingBoxClx = classNames(loadingBoxClass, {
		"rounded-xl": roundedBg,
	});
	if (isLoading) {
		if (loadingComponent) {
			if (typeof loadingComponent === "function")
				return loadingComponent(...(props?.loadingComponentArgs ?? []));
			return loadingComponent;
		} else
			return (
				<LoadingBox
					classNames={loadingBoxClx}
					spinnerSize={size}
					position={loadingPosition}
					load_type={loadType}
				/>
			);
	}

	if (isError && !notFound) {
		if (errorComponent) return errorComponent;
		else return <ErrorBox error={error} />;
	}

	if (notFound) {
		if (notFoundComponent) return notFoundComponent;
		else
			return (
				<DataNotFound
					title={notFoundTitle}
					text={notFoundText}
					icon={notFoundIcon}
					className={notFoundClass}
				/>
			);
	}
	if (!isLoading && !isError && isEmpty) {
		if (emptyComponent) return emptyComponent;

		return (
			<EmptyData title={emptyTitle} text={emptyText} className={emptyClass} icon={emptyIcon} />
		);
	}
	return (
		<React.Fragment>
			<ErrorBoundary>{children}</ErrorBoundary>
		</React.Fragment>
	);
});
