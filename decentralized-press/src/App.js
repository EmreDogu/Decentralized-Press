import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Writing from "./WritingPage";
import News from "./NewsPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/writing" element={<Writing />} />
      <Route path="/NewsPage" element={<News />} />
    </Routes>
  );
}

export default App;