import { HashRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Workflow from './pages/Workflow'
import WorkflowStep from './pages/WorkflowStep'

function NotFound() {
  return (
    <div className="page">
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h1>404 - ページが見つかりません</h1>
        <p>お探しのページは存在しないか、移動した可能性があります。</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/workflow/:stepId" element={<WorkflowStep />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  )
}

export default App
