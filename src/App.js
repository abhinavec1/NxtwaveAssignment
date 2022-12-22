import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/NavBar';
import Resource from './pages/Resource/Resource';
import CreateItem from './pages/CreateItems/CreateItems';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Resource />} />
          <Route path="/create" element={<CreateItem />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
