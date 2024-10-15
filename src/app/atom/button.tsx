import { cn } from "@/lib/utils";

interface CircularIconButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const CircularIconButton = ({ icon, onClick, className }: CircularIconButtonProps) => {
    return (
        <button
            className={cn(
                "mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]",
                className,
            )}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}