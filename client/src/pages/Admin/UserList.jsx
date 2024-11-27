import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../redux/api/usersApiSlice'
import { Message } from "../../components/Message"

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUserName, setEditableUserName] = useState('')
  const [editableUserEmail, setEditableUserEmail] = useState('')

  useEffect(() => {
    refetch(); // Fetch user data when the component loads
  }, [refetch])

  // Delete user handler
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap()
        refetch()
        toast.success('User deleted successfully')
      } catch (error) {
        toast.error(error.data?.message || error.message)
      }
    }
  }

  // Toggle edit mode and populate editable fields
  const toggleEdit = (id, username, email) => {
    setEditableUserId(id)
    setEditableUserName(username)
    setEditableUserEmail(email)
  }

  // Update user handler
  const updateHandler = async () => {
    // Make sure editableUserId is set before proceeding
    if (!editableUserId) {
      toast.error('User ID is missing!');
      return;
    }

    // Log data for debugging purposes
    console.log("Updating user with ID:", editableUserId);
    console.log("Updated username:", editableUserName);
    console.log("Updated email:", editableUserEmail);

    try {
      // Prepare the data to be updated
      const updateData = { _id: editableUserId, username: editableUserName, email: editableUserEmail };
      
      // Perform the update
      await updateUser(updateData).unwrap()
      refetch()  // Refetch user data after update
      setEditableUserId(null)  // Reset editable user ID after update
      
      toast.success('User updated successfully')
    } catch (error) {
      toast.error(error.data?.message || error.message)
    }
  }

  return (
    <div className="p-4">
      <h1 className='text-2xl font-semibold mb-4'>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : (
        <div className='flex flex-col md:flex-row'>
          <table className='w-full md:w-4/5 mx-auto'>
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">USERNAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className='flex items-center'>
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="border w-full rounded-lg p-2"
                        />
                        <button onClick={updateHandler} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className='flex items-center'>
                        {user.username}
                        <button onClick={() => toggleEdit(user._id, user.username, user.email)} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className='flex items-center'>
                        <input
                          type="email"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="border w-full rounded-lg p-2"
                        />
                        <button onClick={updateHandler} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className='flex items-center'>
                        <p>{user.email}</p>
                        <button onClick={() => toggleEdit(user._id, user.username, user.email)} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (<FaTimes className='text-red-500' />)}
                  </td>
                  <td className="px-4 py-4">
                    {!user.isAdmin && (
                      <div className="flex ">
                        <button onClick={() => deleteHandler(user._id)} className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserList

