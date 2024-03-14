import Index from './Pages/index';
import './App.scss';

import { Routes, Route } from "react-router-dom";
import AddProduct from './Pages/add-product';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
     <>
      <Navbar />

      <Routes>
          <Route index element={<Index />} />
          <Route path="/add-product" element={<AddProduct />} />
      </Routes>
        
        <Footer />
    </>
  );
}

export default App;
