import React, { useContext, useState } from "react";
import { Context, ProfileContext, ShowContext } from "../../App";

export default function SystemAdmin() {
  const [userToEdit, setUserToEdit] = useContext(Context);
  const [show, setShow] = useContext(ProfileContext);
  const [setShowLogin] = useContext(ShowContext);

  const loadData = localStorage.getItem("users");
  console.log("rednder", loadData);
  const [users, setUsers] = useState(
    loadData == ""
      ? []
      : JSON.parse(localStorage.getItem("users") ?? "[]").filter(
          (user) => user.username != "admin"
        )
  );

  const logoutUser = () => {
    sessionStorage.clear();
    location.reload();
    setShowLogin(true);
  };

  function deleteUser(userToDelete) {
    const remainingData = JSON.stringify(
      users.filter((user) => user.username != userToDelete.username)
    );
    localStorage.setItem("users", remainingData);
    console.log(remainingData);
    setUsers(
      JSON.parse(localStorage.getItem("users")).filter(
        (user) => user.username != "admin"
      )
    );
  }

  return (
    <>
      <div>
        <h1>Admin page</h1>
        {users.length == 0 ? (
          <h2>No users in the system</h2>
        ) : (
          <table>
            <tr>
              <th>name</th>
              <th>full name</th>
              <th>birth day</th>
              <th>address</th>
              <th>email</th>
              <th></th>
            </tr>
            {users.map((user) => {
              return (
                <tr key={user.email}>
                  <td>
                    <img
                      src={user.userImage}
                      alt=""
                      onError={(e) => {
                        e.target.src =
                          "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
                      }}
                    />
                    <p>{user.username}</p>
                  </td>
                  <td>
                    {user.firstName}, {user.lastName}
                  </td>
                  <td>{user.birthday}</td>
                  <td>
                    {user.roadName} {user.houseNumber}, {user.city}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setShow((prev) => !prev);
                        setUserToEdit(user);
                      }}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => {
                        deleteUser(user);
                      }}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        )}
        <button onClick={logoutUser}>logout</button>
      </div>
    </>
  );
}
