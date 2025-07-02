import Image from "next/image";
import { assets } from "@/constants";

export default function AppTrademark() {
	return (
		<div className="flex items-center justify-center gap-1">
			<Image src={assets.lock_icon_01} alt="lock" />
			<small className="text-base text-neutral-600">
				Secured by <span className="text-primary-300  font-semibold">Prolifi</span>
			</small>
		</div>
	);
}
