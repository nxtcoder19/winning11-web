"use client";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function TopBar() {
    const pathname = usePathname();

    const baseRoute = pathname.split("/").slice(0, 2).join("/");

    const tabs: { [key: string]: { label: string; href: string }[] } = {
        "/cricket": [
            { label: "Upcoming", href: "/cricket/upcoming" },
            { label: "Live", href: "/cricket/live" },
            { label: "Completed", href: "/cricket/completed" },
        ],
        "/football": [
            { label: "Upcoming", href: "/football/upcoming" },
            { label: "Live", href: "/football/live" },
            { label: "Completed", href: "/football/completed" },
        ],
        // Add more routes and tabs as needed
    };

    // Get the tabs for the current route or use a default
    const currentTabs = tabs[baseRoute] || [];

    return (
        <div className="bg-white border-b p-4 shadow-md flex gap-8">
            {currentTabs.map((tab) => (
                // <Link key={tab.href} href={tab.href}>
                //     <a className="text-gray-600 hover:text-indigo-600 font-semibold">{tab.label}</a>
                // </Link>
                <Link key={tab.href} href={tab.href}>
                    <div
                        className={cn(
                            "font-semibold cursor-pointer transition-colors",
                            pathname === tab.href
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
