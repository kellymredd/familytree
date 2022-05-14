import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Template from "../shared/Template";
// import useMembers from "../hooks/useMembers.hook";
import httpUserService from "../hooks/userService";

export default function ListMembersScreen() {
  const [users, setUsers] = useState([]);
  // const { getMembers } = useMembers();
  const { listUsers } = httpUserService();

  // useEffect(() => {
  //   getMembers().then((response) => setUsers(response));
  // }, []);

  useEffect(() => {
    listUsers().then((response) => {
      // console.log(JSON.stringify(response));
      setUsers(response);
    });
  }, [listUsers]);

  return (
    <Template>
      <Template.Head>
        <h2>Family Members</h2>
      </Template.Head>
      <Template.Body>
        <ul className={classnames("list-group", "listUsers")}>
          {users
            ?.sort((a, b) => {
              let nameA = a.FirstName.toUpperCase();
              let nameB = b.FirstName.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
            ?.map((user, idx) => (
              <li key={idx} className="list-group-item">
                <Link
                  to={`/${user.id}`}
                  title={`View ${user.FirstName}'s profile`}
                >
                  {user.FirstName} {user.MiddleName} {user.LastName}
                </Link>{" "}
                <Link
                  to={`/${user.id}/edit`}
                  title={`Edit ${user.FirstName}'s profile`}
                >
                  <i className="fas fa-pen"></i>
                </Link>{" "}
                {user?.id && (
                  <Link
                    to={`/${user.id}/tree`}
                    title={`View ${user.FirstName}'s Familiy Tree`}
                  >
                    View Tree
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </Template.Body>
    </Template>
  );
}
