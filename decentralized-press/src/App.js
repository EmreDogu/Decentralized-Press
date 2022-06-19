import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Writing from "./pages/WritingPage";
import News from "./pages/NewsPage";
import Voting from "./pages/VotingPage";
import UnvotedNew from "./pages/UnvotedNewsPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/writing" element={<Writing />} />
      <Route path="/New" element={<News />} />
      <Route path="/voting" element={<Voting />} />
      <Route path="/unvotedNew" element={<UnvotedNew />} />
    </Routes>
  );
}

export default App;