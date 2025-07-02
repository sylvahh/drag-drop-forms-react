"use client";
import Pagination from "@/components/app/pagination";
import TableHeader from "./compliance-table/table-header";
import AppContainer from "@/components/app/container/container";
import Render from "@/components/app/render";
import useCompliance from "./use-compliance-flow";
import ComplianceTable from "./compliance-table";

export default function Compliance() {
	const { data, isFetching, isError, error } = useCompliance();

	return (
		<AppContainer className="pt-0">
			<div className="flex flex-col">
				<TableHeader disabled={isFetching} />
				<div className="flex flex-col h-screen">
					<Render isLoading={isFetching} isError={isError} error={error}>
						<div className="overflow-auto grow">
							<ComplianceTable
								data={data?.docs ?? []}
								isEmpty={!isFetching && (!data?.docs || data.docs.length === 0)}
							/>
						</div>
						{/* {data && <Pagination {...data} />} */}
					</Render>
				</div>
			</div>
		</AppContainer>
	);
}
