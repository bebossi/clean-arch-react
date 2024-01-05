import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@/presentation/components';
import { makeLogin } from './factories/pages/login/login-factory';
import '@/main/config/style.css';

ReactDOM.createRoot(document.getElementById('main')).render(
  <Router makeLogin={makeLogin} />
);
