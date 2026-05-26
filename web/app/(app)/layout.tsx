import type { Metadata } from 'next'
import { AppSidebar } from '@/components/app-sidebar'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppSidebar>{children}</AppSidebar>
}
