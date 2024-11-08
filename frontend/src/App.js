import Signup from './component/Signup.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route element={<Signup />} path='/' />
            <Route element={<Home />} path='/home/*' />
          </Routes>
      </BrowserRouter>
    </div>
  );
}
