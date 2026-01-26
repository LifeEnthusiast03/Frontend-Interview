
import './App.css'
import Page from './dashboard/page.tsx'
import { BlogProvider } from './context/BlogContext.tsx'
import { Navbar } from './dashboard/navbar.tsx'
import { useBlogs } from './context/BlogContext.tsx'
import {BlogPostForm} from "./components/blogpostform.tsx"

function AppContent() {
  const {isCreatePost} = useBlogs()
  
  
  return (
    
    <>
      <Navbar />
      <Page/>
      {isCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" >
          <div className="bg-background rounded-xl shadow-2xl max-h-[90vh] w-full max-w-2xl overflow-auto">
            <BlogPostForm/>
          </div>
        </div>
      )}
        </>
  )
}

function App() {
    
  return (
    <div className="flex flex-col w-full h-screen bg-background" >
      <BlogProvider>
        <div className="flex flex-1 w-full relative" >
          <AppContent />
        </div>
      </BlogProvider>
    </div>
  )
}

export default App


