"use client";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MatchTopBar() {
    const pathname = usePathname();
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()

    const selectedMatchId = params.matchId
    const sportsType = searchParams.get('sportsType')

    const matchTabs: { label: string; href: string }[] = [
        { label: "Contests", href: `/match/${selectedMatchId}/contests?sportsType=${sportsType}` },
        { label: "Players", href: `/match/${selectedMatchId}/players?sportsType=${sportsType}` },
        { label: "Settings ", href: `/match/${selectedMatchId}/settings?sportsType=${sportsType}` },
        // { label: "Teams", href: "/cricket/upcoming/teams" },
    ];

    const getMatchBasedOnSportsType = (sportsType: string) => {
        if (sportsType === "Cricket") {
            return "cricket";
        } else if (sportsType === "Football") {
            return "football";
        } else if (sportsType === "Basket Ball") {
            return "basketball";
        } else if (sportsType === "Volley Ball") {
            return "volleyball";
        }
    }

    // Get the tabs for the current route or use a default
    // const currentTabs = tabs[baseRoute] || [];

    return (
        <div className="bg-white border-b p-4 shadow-md flex gap-8">
            <button
                onClick={() => router.push(`/${getMatchBasedOnSportsType(sportsType || "cricket")}`)}
                className="text-gray-600 hover:text-indigo-600 font-semibold"
            >
                ← Back 
            </button>
            {matchTabs.map((tab) => (
                // <Link key={tab.href} href={tab.href}>
                //     <a className="text-gray-600 hover:text-indigo-600 font-semibold">{tab.label}</a>
                // </Link>
                <Link key={tab.href} href={tab.href}>
                    <div
                        className={cn(
                            "font-semibold cursor-pointer transition-colors",
                            // pathname === tab.href
                            tab.href.startsWith(pathname)
                                ? "text-blue-600 border-b-2 border-blue-600" // Active tab styles
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                    >
                        {tab.label}
                    </div>
                </Link>
            ))}
        </div>
    );
}
