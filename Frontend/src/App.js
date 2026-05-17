import React from 'react';
import './App.css';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import JobMatchForm from './components/JobMatchForm';
import ShortlistedCandidates from './components/ShortlistedCandidates';

function App() {
  const [activeTab, setActiveTab] = React.useState('candidates');
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const handleCandidateAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎯 Candidate Shortlisting System</h1>
        <p>AI-Powered Skill Matching & Candidate Selection</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={`tab-button ${activeTab === 'candidates' ? 'active' : ''}`}
          onClick={() => setActiveTab('candidates')}
        >
          📋 Candidates
        </button>
        <button
          className={`tab-button ${activeTab === 'add-candidate' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-candidate')}
        >
          ➕ Add Candidate
        </button>
        <button
          className={`tab-button ${activeTab === 'match' ? 'active' : ''}`}
          onClick={() => setActiveTab('match')}
        >
          🔍 Find Matches
        </button>
      </nav>

      <div className="content">
        {activeTab === 'candidates' && <CandidateList refreshTrigger={refreshTrigger} />}
        {activeTab === 'add-candidate' && <CandidateForm onCandidateAdded={handleCandidateAdded} />}
        {activeTab === 'match' && <JobMatchForm />}
      </div>
    </div>
  );
}

export default App;
