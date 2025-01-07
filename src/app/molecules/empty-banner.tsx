import { Button } from "@/components/ui/button";

export const EmptyBanner = ({title, description, iconComponent, clickEventName, onCLick}: {heading?: string,title: string, description: string, iconComponent: React.ReactNode, clickEventName: string, onCLick?: () => void}) => {
    return (
        <div className="flex flex-col gap-8 items-center justify-center h-full">
                <div className="w-3/4 text-left">
                    {/* <h1 className="text-3xl font-bold">{heading}</h1> */}
                </div>
                <div className="flex-col border-2 border-dashed border-gray-400 rounded-lg w-3/4 min-h-80 flex items-center justify-center text-center p-4 gap-4">
                    {/* <Database size={48} /> */}
                    {iconComponent}
                    <div className="text-gray-600 font-bold text-2xl">{title}</div>
                    <div className="text-gray-600 text-sm">{description}</div>
                    <Button onClick={onCLick} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white" >{clickEventName}</Button>
                </div>
            </div>
    )
}