import { Route, Routes } from 'react-router-dom'
import { BlogPostPage } from './components/BlogPostPage'
import { MeshBackground } from './components/graphics/MeshBackground'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <>
      <MeshBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </>
  )
}

export default App
