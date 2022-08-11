import axios from "../api/axios";

// get all users
export const getAllusers = async () => {
  const { data } = await axios.get(`/users/get`);
  return data;
};
// get user by Id
export const getUserById = async (userId: number) => {
  const { data } = await axios.get(`/users/get/${userId}`);
  return data;
};
// update user
export const updateUser = async (userId: number) => {
  const { data } = await axios.patch(`/users/update/${userId}`);
  return data;
};
// delete user
export const deleteUser = async (userId: number) => {
  const { data } = await axios.delete(`/users/delete/${userId}`);
  return data;
};
