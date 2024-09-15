import React, { useState } from 'react';
import { addAthlete } from '../../api/api';  // Import the API function for adding an athlete
import '../../styles/AthleteForm.css'

const AthleteForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    fitness_goals: '',
    medical_conditions: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.age) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Call API to add the new athlete to the database
      const newAthlete = await addAthlete(formData);

      if (newAthlete) {
        alert("Athlete added successfully");
        onSuccess();  // Trigger success callback
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
      {/* Overlay background */}
      <div className="modal-overlay" onClick={onCancel}></div>

      {/* Modal form */}
      <div className="modal">
        <form className="athlete-form" onSubmit={handleSubmit}>
          <h2>Add New Athlete</h2>

          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Fitness Goals:</label>
            <input
              type="text"
              name="fitnessGoals"
              value={formData.fitness_goals}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Medical Conditions:</label>
            <input
              type="text"
              name="medicalConditions"
              value={formData.medical_conditions}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="modal-buttons">
            <button type="button" className="cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AthleteForm;
