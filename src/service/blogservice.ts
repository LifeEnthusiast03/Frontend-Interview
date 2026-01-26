 interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

const  getBlogs = async ():Promise<Blog[]>=>{
        try{
        const res = await fetch("http://localhost:3001/blogs");
        if (!res.ok) {
            throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await res.json();
        return data;
        }
        catch(error){
            console.error("Cant fetch data",error);
            return [];
        }
}
const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const res = await fetch(`http://localhost:3001/blogs/${id}`);
    if (!res.ok) throw new Error("Failed to fetch blog");

    const data: Blog[] = await res.json();
    return data[0];
  } catch (error) {
    console.error("Can't fetch data", error);
    return null;
  }
};
const postBlogs = async (blog:Blog):Promise<Blog|null>=>{
        try{
            const response = await fetch("http://localhost:3001/blogs",
              {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(blog),
              }
            )
            if(!response.ok){
               throw new Error("Failed to create blog");
            }
            return  response.json();
        }
        catch(error){
          console.error("can not post data", error);
            return null; 
        }
}
export {getBlogById, getBlogs, postBlogs};
export type{Blog};