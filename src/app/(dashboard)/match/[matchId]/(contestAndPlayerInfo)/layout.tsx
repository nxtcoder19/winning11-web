"use client";

import { usePathname } from "next/navigation";

export default function MatchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    // Determine what settings to show based on the pathname
    const isContestSettings = pathname.includes("/contest/") && pathname.endsWith("/settings");
    const isPlayerSettings = pathname.includes("/player/") && pathname.endsWith("/settings");

    return (
        <div className="flex">
            <div className="flex-1">
                {isContestSettings && <div>Contest Settings</div>}
                {isPlayerSettings && <div>Player Settings</div>}
                {!isContestSettings && !isPlayerSettings && (
                    <div>
                        Hello world
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
