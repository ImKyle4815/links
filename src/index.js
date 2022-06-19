import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './style/style.scss';
import LinksPage from "./pages/LinksPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="App">
      {/* <header className="header">
        <p>
          I'm the header.
        </p>
      </header> */}
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LinksPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      {/* <footer className="footer">
        <p>
          I'm the footer.
        </p>
      </footer> */}
    </div>
  </React.StrictMode>
);

reportWebVitals();
