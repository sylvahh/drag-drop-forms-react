import Minimum from "@/components/app/container/minimum";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCustomNavigation from "@/hooks/use-navigation";
import { ComplianceSection } from "@/types/compliance.types";

export default function SectionsPreview({ sections }: { sections: ComplianceSection[] }) {
	const { navigate, queryParams } = useCustomNavigation();

	const click = (sectionId: string) => {
		navigate(`?tab=preview&section=${sectionId}`);
	};

	return (
		<TabsList asChild>
			<Minimum className="!flex flex-col !items-start !justify-start gap-2 bg-transparent !text-left border-l-2 border-neutral-200 rounded-none !p-0 min-h-60 overflow-y-auto ">
				{sections.map((section) => (
					<TabsTrigger
						key={section.id}
						value={section.id}
						onClick={() => click(section.id)}
						className="rounded-none shadow-none !border-b-0 border-l-2 border-transparent py-2 data-[state=active]:text-primary-300  data-[state=active]:border-l-2 data-[state=active]:border-primary-300  hover:text-primary-300  hover:border-primary-300 transition-all duration-300 "
					>
						{section.title}
					</TabsTrigger>
				))}
			</Minimum>
		</TabsList>
	);
}
