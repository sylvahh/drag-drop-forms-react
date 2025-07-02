import { type StaticImageData } from "next/image";
import * as React from "react";
import Image from "next/image";
import classnames from "classnames";
import { assets } from "@/constants";

type AppImageProps = {
	src?: string | StaticImageData;
	alt?: string;
	className?: string;
	// size?: number;
};

export default React.memo(function AppImage(props: AppImageProps) {
	const container = classnames("size-7 overflow-hidden", props.className);

	return (
		<div className={container}>
			<Image
				src={props.src ?? assets.temp_02}
				alt={props.alt ?? "alt-img"}
				className="object-cover w-full h-full"
				width={28}
				height={28}
			/>
		</div>
	);
});
