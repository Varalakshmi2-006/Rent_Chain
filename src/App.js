import React, { useState } from 'react';
import Header from './components/Header';
import BrowseProperties from './components/BrowseProperties';
import ListProperty from './components/ListProperty';

function App() {
  const [tab, setTab] = useState('browse');

  return (
    <div>
      <Header />
      <nav>
        <button onClick={() => setTab('browse')}>Browse Properties</button>
        <button onClick={() => setTab('list')}>List Property</button>
      </nav>

      {tab === 'browse' && <BrowseProperties />}
      {tab === 'list' && <ListProperty />}
    </div>
  );
}

export default App;
