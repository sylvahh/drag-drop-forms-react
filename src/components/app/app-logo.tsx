"use client";
import { assets } from "@/constants";
import classNames from "classnames";
// import Image, { ImageProps } from "next/image";
// import { useRouter } from "next/navigation";

type AppLogoProps = {
	scope: "1" | "2" | "3" | "4" | "5" | "6" | "7";
	size?: number;
	className?: string;
	clickable?: boolean;
	businessId?: string;
};
/**
 *this is the logo component for the app all logos variants are handled here
 *
 * @param {AppLogoProps} { scope = "1", className = "size-20" }
 * scope definition - these are the scopes variants for the logo
 * 1 - orange logo
 *
 * 2 - black logo
 *
 * 3 - white logo
 *
 * 4 - orange with text logo
 *
 * 5 - black with text logo
 *
 * 6 - orange logo with black text
 *
 * 7 - white with text logo
 */
export default function AppLogo({ scope, className, size = 20, clickable = false, businessId }: AppLogoProps) {
	const width = size;
	const height = size;
	const cn = classNames("", className, { "cursor-pointer": clickable });

	// const router = useRouter();

	const click = () => {
		if (clickable) {
			// router.push("/");
		}
	};

	const imageProps: any = {
		width: width,
		height: height,
		className: cn,
		onClick: click,
	};
	if (businessId) {
		return <>add business logo here</>;
	}

	switch (scope) {
		case "1":
			return <img src={assets.logo_01} alt="logo" {...imageProps} />;
		case "2":
			return <img src={assets.logo_02} alt="logo" {...imageProps} />;
		case "3":
			return <img src={assets.logo_03} alt="logo" {...imageProps} />;
		case "4":
			return <img src={assets.logo_with_text_01} alt="logo" {...imageProps} />;
		case "5":
			return <img src={assets.logo_with_text_02} alt="logo" {...imageProps} />;
		case "6":
			return <img src={assets.logo_with_text_03} alt="logo" {...imageProps} />;
		case "7":
			return <img src={assets.logo_with_text_04} alt="logo" {...imageProps} />;
		default:
			return null;
	}
}
