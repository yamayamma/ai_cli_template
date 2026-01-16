import { HashRouter, Routes, Route } from 'react-router-dom'

// Placeholder components - will be replaced in Phase 3+
function Home() {
  return (
    <div className="page">
      <h1>SpecKit Documentation</h1>
      <p>開発フローとSpec Driven Developmentを学ぶ</p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="page">
      <h1>404 - ページが見つかりません</h1>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
