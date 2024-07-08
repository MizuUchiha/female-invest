import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CoursesProvider } from './context/CoursesContext';
import CoursesPage from './components/CoursesPage';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CoursesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<CoursesPage />} />
          </Routes>
        </Router>
      </CoursesProvider>
    </ThemeProvider>
  );
};

export default App;
