import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/navbar/Sidebar';
import DummyScreen from './components/SignUpSignIn/DummyScreen';
import Mailbox from './components/SignUpSignIn/mailscreen/Mailbox';
import EmailEditor from './components/SignUpSignIn/mailscreen/EmailEditor';
import LoginForm from './components/SignUpSignIn/LoginForm';
import SignupForm from './components/SignUpSignIn/SignupForm';


const App = () => {
  return (
    <Router>
      <div className="">
        <div className='m-2'>
        <Sidebar />
        </div>
        <div className="main-content flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Mailbox />} />
            <Route path="/unread" element={<Mailbox />} />
            <Route path="/starred" element={<Mailbox />} />
            <Route path="/drafts" element={<Mailbox />} />
            <Route path="/sent" element={<Mailbox />} />
            <Route path="/archive" element={<Mailbox />} />
            <Route path="/spam" element={<Mailbox />} />
            <Route path="/compose" element={<EmailEditor />} />
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dummy" element={<DummyScreen/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
