import React from 'react';
import './App.css';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <div>
        <h1>First Commit</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
