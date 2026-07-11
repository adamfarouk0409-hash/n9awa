import type { ReactNode } from "react"

import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

type AppLayoutProps = {
  children: ReactNode
  className?: string
}

function AppLayout({ children, className = "" }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#EAF2F6]/30">
      <Navbar />
      <main className={`flex-1 pt-24 ${className}`.trim()}>{children}</main>
      <Footer />
    </div>
  )
}

export default AppLayout
