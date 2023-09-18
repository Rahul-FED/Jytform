import React from 'react';

function Preview({ submittedData}) {
  return (
    <div className='step'>
    <h2>Submitted Data</h2>
    <p>First Name: {submittedData.firstName}</p>
    <p>Last Name: {submittedData.lastName}</p>
    <p>Email: {submittedData.email}</p>
    <p>Contact Number: {submittedData.contactNumber}</p>
    <p>Gender: {submittedData.gender}</p>
    <p>Interests: {submittedData.interests.join(', ')}</p>
    <p>Location: {submittedData.location}</p>
    <p>About: {submittedData.about}</p>
  </div>
  


  );
}

export default Preview;
