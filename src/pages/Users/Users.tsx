import React from "react";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useGetUsersQuery } from "../../services/usersApiSlice";
import "./Users.scss";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ErrorIcon from "@material-ui/icons/Error";

const Users = () => {
  // const [users, setUsers] = useState<IUser[]>([]);
  // const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, isSuccess } = useGetUsersQuery();

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController(); // to cancel any pending request

  //   const getUsers = async () => {
  //     try {
  //       const { data } = await axiosPrivate.get(`/users/get`, {
  //         signal: controller.signal,
  //       });

  //       const usersData = data.users.map((user: IUser) => {
  //         const { role, name, email } = user;
  //         return { role, name, email };
  //       });
  //       isMounted && setUsers(usersData);
  //     } catch (err: unknown) {
  //       if (err instanceof Error && err.name === "CanceledError") return;
  //       console.error(err);
  //       navigate("/login", { state: { from: location }, replace: true });
  //     }
  //   };

  //   getUsers();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, [axiosPrivate, navigate, location]);

  let content;
  if (isLoading) {
    content = (
      <div className="page-flex">
        <HourglassEmptyIcon />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <main className="users page-flex">
        <article>
          <h1>Users List</h1>
          {data.users.length ? (
            <ul>
              {data.users.map((user: IUser) => (
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
  } else {
    content = (
      <div className="page-flex">
        <ErrorIcon />
      </div>
    );
  }

  return content;
};

export default Users;
