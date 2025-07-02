export type PaginatedResponse<T> = {
	docs: T[];
	totalDocs: number;
	limit: number;
	page: number;
	totalPages: number;
	hasNextPage: boolean;
	nextPage: number | null;
	hasPrevPage: boolean;
	prevPage: number | null;
	pagingCounter: number;
};

export type PaginationQuery = {
	page?: number;
	limit?: number;
};

export type UploadMeta = {
	base64: string;
	file_name: string;
	mime_type: string;
	file_size: number;
};