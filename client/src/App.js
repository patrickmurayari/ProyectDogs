import './App.css';
import {Routes, Route} from "react-router-dom";

import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import DogCreated from './components/DogCreated';
import Detail from './components/Detail';
import { useLocation } from 'react-router-dom';
import Nav from './components/Nav';

function App() {

  const location = useLocation();

  return (
    <div>
    <div className="App">
    </div>
      {/* {
        location.pathname === "/"? null : <Nav />
      } */}
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />}  />    
      <Route path="/form" element={<DogCreated />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
    </div>
  );
}

export default App;
