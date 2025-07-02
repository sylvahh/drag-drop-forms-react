import useCustomNavigation from "@/hooks/use-navigation";
import classNames from "classnames";
import { MoveLeft } from "lucide-react";

type Props = {
	action?: () => void;
	path?: string;
	icon?: React.ReactNode;
	text?: string;
	className?: string;
};
export default function BackButton(props: Props) {
	const { navigate } = useCustomNavigation();
	const cn = classNames(
		"flex items-center gap-1 body-2 text-neutral-1000 hover:scale-105 transition-all duration-300",
		props.className
	);

	const click = () => {
		if (props.action) {
			props.action();
			return;
		}
		if (props.path) {
			navigate(props.path);
			return;
		}
		navigate(-1);
	};

	return (
		<button className={cn} onClick={click}>
			{props.icon ?? <MoveLeft className="w-5 h-5" />} {props.text ?? "Back"}
		</button>
	);
}
