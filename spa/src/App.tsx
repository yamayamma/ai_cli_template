import { HashRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Workflow from './pages/Workflow'
import WorkflowStep from './pages/WorkflowStep'
import SDD from './pages/SDD'
import SDDConcepts from './pages/SDDConcepts'
import SDDComparison from './pages/SDDComparison'
import SDDBenefits from './pages/SDDBenefits'
import Commands from './pages/Commands'
import CommandDetail from './pages/CommandDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/workflow/:stepId" element={<WorkflowStep />} />
          <Route path="/sdd" element={<SDD />} />
          <Route path="/sdd/concepts" element={<SDDConcepts />} />
          <Route path="/sdd/comparison" element={<SDDComparison />} />
          <Route path="/sdd/benefits" element={<SDDBenefits />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/commands/:commandId" element={<CommandDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  )
}

export default App
