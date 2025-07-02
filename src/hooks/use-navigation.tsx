"use client";

import { useCallback } from "react";
import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";

const useCustomNavigation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const params = useParams();
	const pathname = location.pathname;
	const fullPathname = `${pathname}${location.search}`;

	// Query parameter utilities
	const queryUtils = {
		queries: searchParams,
		has: (name: string, value?: string) => {
			if (typeof value !== "undefined") {
				return searchParams.getAll(name).includes(value);
			}
			return searchParams.has(name);
		},
		get: (name: string) => searchParams.get(name),
		getQueries: (names: string[]) => {
			return names.reduce((acc, key) => {
				const value = searchParams.get(key);
				if (value) acc[key] = value;
				return acc;
			}, {} as Record<string, string>);
		},
		set: (name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			setSearchParams(params, { replace: true });
		},
		setQueries: (queries: Record<string, string>) => {
			const params = new URLSearchParams(searchParams.toString());
			Object.entries(queries).forEach(([key, value]) => params.set(key, value));
			setSearchParams(params, { replace: true });
		},
		append: (name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.append(name, value);
			setSearchParams(params, { replace: true });
		},
		delete: (name: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.delete(name);
			setSearchParams(params, { replace: true });
		},
		deleteQueries: (names: string[]) => {
			const params = new URLSearchParams(searchParams.toString());
			names.forEach((name) => params.delete(name));
			setSearchParams(params, { replace: true });
		},
	};

	// Navigation utility
	const navigateTo = useCallback(
		(path: string | number, options?: { replace?: boolean }) => {
			if (typeof path === "number") {
				if (path === 0) {
					// No direct refresh in React Router, so force reload
					navigate(0);
					return;
				}
				navigate(path)
			} else {
				if (options?.replace) {
					navigate(path, { replace: true });
				} else {
					navigate(path);
				}
			}
		},
		[navigate]
	);

	return {
		navigate: navigateTo,
		pathname,
		fullPathname,
		params,
		queryParams: queryUtils,
	};
};

export default useCustomNavigation;
