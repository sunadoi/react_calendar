import React from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';
import CalendarBoard from './container/CalendarBoard/CalendarBoard';

function App() {
  return (
    <div className="App">
      <Layout>
        <CalendarBoard />
      </Layout>
    </div>
  );
}

export default App;
