import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Writing from "./WritingPage";
import News from "./NewsPage";
import Voting from "./VotingPage";
import UnvotedNew from "./UnvotedNewsPage";

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