import React, { useEffect, useState } from 'react'
import './ManageUser.css'
import UserForm from '../../components/UserForm/UserForm'
import UserList from '../../components/UserList/UserList'
import { fetchUsers } from '../../Service/UserService';
import toast from 'react-hot-toast';
export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [])
  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UserForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UserList users={users} setUsers={setUsers} />
      </div>
    </div>
  )
}
