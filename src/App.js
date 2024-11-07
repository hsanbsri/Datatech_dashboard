import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import "./styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cek apakah data pengguna ada di localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers && Array.isArray(storedUsers)) {
      setUsers(storedUsers);
      setFilteredUsers(storedUsers);
      setLoading(false);
    } else {
      // Jika tidak ada di localStorage, ambil data dari API
      fetch("https://api.github.com/users")
        .then((response) => {
          if (!response.ok) throw new Error("Gagal mengambil data");
          return response.json();
        })
        .then((data) => {
          const usersWithAdditionalData = data.map((user) => ({
            id: user.id,
            name: user.login,
            email: `${user.login}@example.com`,
            age: Math.floor(Math.random() * 50) + 18,
            membershipStatus: Math.random() > 0.5 ? "aktif" : "tidak aktif",
            avatar_url: user.avatar_url,
            html_url: user.html_url,
          }));
          setUsers(usersWithAdditionalData);
          setFilteredUsers(usersWithAdditionalData);
          localStorage.setItem("users", JSON.stringify(usersWithAdditionalData)); // Simpan ke localStorage
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []); // Hanya dijalankan sekali setelah komponen pertama kali dimuat

  const addUser = (newUser) => {
    const newUsers = [...users, { ...newUser, id: Date.now() }];
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers)); // Simpan data pengguna ke localStorage
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Simpan update ke localStorage
  };

  const deleteUser = (id) => {
    const remainingUsers = users.filter((user) => user.id !== id);
    setUsers(remainingUsers);
    setFilteredUsers(remainingUsers);
    localStorage.setItem("users", JSON.stringify(remainingUsers)); // Simpan setelah dihapus ke localStorage
  };

  const filterUsers = (query) => {
    if (query) {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <UserTable
                users={filteredUsers}
                deleteUser={deleteUser}
                loading={loading}
                error={error}
                filterUsers={filterUsers} // Pass filter function to UserTable
              />
            }
          />
          <Route
            path="/form"
            element={<UserForm addUser={addUser} updateUser={updateUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
