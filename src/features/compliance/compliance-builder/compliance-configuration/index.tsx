import AppDrawer from "@/components/app/app-drawer";
import * as React from "react";
import { useFormBuilder } from "../builder-context";
import { ComplianceElementType } from "@/types/compliance.types";
import SectionConfiguration from "./section";
import ModuleConfiguration from "./module";
import FormBlockConfiguration from "./form-block-configuration";
import FieldRowConfiguration from "./field-row-configuration";
import SuperBlockModuleConfiguration from "./super-block-module-configuration";
import SuperBlockConfiguration from "./super-block-configuration";
import TextConfiguration from "./fields/text-field-configuration";
import EmailFieldConfiguration from "./fields/email-field-configuration";
import NumberFieldConfiguration from "./fields/number-field-configuration";
import RadioFieldConfiguration from "./fields/radio-field-configuration";
import CheckboxFieldConfiguration from "./fields/checkbox-field-configuration";
import FileFieldConfiguration from "./fields/file-field-configuration";
import UrlFieldConfiguration from "./fields/url-field-configuration";
import TelFieldConfiguration from "./fields/tel-field-configuration";
import ParagraphFieldConfiguration from "./fields/paragraph-field-configuration";
import DropdownFieldConfiguration from "./fields/dropdown-field-configuration";
import DateFieldConfiguration from "./fields/date-field-configuration";
import InfoFieldConfiguration from "./fields/info-field-configuration";
import HeaderFieldConfiguration from "./fields/header-field-configuration";

export default function ComplianceConfiguration() {
	const { selectedConfigurationType, resetSelectedConfigurationType } = useFormBuilder();
	const title = React.useMemo(() => {
		if (!selectedConfigurationType) return "Compliance Configuration";
		const configurationTitle: Record<ComplianceElementType, string> = {
			section: "Section Configuration",
			module: "Module Configuration",
			super_block: "Super Block Configuration",
			form_block: "Form Block Configuration",
			super_block_module: "Super Block Module Configuration",
			field_row: "Field Row Configuration",
			text: "Text Configuration",
			email: "Email Configuration",
			number: "Number Configuration",
			radio: "Radio Configuration",
			checkbox: "Checkbox Configuration",
			file: "File Configuration",
			url: "URL Configuration",
			tel: "Tel Configuration",
			paragraph: "Paragraph Configuration",
			dropdown: "Dropdown Configuration",
			date: "Date Configuration",
			info: "Info Block Configuration",
			header: "Header Configuration",
		};
		return configurationTitle[selectedConfigurationType.type];
	}, [selectedConfigurationType]);

	const open = React.useMemo(() => {
		return !!selectedConfigurationType;
	}, [selectedConfigurationType]);

	const toggleShow = () => {
		resetSelectedConfigurationType();
	};

	return (
		<AppDrawer
			title={title}
			open={open}
			direction="right"
			handleChange={toggleShow}
			className="hide-scrollbar"
		>
			{/* structural settings */}
			<SectionConfiguration />
			<ModuleConfiguration />
			<FormBlockConfiguration />
			<FieldRowConfiguration />
			<SuperBlockModuleConfiguration />
			<SuperBlockConfiguration />

			{/* content settings */}
			<TextConfiguration />
			<EmailFieldConfiguration />
			<NumberFieldConfiguration />
			<RadioFieldConfiguration />
			<CheckboxFieldConfiguration />
			<FileFieldConfiguration />
			<UrlFieldConfiguration />
			<TelFieldConfiguration />
			<ParagraphFieldConfiguration />
			<DropdownFieldConfiguration />
			<DateFieldConfiguration />
			<InfoFieldConfiguration />
			<HeaderFieldConfiguration />
		</AppDrawer>
	);
}
