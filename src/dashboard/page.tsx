import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useBlogs } from "@/context/BlogContext"

export default function Page() {
  const { blogs, curBlogId } = useBlogs()
  
  const selectedBlog = blogs.find(blog => blog.id === String(curBlogId))

  if (!selectedBlog) {
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
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">Select a blog to read</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

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
        <header className="sticky top-0 z-10 bg-gradient-to-r from-background to-background/80 border-b backdrop-blur-sm">
          <div className="p-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">{selectedBlog.title}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{new Date(selectedBlog.date).toLocaleDateString()}</span>
              <span>•</span>
              <div className="flex gap-2">
                {selectedBlog.category.map((cat) => (
                  <span key={cat} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto">
          {selectedBlog.coverImage && (
            <img
              src={selectedBlog.coverImage}
              alt={selectedBlog.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          )}

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Overview</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {selectedBlog.description}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Content</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {selectedBlog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-foreground whitespace-pre-wrap mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

