import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setNip(response.data.nip);
        setEmail(response.data.email);
        // Password is typically not fetched for security reasons
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to fetch user data. Please try again.");
      }
    };

    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    // Validation
    if (!name || !nip || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage("");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name,
        nip,
        email,
        password,
      });
      setSuccessMessage("User updated successfully!");
      setErrorMessage(""); // Clear any previous error message
      setTimeout(() => {
        navigate("/");
      }, 2000); // Navigate back to home page after 2 seconds
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to update user. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div style={{ margin: '40px' }}></div>
        <label className="columns is-centered"
               style={{ color: '#fff7d1', fontSize: '30px', fontFamily: 'Roboto, sans-serif' }}>iTure - EDIT ADMIN ACCOUNT</label>
        <div style={{ margin: '30px' }}></div>
        <form onSubmit={updateUser}>

          {successMessage && (
            <div className="notification is-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="notification is-danger">{errorMessage}</div>
          )}

          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name' />
            </div>
          </div>
          <div className="field">
            <label className="label">NIP</label>
            <div className="control">
              <input type="text"
                className="input"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder='NIP' />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email' />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password' />
            </div>
          </div>
          <div className="field">
            <button type='submit' className='button is-success' style={{ backgroundColor: '#038c5a', color: '#ffffff' }}>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser;
