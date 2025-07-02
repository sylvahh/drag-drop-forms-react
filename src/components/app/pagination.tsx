import { PaginatedResponse } from "@/types/global.types";
import Link from "next/link";

export default function Pagination(props: PaginatedResponse<any>) {
	const prev = props.hasPrevPage ? props.prevPage! : props.page;
	const next = props.hasNextPage ? props.nextPage! : props.page;
	const pageAfterNext = props.totalPages > next ? next + 1 : next;
	const page = props.page;

	return (
		<div className="flex items-center justify-center gap-5 px-5 border rounded-lg">
			<Link href={`?page=${prev}`} className="flex items-center w-1/2 gap-3">
				<span>Previous</span>{" "}
			</Link>
			<div className="flex items-center grow [&_a]:px-3 [&_a]:py-1 [&_a]:border-x [&_a]:w-full  [&_a]:transition ">
				<Link href={`?page=${page}`} className="bg-neutral-100">
					{page}
				</Link>
				{props.hasNextPage && (
					<Link href={`?page=${next}`} className="hover:bg-neutral-100">
						{next}
					</Link>
				)}
				{props.page < props.totalPages && <Link href={`?page=${pageAfterNext}`}>...</Link>}
			</div>
			<Link href={`?page=${next}`} className="flex items-center w-1/2 gap-3">
				<span>Next</span>{" "}
			</Link>
		</div>
	);
}
