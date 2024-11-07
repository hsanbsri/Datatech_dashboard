import React from "react";
import { Link } from "react-router-dom";

const UserTable = ({ users, deleteUser, loading, error, filterUsers }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{`Error: ${error}`}</p>;

  return (
    <div className="table-section">
      <div className="table-header">
        <h2>Daftar Pengguna</h2>
        <input
          type="text"
          placeholder="Cari pengguna..."
          onChange={(e) => filterUsers(e.target.value)}
          className="filter-input"
        />
      </div>
      <br></br>
      <table className="user-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Umur</th>
            <th>Status Keanggotaan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="avatar"
                  />
                ) : (
                  <span>No Avatar</span>
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.membershipStatus}</td>
              <td>
                <button className="edit-btn">
                  <Link to="/form" state={{ user }}>
                    Edit
                  </Link>
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
