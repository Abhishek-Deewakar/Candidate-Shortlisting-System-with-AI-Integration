import React, { useState } from 'react';
import axios from 'axios';
import ShortlistedCandidates from './ShortlistedCandidates';

function JobMatchForm() {
  const [formData, setFormData] = useState({
    requiredSkills: [],
    minExperience: 0,
    preferredSkills: [],
    jobDescription: '',
    useAI: false,
  });

  const [skillInput, setSkillInput] = useState('');
  const [preferredSkillInput, setPreferredSkillInput] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addSkill = (skillInput, setSkillInput, skillType) => {
    if (skillInput.trim()) {
      const fieldName = skillType === 'required' ? 'requiredSkills' : 'preferredSkills';
      if (!formData[fieldName].includes(skillInput.trim())) {
        setFormData(prev => ({
          ...prev,
          [fieldName]: [...prev[fieldName], skillInput.trim()]
        }));
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skillToRemove, skillType) => {
    const fieldName = skillType === 'required' ? 'requiredSkills' : 'preferredSkills';
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setResults(null);

    try {
      if (formData.requiredSkills.length === 0) {
        setMessage('❌ Please add at least one required skill');
        setLoading(false);
        return;
      }

      const endpoint = formData.useAI ? '/api/ai/shortlist' : '/api/match';
      const response = await axios.post(endpoint, {
        requiredSkills: formData.requiredSkills,
        minExperience: parseInt(formData.minExperience),
        preferredSkills: formData.preferredSkills,
        jobDescription: formData.jobDescription,
      });

      setResults(response.data);
      setMessage('');
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>🔍 Find Best Matching Candidates</h2>

        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Required Skills *</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput, setSkillInput, 'required'))}
                placeholder="Enter skill and press Enter or click Add"
              />
              <button type="button" onClick={() => addSkill(skillInput, setSkillInput, 'required')}>Add</button>
            </div>
            <div className="skills-input">
              {formData.requiredSkills.map(skill => (
                <div key={skill} className="skill-tag">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill, 'required')}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Skills</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={preferredSkillInput}
                onChange={(e) => setPreferredSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(preferredSkillInput, setPreferredSkillInput, 'preferred'))}
                placeholder="Enter skill and press Enter or click Add"
              />
              <button type="button" onClick={() => addSkill(preferredSkillInput, setPreferredSkillInput, 'preferred')}>Add</button>
            </div>
            <div className="skills-input">
              {formData.preferredSkills.map(skill => (
                <div key={skill} className="skill-tag">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill, 'preferred')}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Minimum Experience (Years) *</label>
            <input
              type="number"
              value={formData.minExperience}
              onChange={(e) => setFormData(prev => ({ ...prev, minExperience: e.target.value }))}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Job Description (for AI analysis)</label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
              placeholder="Describe the job role and responsibilities..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={formData.useAI}
                onChange={(e) => setFormData(prev => ({ ...prev, useAI: e.target.checked }))}
                style={{ width: 'auto' }}
              />
              🤖 Use AI-Based Ranking (OpenRouter)
            </label>
            {formData.useAI && (
              <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
                ⚠️ Make sure you have set your OpenRouter API key in the .env file
              </p>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? '⏳ Finding candidates...' : '🔍 Search Candidates'}
          </button>
        </form>
      </div>

      {results && <ShortlistedCandidates data={results} />}
    </div>
  );
}

export default JobMatchForm;
