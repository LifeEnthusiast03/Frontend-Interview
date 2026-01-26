import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from "lucide-react"
import { useBlogs } from "@/context/BlogContext.tsx"
export function Navbar() { 
      const {isCreatePost,setIsCreatePost} = useBlogs();
  const handlecreatepost = ()=>{
        console.log("seting createpost true");
        setIsCreatePost(!isCreatePost);
  }
  return (
    <nav className="fixed right-0 top-0 z-50 flex justify-start pt-4 pr-4 h-screen">
      <div className="flex flex-row items-center gap-4 h-fit bg-gradient-to-b from-background/95 to-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border rounded-lg shadow-xl p-4">
        <Button variant="default" size="sm" className="gap-2 justify-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          onClick={()=>{handlecreatepost()}}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Post</span>
        </Button>

        <div className="h-full w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 ring-primary transition-all duration-200 transform hover:scale-110 shadow-md">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>My Posts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
