import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // to cancel any pending request

    const getUsers = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/get`, {
          signal: controller.signal,
        });

        const usersData = data.users.map((user: IUser) => {
          const { role, name, email } = user;
          return { role, name, email };
        });
        isMounted && setUsers(usersData);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "CanceledError") return;
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  return (
    <main className="users page-flex">
      <article>
        <h1>Users List</h1>
        {users.length ? (
          <ul>
            {users.map((user) => (
              <li key={user.email}>
                【{user.role}】{user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
      </article>
    </main>
  );
};

export default Users;
