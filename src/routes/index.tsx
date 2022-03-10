import { Route, Routes } from 'react-router-dom';

import { Coin } from 'pages/Coin';
import { Home } from 'pages/Home';
import { NotFound } from 'pages/NotFound';
import { Saved } from 'pages/Saved';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<Coin />} />
      <Route path="/save" element={<Saved />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
