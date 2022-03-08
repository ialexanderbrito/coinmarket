import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { HeaderProvider } from 'contexts/Header';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

export function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <HeaderProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </HeaderProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
