import { HashRouter, Routes, Route } from "react-router-dom";

import './App.css';
import MediaSearch from './MediaSearch';
import MediaViewer from './MediaViewer';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <MediaSearch />
          </div>
        } />
        <Route path="/view" element={<MediaViewer />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
