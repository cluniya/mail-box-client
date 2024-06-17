import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/navbar/Sidebar';
import Mailbox from './components/SignUpSignIn/mailscreen/Mailbox';
import EmailEditor from './components/SignUpSignIn/mailscreen/EmailEditor';
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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
