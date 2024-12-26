"use client"
import { Calendar, Flag, Home, Layers, LayoutDashboard, LifeBuoy, Settings, StickyNote } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar, { SidebarItem } from "../orgs/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

    return (
      <div className="flex">
          {/* Sidebar */}
          <Sidebar>
              <SidebarItem icon={<Home size={20} />} text="Cricket" alert href="/cricket" active={pathname.startsWith("/cricket")} />
              <SidebarItem icon={<LayoutDashboard size={20} />} text="Football" href="/football" active={pathname.startsWith("/football")} />
              <SidebarItem icon={<StickyNote size={20} />} text="Basket Ball" alert href="/basketball" active={pathname === "/basketball"} />
              <SidebarItem icon={<Calendar size={20} />} text="Volley Ball" href="/volleyball" active={pathname === "/volleyball"}/>
              <SidebarItem icon={<Layers size={20} />} text="Tasks" href="/tasks" />
              <SidebarItem icon={<Flag size={20} />} text="Reporting" href="/reporting" />
              <hr className="my-3" />
              <SidebarItem icon={<Settings size={20} />} text="Settings" href="/settings" />
              <SidebarItem icon={<LifeBuoy size={20} />} text="Help" href="/help" />
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1">
              {children}
          </main>
      </div>
    );
}
