import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Auth from "./Components/Auth";
import Posts from "./Components/Posts";
import MyPost from "./Components/MyPost";
import Addpost from "./Components/Addpost";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/mypost" element={<MyPost />} />
        <Route path="/addpost" element={<Addpost />} />
      </Route>
    </Routes>
  );
}

export default App;
