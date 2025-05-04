"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Building2 /* pick any Lucide icon you like */ } from "lucide-react"

export function AppbarHeader() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {/* generic company “building” icon */}
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Building2 className="size-4" /> 
          </div>

          {/* team name etc. stays the same */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Pest control master</span>
            <span className="truncate text-xs">Admin.</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
