import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import classNames from "classnames";
import { X } from "lucide-react";
import React from "react";
import ErrorBoundary from "./error-boundary";


type DrawerProps = {
  direction: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  handleChange(state: boolean): void;
  title: string;
  className?: string;
  sticky?: string;
  headerClassName?: string;
};
export default function AppDrawer(props: DrawerProps) {
  const headerClx = classNames(
    "flex justify-between items-center border-b border-neutral-200",
    props.headerClassName,
    {
      "sticky top-0 z-10 bg-white": props.sticky,
    },
  );
  const cn = classNames(
    "h-full  outline-none !overflow-x-hidden",
    props.className,
    {
      "lg:ml-[68%]": props.direction === "right",
      "lg:mr-[68%]": props.direction === "left",
    },
  );

  return (
    <Drawer
      direction={props.direction}
      onOpenChange={props.handleChange}
      open={props.open}
    >
      <DrawerContent className={cn}>
        <DrawerDescription />
        <DrawerHeader className={headerClx}>
          <DrawerTitle className="feature-bold text-neutral-1000">
            {props.title}
          </DrawerTitle>
          <DrawerClose>
            <X />
          </DrawerClose>
        </DrawerHeader>
        <ErrorBoundary>{props.children}</ErrorBoundary>
        {props.footer && <DrawerFooter>{props.footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}
