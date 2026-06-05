import { Route, Routes } from 'react-router-dom'
import { BlogPostPage } from './components/BlogPostPage'
import { FrostingDrips } from './components/FrostingDrips'
import { Navbar } from './components/Navbar'
import { CustomCursor } from './components/CustomCursor'
import { SplashScreen } from './components/SplashScreen'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <>
      <CustomCursor />
      <SplashScreen />
      <FrostingDrips />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </>
  )
}

export default App
