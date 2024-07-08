import React, { useContext } from 'react';
import AppProvider, { AppContext } from './context/AppContext';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const Home: React.FC = () => {
  const context = useContext(AppContext);
  return <div>Home {context?.user}</div>;
};
const About: React.FC = () => <div>About</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
