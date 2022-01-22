import './App.css';
import React from 'react'
import Nav from './FrontEnd/Visuals/Nav';
import Home from './FrontEnd/Visuals/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forecast from './FrontEnd/componentsApi/Forecast/Forecast';
import Countries from './FrontEnd/componente/Countries';
import AddCountries from './FrontEnd/componente/AddCountries';
import RemoveCountry from './FrontEnd/componente/RemoveCountry';
import EditCountry from './FrontEnd/componente/EditCountry';




function App() {
  return (
    
       <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/addcountries" element={<AddCountries />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/deletecountries" element={<RemoveCountry />} />
        <Route path="/updatecountries" element={<EditCountry />} />
      </Routes>
    </BrowserRouter>
    
      
  );
}

export default App;
