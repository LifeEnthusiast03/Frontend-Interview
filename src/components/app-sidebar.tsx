"use client"
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar"
// This is sample data
import { useBlogs } from "@/context/BlogContext"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {blogs} = useBlogs();
  
  // const handleselect = (e:Event)=>{
              
  // }
  return (
    <Sidebar
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent >
              {blogs.map((blog) => (
                <a
                  href="#"
                  key={blog.id}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{blog.title}</span>{" "}
                    <span className="ml-auto text-xs">{blog.description}</span>
                  </div>
                  <span className="font-medium">{blog.date}</span>
                  <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                    {blog.content}
                  </span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
