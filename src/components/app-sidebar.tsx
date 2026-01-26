"use client"
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
// This is sample data
import { useBlogs } from "@/context/BlogContext"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {blogs,setCurBlogId} = useBlogs();
  
  const handleselect = (blogId: string) => {
     setCurBlogId(parseInt(blogId))
  }
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
            <div className="flex items-center justify-between px-2 py-1">
              <h2 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide">
                All Blogs
              </h2>
              <span className="text-xs text-sidebar-foreground/50">
                {blogs.length}
              </span>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent >
              {blogs.map((blog) => (
                <a
                  onClick={() => handleselect(blog.id)}
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
