import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/MainPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import CocktailDetails from "./pages/CocktailDetails.tsx";
import Template from "./pages/template.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Template>
        <Routes>
          <Route path="/cocktail/:name" element={<CocktailDetails />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Template>
    </BrowserRouter>
  </StrictMode>
);
