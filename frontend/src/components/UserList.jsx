import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setSuccessMessage("User deleted successfully!");
      setErrorMessage(""); // Clear any previous error message
      setTimeout(() => {
        getUsers();
      }, 2000); // Refresh user list after 2 seconds
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage("Failed to delete user. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        {successMessage && (
          <div className="notification is-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="notification is-danger">{errorMessage}</div>
        )}

        <Link to={`add`} className="button is-success">Add New</Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>NIP</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.nip}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`edit/${user.id}`} className="button is-small is-info">Edit</Link>
                  <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
