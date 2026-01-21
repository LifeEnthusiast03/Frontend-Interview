import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { useBlogs } from "@/context/BlogContext"
export default function Page() {
  const {blogs}=useBlogs();
  const [select,setSelect] = useState<string>(blogs[0].title);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "400px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <h1 className="text-2xl font-bold">{select}</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
         
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

