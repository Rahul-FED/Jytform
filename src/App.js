

import React, { useState } from 'react';
import './App.css';
import Preview from './Preview';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    gender: '',
    interests: [],
    location: '',
    about: '',
  });
  const [charCount, setCharCount] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const contactNumberRegex = /^\d{10}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFormData = { ...formData };

    if (type === 'checkbox') {
      let interests = [...formData.interests];
      if (checked) {
        interests.push(value);
      } else {
        interests = interests.filter((interest) => interest !== value);
      }
      newFormData = { ...newFormData, interests };
    } else {
      newFormData = { ...newFormData, [name]: value };
    }

    if (name === 'about') {
      setCharCount(value.length);
    }

    // Email validation
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    }

    // Contact number validation
    if (name === 'contactNumber') {
      if (!contactNumberRegex.test(value)) {
        setContactNumberError('Invalid contact number format');
      } else {
        setContactNumberError('');
      }
    }

    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      // Handle editing logic here (update the data)
      console.log('Form Data Updated:', formData);
      setIsEditing(false);
    } else {
      // Handle initial submission logic here
      console.log('Form Data Submitted:', formData);

      try {
        const response = await fetch('https://jytech.requestcatcher.com/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Form data sent successfully');
        } else {
          console.error('Failed to send form data');
        }
      } catch (error) {
        console.error('Error sending form data:', error);
      }

      setSubmittedData(formData);
    }
  };

  const handleStepChange = (step) => {
    setStep(step);
  };

  const handlePreview = () => {
    setStep(2);
  };

  return (
    <div className='app'>
      <h2>Registration Form - Step {step}</h2>
      {step === 1 && !isEditing && (
        <div className='step'>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className='error'>{emailError}</span>
          </label>
          <br />
          <label>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            <span className='error'>{contactNumberError}</span>
          </label>
          <br />
          <button onClick={() => handleStepChange(2)}>Next</button>
        </div>
      )}
      {step === 2 && !isEditing && (
        <div className='step'>
          <label>
            Gender:
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />{' '}
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
          <br />
          <label>
            Interests:
            <input
              type="checkbox"
              name="interests"
              value="Reading Books"
              checked={formData.interests.includes('Reading Books')}
              onChange={handleChange}
            />{' '}
            Reading Books
            <input
              type="checkbox"
              name="interests"
              value="Watching Movies"
              checked={formData.interests.includes('Watching Movies')}
              onChange={handleChange}
            />{' '}
            Watching Movies
            <input
              type="checkbox"
              name="interests"
              value="Others"
              checked={formData.interests.includes('Others')}
              onChange={handleChange}
            />{' '}
            Others
          </label>
          <br />
          <label>
            Location:
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </select>
          </label>
          <br />
          <label>
            About:
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              maxLength={100}
            />
            <div>Characters Remaining: {100 - charCount}</div>
          </label>
          <br />
          <button onClick={() => handleStepChange(1)}>Previous</button>
          <button className='preview-button' onClick={handlePreview}>Preview</button>
        </div>
      )}
      {step === 2 && isEditing && (
        <div className='step'>
          {/* Render the form fields as editable */}
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className='error'>{emailError}</span>
          </label>
          <br />
          <label>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            <span className='error'>{contactNumberError}</span>
          </label>
          <br />
          <label>
            Gender:
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />{' '}
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
          <br />
          <label>
            Interests:
            <input
              type="checkbox"
              name="interests"
              value="Reading Books"
              checked={formData.interests.includes('Reading Books')}
              onChange={handleChange}
            />{' '}
            Reading Books
            <input
              type="checkbox"
              name="interests"
              value="Watching Movies"
              checked={formData.interests.includes('Watching Movies')}
              onChange={handleChange}
            />{' '}
            Watching Movies
            <input
              type="checkbox"
              name="interests"
              value="Others"
              checked={formData.interests.includes('Others')}
              onChange={handleChange}
            />{' '}
            Others
          </label>
          <br />
          <label>
            Location:
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </select>
          </label>
          <br />
          <label>
            About:
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              maxLength={100}
            />
            <div>Characters Remaining: {100 - charCount}</div>
          </label>
          <br />
          <button onClick={() => handleStepChange(1)}>Previous</button>
          <button className='preview-button' onClick={handlePreview}>Preview</button>
          <button className='submit-button' onClick={handleSubmit}>Save Changes</button>
        </div>
      )}
      {step === 2 && !isEditing && (
        <div className='step preview'>
          <h2>Preview Page</h2>
          {/* Display submitted data */}
          <p>First Name: {formData.firstName}</p>
          <p>Last Name: {formData.lastName}</p>
          <p>Email: {formData.email}</p>
          <p>Contact Number: {formData.contactNumber}</p>
          <p>Gender: {formData.gender}</p>
          <p>Interests: {formData.interests.join(', ')}</p>
          <p>Location: {formData.location}</p>
          <p>About: {formData.about}</p>
          <button className='edit-button' onClick={() => setIsEditing(true)}>Edit</button>
          <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {submittedData && !isEditing && (
        <Preview submittedData={submittedData} />
      )}
      {/* Add navigation buttons */}
      {step === 1 && (
        <div className='step-navigation'>
          <button onClick={() => handleStepChange(2)}>Next</button>
        </div>
      )}
      {step === 2 && !isEditing && (
        <div className='step-navigation'>
          <button onClick={() => handleStepChange(1)}>Previous</button>
          <button className='preview-button' onClick={handlePreview}>Preview</button>
        </div>
      )}

     {successMessage && (
        <div className='success-message'>{successMessage}</div>
      )}
    </div>
  );
}

export default App;

