import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/navbar/Sidebar';
import DummyScreen from './components/SignUpSignIn/DummyScreen';
import Mailbox from './components/SignUpSignIn/mailscreen/Mailbox';
import EmailEditor from './components/SignUpSignIn/mailscreen/EmailEditor';
import LoginForm from './components/SignUpSignIn/LoginForm';
import SignupForm from './components/SignUpSignIn/SignupForm';
import Header from './components/navbar/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Add this line to import custom CSS

const App = () => {

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <div>
        <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        {showSidebar && (
          <div onClick={toggleSidebar} className="overlay"></div>
        )}
        <div className="mt-5">
          <Sidebar showSidebar={showSidebar} />
          <div className="main-content flex-grow-1 pt-2 ">
            <Routes>
              <Route path="/" element={<Mailbox />} />
              <Route path="/unread" element={<Mailbox />} />
              <Route path="/inbox" element={<Mailbox />} />
              <Route path="/starred" element={<Mailbox />} />
              <Route path="/drafts" element={<Mailbox />} />
              <Route path="/sent" element={<Mailbox />} />
              <Route path="/archive" element={<Mailbox />} />
              <Route path="/spam" element={<Mailbox />} />
              <Route path="/compose" element={<EmailEditor />} />
              <Route path="/signin" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/dummy" element={<DummyScreen />} />
            </Routes>
          </div>
          
        </div>
      </div>
    </Router>
  );
};

export default App;
