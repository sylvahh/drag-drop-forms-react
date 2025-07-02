import React from "react";
import classNames from "classnames";
import capitalize from "@/lib/capitalize";
import { CloudUpload } from "lucide-react";
import { UploadMeta } from "@/types/global.types";
import blobReader from "@/lib/blob-reader";
import { toast } from "sonner";
type InputNativeAttributes = React.ComponentPropsWithRef<"input">;

type Ref = HTMLInputElement;

interface InputProps extends InputNativeAttributes {
	label?: string;
	disabled?: boolean;
	containerStyle?: string;
	maxFileSize?: number;
	invalid?: boolean;
	overrideInvalid?: boolean;
	errorMessage?: string;
	dashed?: boolean;
	updateFile?: (file: File | null, meta: UploadMeta) => void;
}

const FileInput = React.forwardRef<Ref, InputProps>((props: InputProps, ref) => {
	const [fileName, setFileName] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		name,
		label,
		className,
		placeholder,
		disabled,
		containerStyle,
		invalid,
		overrideInvalid: override_invalid,
		errorMessage,
		maxFileSize = 2000000,
		dashed = true,
		updateFile,
		...rest
	} = props;

	const { isInvalid } = React.useMemo(() => {
		let isInvalid = false;
		const userInput = rest.value?.toString();
		if (override_invalid) {
			isInvalid = true;
		} else if (invalid && !userInput && rest.required) {
			isInvalid = true;
		}
		return { isInvalid };
	}, [invalid, rest.value, rest.required, override_invalid]);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		try {
			const file = e.target.files?.[0] || null;
			if (file) {
				if (file.size > maxFileSize) {
					toast.error("File size is too large");
					return;
				}
				const base64 = await blobReader(file);
				const meta: UploadMeta = {
					base64,
					file_name: file.name,
					mime_type: file.type,
					file_size: file.size,
				};
				updateFile(file, meta);
				setFileName(file.name);
			}
		} catch (error) {
			toast.error("Error uploading file");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const container = classNames("input-container", containerStyle);

	const cn = classNames("flex justify-center items-center rounded-lg border p-3 gap-2", className, {
		invalid: isInvalid || errorMessage,
		"border-dashed border-neutral-400": dashed,
	});
	const errorCn = classNames("text-red-500 text-xs", {
		hidden: !errorMessage,
	});

	const placeholderCn = classNames("text-xs normal-case text-neutral-500", {
		"text-primary-300": fileName,
	});

	return (
		<div className={container}>
			{label && (
				<div className="capitalize text-b-2 text-neutral-500">
					{label} {rest.required && "*"}
				</div>
			)}

			<div className={cn}>
				{/* <label htmlFor={name} className="flex items-center gap-2 cursor-pointer"> */}
				<div className="flex items-center justify-center rounded-full size-8 bg-neutral-200">
					<CloudUpload className="size-4" />
				</div>
				<div className="flex flex-col flex-1">
					<span className={placeholderCn}>{fileName ?? placeholder}</span>
					<div className="flex items-center gap-1 text-neutral-500">
						{rest.accept && (
							<span className="text-xs text-neutral-500">
								{" "}
								{capitalize(rest.accept ?? "", "all")}
							</span>
						)}
						{"|"}
						{maxFileSize && (
							<span className="text-xs text-neutral-500">
								Max size: {(maxFileSize / 1024 / 1024).toFixed(1)}MB
							</span>
						)}
					</div>
				</div>
				<label htmlFor={name} className="!text-white button-primary p-2">
					{isLoading ? "uploading..." : "upload"}
				</label>

				<input
					ref={ref}
					className="hidden"
					type={"file"}
					id={name}
					name={name}
					// value={fileName ?? ""}
					disabled={disabled}
					onChange={handleChange}
					{...rest}
				/>
			</div>
			<small className={errorCn}>{errorMessage}</small>
		</div>
	);
});

FileInput.displayName = "FileInput";

export default FileInput;

//  <div className="flex justify-center p-3 border rounded-lg">
// <label htmlFor="upload-doc" className="flex flex-col items-center gap-2 cursor-pointer">
// 	<Badge className="rounded-full size-10 bg-neutral-100">
// 		<img src={assets.upload_icon_01} alt="upload-icon" />
// 	</Badge>
// 	<span className="caption-accent">{formData?.document?.name ?? "Click to Upload"}</span>
// 	<span className="caption-standard text-neutral-500">SVG, PNG, JPG (max. 800x400px)</span>
// </label>

// 		<input
// 			type="file"
// 			name="upload-doc"
// 			id="upload-doc"
// 			accept=".png, .jpg, .jpeg, .pdf"
// 			className="hidden"
// 			onChange={(e) => {
// 				const file = e.target.files?.[0] || null;
// 				if (file) updateForm("document", file);
// 			}}
// 			disabled={isLoading}
// 		/>
//  </div>;
