import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Blog } from "@/service/blogservice";
import { getBlogs,postBlogs} from "@/service/blogservice";

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  curBlogId: Number ;
  setCurBlogId: (id: Number) => void;
  isCreatePost:Boolean;
  setIsCreatePost:(create:Boolean)=>void;
  createBlog: (blog: Blog) => Promise<string>;
}

interface BlogProviderProps {
  children: ReactNode;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlogs = (): BlogContextType => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }

  return context;
};

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [curBlogId, setCurBlogId] = useState<Number>(0);
  const [isCreatePost,setIsCreatePost]=useState<Boolean>(false);
  const queryClient = useQueryClient();
  const { data: blogs = [], isLoading: loading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const createBlog = async(blog:Blog):Promise<string>=>{
              const postedblog = await postBlogs(blog);
              if(postedblog) {
                // Invalidate and refetch the blogs query to show the new post
                await queryClient.invalidateQueries({ queryKey: ["blogs"] });
                return "Blog post successful";
              }
              return "Blog post is not successful";
  }

  return (
    <BlogContext.Provider
      value={{ blogs, loading, curBlogId, setCurBlogId,isCreatePost,setIsCreatePost,createBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};
