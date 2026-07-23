import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BarChart3,
  Map,
  Building2,
  Brain,
  Network,
  Users,
  BellRing,
  FileText,
  MessageSquare,
  UserCog,
  Bell,
  Settings,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const primary = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Crime Analytics", url: "/app/analytics", icon: BarChart3 },
  { title: "Hotspot Map", url: "/app/map", icon: Map },
  { title: "Districts", url: "/app/districts", icon: Building2 },
];

const intel = [
  { title: "Predictions", url: "/app/predictions", icon: Brain },
  { title: "Network Intel", url: "/app/network", icon: Network },
  { title: "Patrol Planning", url: "/app/resources", icon: Users },
  { title: "Alerts", url: "/app/alerts", icon: BellRing },
];

const ops = [
  { title: "Reports", url: "/app/reports", icon: FileText },
  { title: "AI Assistant", url: "/app/assistant", icon: MessageSquare },
  { title: "Users", url: "/app/users", icon: UserCog },
  { title: "Notifications", url: "/app/notifications", icon: Bell },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (u: string) => pathname === u || pathname.startsWith(u + "/");

  const renderGroup = (label: string, items: typeof primary) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/60 text-[11px] font-semibold uppercase tracking-wider">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border/60">
        <Link to="/app/dashboard" className="flex items-center gap-2.5 px-2 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
              SentinelIQ
            </span>
            <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
              Namma Sentinel · KSP
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {renderGroup("Overview", primary)}
        {renderGroup("Intelligence", intel)}
        {renderGroup("Operations", ops)}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60">
        <div className="flex items-center gap-2 px-2 py-2 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
          Systems nominal · v4.2
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
