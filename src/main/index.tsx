import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@/presentation/components';
import '@/main/config/style.css';
import { makeLogin } from './pages/login/login-factory';
import { makeSignup } from './pages/signup/signup-factory';

ReactDOM.createRoot(document.getElementById('main')).render(
  <Router makeLogin={makeLogin} makeSignup={makeSignup} />
);
