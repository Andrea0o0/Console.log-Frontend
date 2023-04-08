import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import KataLogic from './views/KataLogic';
import KataDetail from './views/KataDetail';
import Output from './components/Output';
import Instructions from './components/Instructions';
import Pastsolutions from './components/PastSolutions';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Github from './views/auth/GitHubLogin';
import Google from './views/auth/Google';

function App() {

  

  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/katas/:kataId" element={<KataDetail />} /><Route path="/kata/practise/:kataId" element={<KataLogic />}>
          <Route path="output" element={<Output />}/>
          <Route path="instructions" element={<Instructions />}/>
          <Route path="pastsolutions" element={<Pastsolutions />}/>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/github" element={<Github/>} />
        <Route path="/login/google" element={<Google/>} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}



export default App;
library.add(fab, fas, far)