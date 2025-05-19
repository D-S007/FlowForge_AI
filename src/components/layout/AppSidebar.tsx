
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/icons/AppLogo';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Lightbulb,
  Code2,
  FileText,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/workflow-optimizer', label: 'Workflow Optimizer', icon: Lightbulb },
  { href: '/dashboard/code-generator', label: 'Code Generator', icon: Code2 },
  { href: '/dashboard/documentation-generator', label: 'Doc Generator', icon: FileText },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { state, toggleSidebar, open } = useSidebar();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader className="p-4 flex items-center justify-between">
        <Link href="/dashboard" className={cn(
            "flex items-center gap-2 text-lg font-semibold text-sidebar-primary-foreground",
             state === "collapsed" && !open && "hidden" // Hide text when collapsed and not hovered/focused to expand
          )}>
          <AppLogo className="h-7 w-7 text-sidebar-primary" />
          <span className={cn(state === "collapsed" && "hidden")}>FlowForge AI</span>
        </Link>
         <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {open ? <ChevronsLeft /> : <ChevronsRight />}
          </Button>
      </SidebarHeader>
      
      <SidebarContent className="flex-1 overflow-y-auto p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />
      <SidebarFooter className="p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings" className="justify-start">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            {user && (
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={logout} tooltip="Logout" className="justify-start text-red-400 hover:bg-red-500/20 hover:text-red-300">
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
