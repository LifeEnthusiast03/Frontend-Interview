import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Blog } from "@/service/blogservice";
import { getBlogs } from "@/service/blogservice";

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  curBlogId: number;
  setCurBlogId: (id: number) => void;
  
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
  const [curBlogId, setCurBlogId] = useState<number>(0);

  const { data: blogs = [], isLoading: loading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  return (
    <BlogContext.Provider
      value={{ blogs, loading, curBlogId, setCurBlogId }}
    >
      {children}
    </BlogContext.Provider>
  );
};
