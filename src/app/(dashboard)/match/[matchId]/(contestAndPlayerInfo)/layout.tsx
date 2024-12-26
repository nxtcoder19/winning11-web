"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MatchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter();

    // Determine what settings to show based on the pathname
    const isContestSettings = pathname.includes("/contest/") && pathname.endsWith("/settings");
    const isPlayerSettings = pathname.includes("/player/") && pathname.endsWith("/settings");

    const tabs = [
        { label: "Contest Settings", href: `/match/${params.matchId}/contest/${params.contestId}/settings` },
        { label: "Player Settings", href: `/match/${params.matchId}/player/${params.playerId}/settings` },
    ];

    return (
        <div className="flex">
            <div className="flex-1">
                <div className="bg-white border-b p-4 shadow-md flex gap-8">
                    <button
                        onClick={() => router.push(`/match/${params.matchId}/contests?sportsType=${searchParams.get('sportsType')}`)}
                        className="text-gray-600 hover:text-indigo-600 font-semibold"
                    >
                        ← Back 
                    </button>
                    {
                        isContestSettings && <Link key={tabs[0].href} href={tabs[0].href}>
                            <div
                                className={cn(
                                    "font-semibold cursor-pointer transition-colors",
                                    pathname === tabs[0].href
                                        ? "text-blue-600 border-b-2 border-blue-600" // Active tab styles
                                        : "text-gray-600 hover:text-indigo-600"
                                )}
                            >
                                {tabs[0].label}
                            </div>
                        </Link>
                    }
                    {
                        isPlayerSettings && <Link key={tabs[1].href} href={tabs[1].href}>
                            <div
                                className={cn(
                                    "font-semibold cursor-pointer transition-colors",
                                    pathname === tabs[1].href
                                        ? "text-blue-600 border-b-2 border-blue-600" // Active tab styles
                                        : "text-gray-600 hover:text-indigo-600"
                                )}
                            >
                                {tabs[1].label}
                            </div>
                        </Link>
                    }
                </div>
                {children}
            </div>
        </div>
    );
}
