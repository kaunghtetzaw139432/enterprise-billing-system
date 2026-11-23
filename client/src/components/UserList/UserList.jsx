import React, { useState } from 'react'
import { deleteUser } from '../../Service/UserService';
import toast from 'react-hot-toast';

export default function UserList({ users, setUsers }) {
  // searchTerm လို့ပဲ တသမတ်တည်း သုံးပါမည်
  const [searchTerm, setSearchTerm] = useState("");

  // filter လုပ်တဲ့အခါ return ထည့်ပေးရန် လိုပါသည်
  const filterUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByUserId = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.userId !== id));
      toast.success("User Deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Unable to delete users")
    }
  }

  return (
    <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <div className="row pe-2" >
        <div className="input-group mb-3">
          <input type="text"
            name="keyword"
            id="keyword"
            placeholder='Search by keyword'
            className='form-control'
            // setSearchItem အစား setSearchTerm ဟု ပြင်ပါ
            onChange={(e) => setSearchTerm(e.target.value)}
            // searchItem အစား searchTerm ဟု ပြင်ပါ
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {
          filterUsers.map((user, index) => {
            return (
              <div key={index} className='col-12'>
                <div className="card p-3 bg-dark">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="flex-grow">
                      <h5 className='mb-1 text-white'>{user.name}</h5> 
                      <p className="mb-0 text-white">{user.email}</p>
                    </div>
                    <div>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteByUserId(user.userId)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}