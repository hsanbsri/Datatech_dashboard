import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserForm = ({ addUser, updateUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userToEdit = location.state?.user;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    avatar_url: "",
    membershipStatus: "aktif",
  });

  useEffect(() => {
    if (userToEdit) {
      setUserData({
        name: userToEdit.name,
        email: userToEdit.email,
        age: userToEdit.age,
        avatar_url: userToEdit.avatar_url,
        membershipStatus: userToEdit.membershipStatus,
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar_url") {
      const file = e.target.files[0];
      // Create a URL for the file
      setUserData({ ...userData, avatar_url: URL.createObjectURL(file) });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToEdit) {
      updateUser({ ...userData, id: userToEdit.id });
    } else {
      addUser(userData);
    }
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>{userToEdit ? "Edit Pengguna" : "Tambah Pengguna"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Umur</label>
          <input
            type="number"
            id="age"
            name="age"
            value={userData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar_url">Profile</label>
          <input
            type="file"
            id="avatar_url"
            name="avatar_url"
            onChange={handleChange}
            required
          />
          {/* Show image preview if avatar_url is set */}
          {userData.avatar_url && (
            <img src={userData.avatar_url} alt="Avatar Preview" style={{ width: "100px", marginTop: "10px" }} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="membershipStatus">Status Keanggotaan</label>
          <select
            id="membershipStatus"
            name="membershipStatus"
            value={userData.membershipStatus}
            onChange={handleChange}
          >
            <option value="aktif">Aktif</option>
            <option value="tidak aktif">Tidak Aktif</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          {userToEdit ? "Perbarui" : "Tambah"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
