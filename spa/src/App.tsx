import { HashRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import CommandDetail from './pages/CommandDetail';
import Commands from './pages/Commands';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SDD from './pages/SDD';
import SDDBenefits from './pages/SDDBenefits';
import SDDComparison from './pages/SDDComparison';
import SDDConcepts from './pages/SDDConcepts';
import Workflow from './pages/Workflow';
import WorkflowStep from './pages/WorkflowStep';

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
  );
}

export default App;
