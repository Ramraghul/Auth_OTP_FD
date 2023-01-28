import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Userdata from './Components/Pages/Userdata';
import OTP from './Components/Pages/OTP';
import JSON from './Components/Pages/JSON';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Userdata/>}/>
      <Route path='/OTPVerify' element={<OTP/>}/>
      <Route path='/Data' element={<JSON/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
