'use client'

import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer } from '@/components/catalyst/sidebar'
import { SidebarLayout } from '@/components/catalyst/sidebar-layout'
import { 
  GitBranch, 
  PlayCircle, 
  LayoutDashboard, 
  Settings, 
  Users, 
  Activity 
} from 'lucide-react'
import { Avatar } from '@/components/catalyst/avatar'
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from '@/components/catalyst/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar'
import { Link } from '@/components/catalyst/link'

export function AppSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar 
                  src="https://avatar.vercel.sh/daniel" 
                  initials="DB" 
                  alt="Daniel Burkhart" 
                />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/settings">
                  <Settings className="size-4" />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">Sign out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                <span className="font-mono text-lg font-bold tracking-[-1.5px]">gp</span>
              </div>
              <div>
                <div className="text-base font-semibold text-zinc-950 dark:text-white">gitpo.st</div>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 -mt-0.5">Google Cloud</div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/dashboard" current>
                <LayoutDashboard className="size-5" />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/repositories">
                <GitBranch className="size-5" />
                <SidebarLabel>Repositories</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/pipelines">
                <PlayCircle className="size-5" />
                <SidebarLabel>Pipelines</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/activity">
                <Activity className="size-5" />
                <SidebarLabel>Activity</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="/settings">
                <Settings className="size-5" />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/team">
                <Users className="size-5" />
                <SidebarLabel>Team</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 px-2">
              v0.1.0 • <Link href="https://github.com/djburkhart/gitpo.st">GitHub</Link>
            </div>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
