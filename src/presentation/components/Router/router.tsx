import { Login } from '@/presentation/pages';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/main/config/style.css';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
