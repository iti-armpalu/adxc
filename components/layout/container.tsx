// Container controls horizontal constraints
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
};

export function Container({
    children,
    className,
    size = "lg",
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full px-4",
                sizeClasses[size],
                className
            )}
        >
            {children}
        </div>
    );
}

