import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/demo/LandingPage'
import DemoTest from './pages/demo/DemoTest'     
import LiveRoom from './pages/demo/live_room';

//import ConfirmDetail from './pages/Interview/ConfirmDetail'

//import 'react-phone-input-2/lib/material.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/interview/:job_id/:cand_id/landing-page" element={<LandingPage />} />
        <Route path="/interview/:job_id/:cand_id/confirm-detail" element={<ConfirmDetail />} />
        <Route path="/interview/:job_id/:cand_id/call-in-progress" element={<CallInProgress />} /> */}


        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoTest />} />
        <Route path="/live" element={<LiveRoom />} />
       

        {/* <Route path="/learning" element={<ConfirmDetail />} />
        <Route path="/interview/call-in-progress/:UUID/" element={<CallInProgress />} />
        <Route path="/interview/job-call/:UUID/" element={<JobCallInterface />} /> */}
      </Routes>
    </Router>
  )
}

export default App