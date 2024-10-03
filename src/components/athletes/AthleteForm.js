import React, { useState } from 'react';
import { addAthlete } from '../../api/api';
import './AthleteForm.css';

/**
 * AthleteForm component is responsible for capturing athlete details via a form and submitting the data.
 *
 * @param {function} onSuccess - Function to call when the athlete is successfully added.
 * @param {function} onCancel - Function to call when the user cancels the form.
 */
const AthleteForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    fitness_goals: '',
    medical_conditions: '',
  });

  /**
   * Handles form field changes by updating the state.
   *
   * @param {object} e - Event triggered by input field change.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles form submission and sends athlete data to the server.
   *
   * @param {object} e - Event triggered by form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const newAthlete = await addAthlete(formData);

      if (newAthlete) {
        alert("Athlete added successfully");
        onSuccess();
      } else {
        throw new Error("Error adding athlete: No data returned");
      }
    } catch (error) {
      console.error("Add athlete failed:", error.message);
      alert("Error adding athlete");
    }
  };

  return (
    <>
    {/* Creates front end for athlete form */}
      <div className="modal-overlay" onClick={onCancel}></div>
      <div className="modal">
        <form className="athlete-form" onSubmit={handleSubmit}>
          <h2>Add New Athlete</h2>

          {['name', 'email', 'age', 'fitness_goals', 'medical_conditions'].map((field, index) => (
            <div className="input-group" key={index}>
              <label>{field.replace('_', ' ').toUpperCase()}:</label>
              <input
                type={field === 'age' ? 'number' : field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required={['name', 'email', 'age'].includes(field)}
              />
            </div>
          ))}

          <div className="modal-buttons">
            <button type="button" className="cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AthleteForm;
