import React from 'react';

function ShortlistedCandidates({ data }) {
  const getScoreBadgeClass = (score) => {
    if (score >= 75) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <div className="form-container">
        <h2>✅ Shortlisted Candidates</h2>

        <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Job Requirements:</h3>
          <p>
            <strong>Required Skills:</strong> {data.jobRequirements.requiredSkills.join(', ')}
          </p>
          <p>
            <strong>Minimum Experience:</strong> {data.jobRequirements.minExperience} years
          </p>
          {data.jobRequirements.preferredSkills.length > 0 && (
            <p>
              <strong>Preferred Skills:</strong> {data.jobRequirements.preferredSkills.join(', ')}
            </p>
          )}
          <p style={{ marginBottom: 0 }}>
            <strong>Matched Candidates:</strong> {data.matchedCandidatesCount} out of {data.totalCandidates || 'N/A'}
          </p>
        </div>

        {data.candidates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p>No candidates match the criteria</p>
          </div>
        ) : (
          <>
            <div className="grid">
              {data.candidates.map((candidate, idx) => (
                <div key={idx} className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{candidate.name}</h3>
                      <p style={{ margin: '5px 0 0 0', color: '#666' }}>{candidate.email}</p>
                    </div>
                    <span className={`match-score ${getScoreBadgeClass(candidate.matchScore)}`}>
                      {candidate.matchScore}%
                    </span>
                  </div>

                  <div className="card-body">
                    <p><strong>Experience:</strong> {candidate.experience} years</p>

                    <p>
                      <strong>Matched Skills ({candidate.requiredMatchCount}/{data.jobRequirements.requiredSkills.length}):</strong>
                    </p>
                    <div className="skills-list">
                      {candidate.matchedSkills.map(skill => (
                        <span key={skill} className="skill-badge" style={{ background: '#d4edda', color: '#155724' }}>
                          ✓ {skill}
                        </span>
                      ))}
                    </div>

                    <p style={{ marginTop: '10px' }}>
                      <strong>All Skills:</strong>
                    </p>
                    <div className="skills-list">
                      {candidate.skills.map(skill => (
                        <span key={skill} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {candidate.matchedSkills.length === data.jobRequirements.requiredSkills.length ? (
                      <p style={{ color: '#28a745', fontWeight: 'bold', marginTop: '10px' }}>
                        ✅ All required skills matched!
                      </p>
                    ) : (
                      <p style={{ color: '#ff6b6b', marginTop: '10px' }}>
                        ⚠️ Missing: {data.jobRequirements.requiredSkills
                          .filter(skill => !candidate.matchedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase()))
                          .join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {data.aiRecommendation && (
              <div className="form-container" style={{ marginTop: '30px', background: '#f8f9ff' }}>
                <h2>🤖 AI-Based Recommendations</h2>
                <div style={{ 
                  background: 'white', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '2px solid #667eea',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '0.95em',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  {data.aiRecommendation}
                </div>
                <p style={{ fontSize: '0.85em', color: '#666', marginTop: '10px', textAlign: 'right' }}>
                  Model: {data.aiModel}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ShortlistedCandidates;
