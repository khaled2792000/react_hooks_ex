import React, { useContext, useState } from "react";
import { Context } from "../../App";

export default function SystemAdmin() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")).filter(
      (user) => user.username != "admin"
    )
  );
  function callme() {
    console.log("khaled");
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
                      onError={() => {
                        setUser((prev) => ({
                          ...prev,
                          userImage:
                            "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
                        }));
                      }}
                    />
                    <p>{user.username}</p>
                  </td>
                  <td>
                    {user.firstName}, {user.lastName}
                  </td>
                  <td>{user.birthday}</td>
                  <td>
                    {user.roadName} {user.phone}, {user.city}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => console.log("yes")}>edit</button>
                    <button></button>
                  </td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
}
