import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './screens/Home';
import Signup from './screens/Signup';
import Voterhome from './screens/Voterhome';
import Login from './screens/Login';
import Profile from './screens/profile';
import AdminDashboard from './screens/AdminDashboard';
import CreatePartyForm from './screens/createParty';
import CreateCandidateForm from './screens/createCandidate';
import CreateConstituencyForm from './screens/createConstituency';
import VotersList from './screens/displayVoters';
import CreateElectionForm from './screens/createElection';
import RemoveCandidate from './screens/removeCandidate';
import Candidates from './screens/electionGet';
import Result from './Election/result';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/voterhome' element={<Voterhome />} />
          <Route exact path='/voter/profile' element={<Profile />} />
          <Route exact path='/voters/list' element={< VotersList />} />
          <Route exact path='/remove/candidate' element={< RemoveCandidate />} />
          <Route exact path='/election/event' element={< Candidates />} />
          <Route exact path={`/election/results/:id`} element={< Result />} />



          <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
          <Route exact path='/admin/create_party' element={<CreatePartyForm />} />
          <Route exact path='/admin/create_candidate' element={<CreateCandidateForm />} />
          <Route exact path='/admin/create_constituency' element={<CreateConstituencyForm />} />
          <Route exact path='/admin/create_election' element={<CreateElectionForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
