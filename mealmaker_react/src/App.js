import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowRecipes from "./pages/ShowRecipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/recipes" element={<ShowRecipes />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;