import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import AdminPage from './screens/AdminPage';
import PostAdd from './screens/PostAdd';
import PostDetail from './screens/PostDetail';
import PostList from './screens/PostList';
import PostUpdate from './screens/PostUpdate';
import NotFound from './screens/NotFound';
import ConfirmEmail from './screens/ConfirmEmail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/post-add" element={<PostAdd />} />
        <Route path="/post-detail/:url" element={<PostDetail />} />
        <Route path="/post-list" element={<PostList />} />
        <Route path="/post-update" element={<PostUpdate />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;