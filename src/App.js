// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/SignUpSignIn/LoginForm';
import SignupForm from './components/SignUpSignIn/SignupForm';
import DummyScreen from './components/SignUpSignIn/DummyScreen';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/signin" element={<LoginForm />} />
      <Route path="/dummy" element={<DummyScreen />} />
    </Routes>
  );
};

export default App;
