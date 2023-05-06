import './App.css';
import {Routes, Route} from "react-router-dom";

import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import DogCreated from './components/DogCreated';
import Detail from './components/Detail';

function App() {

  return (
    <div>
    <div className="App">
      <h1>Henry Dogs</h1>
    </div>
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
