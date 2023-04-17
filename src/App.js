import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
// SIGNUP && LOGIN
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import Github from './views/auth/GitHubLogin';
import Google from './views/auth/Google';
// LOGIC
import KataLogic from './views/KataLogic';
import Output from './components/Logic Components/Output';
import Instructions from './components/Details Kata/Instructions';
import Pastsolutions from './components/Details Kata/PastSolutions';
// FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
// KATA DETAILS
import KataDetail from './views/KataDetail';
import KataSolutions from './components/Details Kata/KataSolutions';
import Discussions from './components/Details Kata/Discussions';
// PROFILE / USER
import Profile from './views/User/Profile';
import User from './views/User/User';
import Solutions from './components/User Components/Solutions';
// CHAMPIONS
import ProfileChampions from './views/Champions/ProfileChampions';
import NewChampion from './views/Champions/NewChampion';
import ChampionsView from './views/Champions/ChampionsView';
import RequestChampions from './views/Champions/RequestChampions'
import ProgressChampions from './views/Champions/ProgressChampions';
import ChampionsKataLogic from './views/Champions/ChampionsKataLogic'

function App() {

  return (
    <div className="App">
      <Toaster/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/katas/:kataId" element={<KataDetail />}>
          <Route path="solutions" element={<KataSolutions/>}/>
          <Route path="discussions" element={<Discussions/>}/>
        </Route>
        <Route path="/kata/practise/:kataId" element={<KataLogic />}>
          <Route path="output" element={<Output />}/>
          <Route path="instructions" element={<Instructions />}/>
          <Route path="pastsolutions" element={<Pastsolutions />}/>
        </Route>
        <Route path="/katas/champions/:kataId/:championsId" element={<ChampionsKataLogic />}>
          <Route path="output" element={<Output />}/>
          <Route path="instructions" element={<Instructions />}/>
          <Route path="pastsolutions" element={<Pastsolutions />}/>
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="user" element={<User />}/>
          <Route path="solutions" element={<Solutions />}/>
          <Route path="champions" element={<ProfileChampions />}>
            <Route path="new" element={<NewChampion />}/>
            <Route path="request" element={<RequestChampions/>}/>
            <Route path="inprogress" element={<ProgressChampions />}/>
            <Route path="completed" element={<ChampionsView />}/>
          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/github" element={<Github/>} />
        <Route path="/login/google" element={<Google/>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}



export default App;
library.add(fab, fas, far)