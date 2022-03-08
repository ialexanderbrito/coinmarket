import { Route, Routes } from 'react-router-dom';

import { Coin } from 'pages/Coin';
import { Home } from 'pages/Home';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<Coin />} />
    </Routes>
  );
}
