// src/App.js
import React from "react";
import "./App.css"; // Import your global CSS
import FileList from "./FileList"; // Import the FileList component

function App() {
  return (
    <div className="App">
      <FileList /> {/* Render the FileList component */}
    </div>
  );
}

export default App;
