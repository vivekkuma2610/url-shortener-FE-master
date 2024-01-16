import './App.css';
import {  BrowserRouter,Route, Routes,Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Component/login';
import Dashboard from './Component/dashBoard';
import CreateUrl from './Component/createUrl';
import UrlList from './Component/urlList';
import UrlRedirect from './Component/urlRedirect';
import NoPage from './Component/noPage';
import SignUp from './Component/signUp';
import ForgotPassword from './Component/forgotPassword';
import ResetPassword from './Component/resetPassword';
import EmailVerification from './Component/emailVerification';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/create" element={<CreateUrl/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/resetPassword/:id/:token" element={<ResetPassword/>}/>
        <Route  path="/email/verification/:id" element={<EmailVerification/>}/>
        <Route path="/link/details" element={<UrlList/>}/>
        <Route path="/:shortUrl" element={<UrlRedirect/>}/>
        <Route path="/nopage" element={<NoPage/>}/>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
