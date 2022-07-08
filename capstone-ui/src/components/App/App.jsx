import React from "react";
import Navbar from "../../../src/components/Navbar/Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Navbar />
          <Header />
          <Footer />
          <Routes>
            <Route path="/header" element={<Header />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
export default App;
