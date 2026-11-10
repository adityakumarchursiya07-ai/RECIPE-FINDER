import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Notfound from "./pages/Notfound";
import RecipeDetail from "./pages/RecipeDetail";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
