import React, { useState } from 'react';
import axios from 'axios';

function CandidateForm({ onCandidateAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [],
    experience: 0,
    projects: '',
    bio: '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!formData.name || !formData.email || formData.skills.length === 0) {
        setMessage('❌ Please fill in all required fields');
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/candidates', formData);
      setMessage('✅ ' + response.data.message);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        skills: [],
        experience: 0,
        projects: '',
        bio: '',
      });

      // Notify parent component
      onCandidateAdded();

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Add New Candidate</h2>
      
      {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter candidate name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="form-group">
          <label>Experience (Years) *</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Skills *</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              placeholder="Enter skill and press Enter or click Add"
            />
            <button type="button" onClick={addSkill}>Add</button>
          </div>
          <div className="skills-input">
            {formData.skills.map(skill => (
              <div key={skill} className="skill-tag">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Projects</label>
          <textarea
            name="projects"
            value={formData.projects}
            onChange={handleInputChange}
            placeholder="List of projects worked on"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Brief bio or summary"
            rows="3"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? '⏳ Adding...' : '✅ Add Candidate'}
        </button>
      </form>
    </div>
  );
}

export default CandidateForm;
