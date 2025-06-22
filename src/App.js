import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from "./pages/ResetPassword"; //
// import other pages if needed

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route path="/reset-password" element={<ResetPassword />} />
      {/* add other routes here */}
    </Routes>
  );
}

export default App;
