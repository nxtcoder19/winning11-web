"use client"
import MatchTopBar from "@/app/orgs/match-topbar";
import { usePathname } from "next/navigation";

export default function MatchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();
    // const showTopBar = !pathname.includes("add-");
    const showTopBar = 
        !pathname.includes("add-") && 
        !(pathname.match(/\/contest\/id-.+/) || pathname.match(/\/player\/id-.+/));

    return (
        <div className="flex">
            <div className="flex-1">
                {/* <MatchTopBar /> */}
                {showTopBar && <MatchTopBar />}
                {children}
            </div>
        </div>
    );
}