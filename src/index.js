import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './style/style.scss';
import LinksPage from "./pages/LinksPage";
import PrintingPage from './pages/PrintingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/print" element={<PrintingPage />} />
            <Route path="/links" element={<LinksPage />} />
            <Route path="*" element={<LinksPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>
);

reportWebVitals();
