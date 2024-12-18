import TopBar from "@/app/orgs/topbar";

export default function FootballLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <div className="flex-1">
                <TopBar/>
                {children}
            </div>
        </div>
    );
}