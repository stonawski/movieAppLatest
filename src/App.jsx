import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import { Authentication } from "./Authentication/Authentication";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/authentication" element={<Authentication />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
