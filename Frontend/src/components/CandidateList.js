import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://candidate-shortlisting-system-with-ai-3ium.onrender.com';

function CandidateList({ refreshTrigger }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, [refreshTrigger]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/candidates`);
      setCandidates(response.data.candidates);
      setMessage('');
    } catch (error) {
      setMessage('❌ Error loading candidates: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`${API_URL}/api/candidates/${id}`);
        setMessage('✅ Candidate deleted successfully');
        fetchCandidates();
      } catch (error) {
        setMessage('❌ Error deleting candidate');
      }
    }
  };

  if (loading) {
    return <div className="message loading">⏳ Loading candidates...</div>;
  }

  return (
    <div>
      <h2>📋 All Candidates ({candidates.length})</h2>
      
      {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

      {candidates.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>No candidates found. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid">
          {candidates.map(candidate => (
            <div key={candidate._id} className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">{candidate.name}</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#666' }}>{candidate.email}</p>
                </div>
              </div>

              <div className="card-body">
                <p><strong>Experience:</strong> {candidate.experience} years</p>
                
                <div>
                  <strong>Skills:</strong>
                  <div className="skills-list">
                    {candidate.skills.map(skill => (
                      <span key={skill} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>

                {candidate.bio && (
                  <p><strong>Bio:</strong> {candidate.bio}</p>
                )}

                {candidate.projects && (
                  <p><strong>Projects:</strong> {candidate.projects}</p>
                )}

                <button 
                  onClick={() => deleteCandidate(candidate._id)}
                  style={{ background: '#ff6b6b', marginTop: '15px' }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateList;
