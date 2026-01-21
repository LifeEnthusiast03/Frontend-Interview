
import './App.css'
import Page from './dashboard/page.tsx'
import { BlogProvider } from './context/BlogContext.tsx'
function App() {
  
  return (
    <div className="flex w-full h-screen">
      <BlogProvider>
          <Page/>
      </BlogProvider>
      
    </div>
  )
}

export default App


