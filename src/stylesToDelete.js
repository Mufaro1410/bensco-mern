
// // :root {
// //     /* colors */
// //     --primary-100: #e2e0ff;
// //     --primary-200: #c1beff;
// //     --primary-300: #a29dff;
// //     --primary-400: #837dff;
// //     --primary-500: #645cff;
// //     --primary-600: #504acc;
// //     --primary-700: #3c3799;
// //     --primary-800: #282566;
// //     --primary-900: #141233;
  
// //     /* grey */
// //     --grey-50: #f8fafc;
// //     --grey-100: #f1f5f9;
// //     --grey-200: #e2e8f0;
// //     --grey-300: #cbd5e1;
// //     --grey-400: #94a3b8;
// //     --grey-500: #64748b;
// //     --grey-600: #475569;
// //     --grey-700: #334155;
// //     --grey-800: #1e293b;
// //     --grey-900: #0f172a;
// //     /* rest of the colors */
// //     --black: #222;
// //     --white: #fff;
// //     --red-light: #f8d7da;
// //     --red-dark: #842029;
// //     --green-light: #d1e7dd;
// //     --green-dark: #0f5132;
  
// //     /* fonts  */
  
// //     --small-text: 0.875rem;
// //     --extra-small-text: 0.7em;
// //     /* rest of the vars */
// //     --backgroundColor: var(--grey-50);
// //     --textColor: var(--grey-900);
// //     --borderRadius: 0.25rem;
// //     --letterSpacing: 1px;
// //     --transition: 0.3s ease-in-out all;
// //     --max-width: 1120px;
// //     --fixed-width: 600px;
  
// //     /* box shadow*/
// //     --shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// //     --shadow-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
// //       0 2px 4px -1px rgba(0, 0, 0, 0.06);
// //     --shadow-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
// //       0 4px 6px -2px rgba(0, 0, 0, 0.05);
// //     --shadow-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
// //       0 10px 10px -5px rgba(0, 0, 0, 0.04);
// //   }


// p {
//     margin-bottom: 1.5rem;
//     max-width: 40em;
//   }
  
//   h1,
//   h2,
//   h3,
//   h4,
//   h5 {
//     margin: 0;
//     margin-bottom: 1.38rem;
//     font-family: var(--headingFont);
//     font-weight: 400;
//     line-height: 1.3;
//     text-transform: capitalize;
//     letter-spacing: var(--letterSpacing);
//   }
  
//   h1 {
//     margin-top: 0;
//     font-size: 3.052rem;
//   }
  
//   h2 {
//     font-size: 2.441rem;
//   }
  
//   h3 {
//     font-size: 1.953rem;
//   }
  
//   h4 {
//     font-size: 1.563rem;
//   }
  
//   h5 {
//     font-size: 1.25rem;
//   }
  
//   small,
//   .text-small {
//     font-size: var(--small-text);
//   }
  
//   a {
//     text-decoration: none;
//   }
//   ul {
//     list-style-type: none;
//     padding: 0;
//   }
  
//   .img {
//     width: 100%;
//     display: block;
//     object-fit: cover;
//   }
//   /* buttons */
  
//   .btn {
//     cursor: pointer;
//     color: var(--white);
//     background: var(--primary-500);
//     border: transparent;
//     border-radius: var(--borderRadius);
//     letter-spacing: var(--letterSpacing);
//     padding: 0.375rem 0.75rem;
//     box-shadow: var(--shadow-1);
//     transition: var(--transition);
//     text-transform: capitalize;
//     display: inline-block;
//   }
//   .btn:hover {
//     background: var(--primary-700);
//     box-shadow: var(--shadow-3);
//   }
//   .btn-hipster {
//     color: var(--primary-500);
//     background: var(--primary-200);
//   }
//   .btn-hipster:hover {
//     color: var(--primary-200);
//     background: var(--primary-700);
//   }
//   .btn-block {
//     width: 100%;
//   }
  
//   /* alerts */
//   .alert {
//     padding: 0.375rem 0.75rem;
//     margin-bottom: 1rem;
//     border-color: transparent;
//     border-radius: var(--borderRadius);
//   }
  
//   .alert-danger {
//     color: var(--red-dark);
//     background: var(--red-light);
//   }
//   .alert-success {
//     color: var(--green-dark);
//     background: var(--green-light);
//   }
//   /* form */
  
//   .form {
//     width: 90vw;
//     max-width: 400px;
//     background: var(--white);
//     border-radius: var(--borderRadius);
//     box-shadow: var(--shadow-2);
//     padding: 2rem 2.5rem;
//     margin: 3rem 0;
//   }
//   .form-label {
//     display: block;
//     font-size: var(--small-text);
//     margin-bottom: 0.5rem;
//     text-transform: capitalize;
//     letter-spacing: var(--letterSpacing);
//   }
//   .form-input,
//   .form-textarea {
//     width: 100%;
//     padding: 0.375rem 0.75rem;
//     border-radius: var(--borderRadius);
//     background: var(--backgroundColor);
//     border: 1px solid var(--grey-200);
//   }
  
//   .form-row {
//     margin-bottom: 1rem;
//   }
  
//   .form-textarea {
//     height: 7rem;
//   }
//   ::placeholder {
//     font-family: inherit;
//     color: var(--grey-400);
//   }
//   .form-alert {
//     color: var(--red-dark);
//     letter-spacing: var(--letterSpacing);
//     text-transform: capitalize;
//   }
//   /* alert */
  
//   @keyframes spinner {
//     to {
//       transform: rotate(360deg);
//     }
//   }
//   .form h5 {
//     text-align: center;
//   }
//   .form .btn {
//     margin-top: 0.5rem;
//   }
//   .loading {
//     width: 6rem;
//     height: 6rem;
//     border: 5px solid var(--grey-400);
//     border-radius: 50%;
//     border-top-color: var(--primary-500);
//     animation: spinner 0.6s linear infinite;
//   }
//   .loading {
//     margin: 0 auto;
//   }
//   /* title */
  
//   .title {
//     text-align: center;
//   }
  
//   .title-underline {
//     background: var(--primary-500);
//     width: 7rem;
//     height: 0.25rem;
//     margin: 0 auto;
//     margin-top: -1rem;
//   }
  
//   .section {
//     padding: 2rem 0;
//     width: 90vw;
//     max-width: var(--max-width);
//     margin: 0 auto;
//   }
  
// .navbar {
//     width: 90vw;
//     max-width: var(--max-width);
//     margin: 0 auto;
//     display: flex;
//     gap: 1rem;
//   }
  
//   .link {
//     color: var(--grey-500);
//   }
  
//   .active {
//     color: var(--primary-500);
//   }
//   .trucks article {
//     margin-bottom: 1rem;
//   }
  
//   .trucks h5 {
//     margin-bottom: 0;
//   }
  
//   .truck img {
//     width: 200px;
//     height: 150px;
//   }



// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Table, Space, Button, Modal, Input } from 'antd'
// import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

// const UsersPage = () => {
//     const [isEditing, setIsEditing] = useState(false)
//     const [editingUser, setEditingUser] = useState({})
//     const [usersData, setUsersData] = useState([])

//     useEffect(() => {
//         const getUsersData = async () => {
//             const res = await axios.get('/users')
//             const data = res.data.users
//             setUsersData(data)
//         }
//         getUsersData()
//     }, [])

//     const columns = [
//         // {
//         //     title: 'ID',
//         //     dataIndex: '_id',
//         //     key: '_id',
//         // },
//         {
//             title: 'First Name',
//             dataIndex: 'firstname',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.firstname - b.firstname,
//             key: 'firstname',
//         },
//         {
//             title: 'Last Name',
//             dataIndex: 'lastname',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.lastname - b.lastname,
//             key: 'lastname',
//         },{
//             title: 'Email',
//             dataIndex: 'email',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.email - b.email,
//             key: 'email',
//         },
//         {
//             title: 'Date of Birth',
//             dataIndex: 'dob',
//             defaultSortOrder: 'descend',
//             sorter: (a, b) => a.dob - b.dob,
//             // key: 'dob',
//         },
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.address - b.address,
//             key: 'address',
//         },
//         {
//             title: 'Role',
//             dataIndex: 'role',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.role - b.role,
//             key: 'role',
//         },
//         {
//             title: 'Username',
//             dataIndex: 'username',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.username - b.username,
//             key: 'username',
//         },
//         // {
//         //     title: 'Password',
//         //     dataIndex: 'password',
//         //     key: 'password',
//         // },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (record) => {
//                 return (
//                     <Space size='large'>
//                         <EditOutlined style={{color:'blue'}} onClick={() => {
//                             EditUser(record)
//                         }} />
//                         <DeleteOutlined style={{color:'red'}} onClick={() => {
//                             DeleteUser(record)
//                         }} />
//                     </Space>
//                 )
//             }
//         }
//     ]

//     const AddUser = () => {
//         const newUser = {}
//         setUsersData((prevUserData) => {
//             return [...prevUserData, newUser]
//         })
//     }

//     const EditUser = (record) => {
//         setIsEditing(true)
//         setEditingUser({...record})
//     }

//     const DeleteUser = (record) => {
//         Modal.confirm({
//             title: 'Are you sure you want to delete user record',
//             okText: 'Yes',
//             okType:'danger',
//             onOk: () => {
//                 setUsersData((prevUserData) => {
//                     return prevUserData.filter((user) => user._id !== record._id)
//                 })
//             }
//         })
//     }

//     const resetEditing = () => {
//         setIsEditing(false)
//         setEditingUser({})
//     }

//     return (
//         <section className='section'>
//             <h1>Users</h1>
//             {/* {(usersData === 'undefined') ? (
//                 <h1>Loading...</h1>
//             ) : (
//                 usersData.map((user) => (
//                     <h1 key={user._id}>{user.username}</h1>
//                 ))
//             )} */}
//             <Button onClick={AddUser}>Add New User</Button>
//             <Table rowKey={usersData => usersData._id} dataSource={usersData} columns={columns}></Table>
//             <Modal 
//                 title="Edit User"
//                 open={isEditing}
//                 okText="Save"
//                 onCancel={() => {
//                     resetEditing()
//                 }}
//                 onOk={() => {
//                     setUsersData((prev) => {
//                         return prev.map(user => {
//                             if (user._id === editingUser._id) {
//                                 return editingUser
//                             } else {
//                                 return user
//                             }
//                         })
//                     })
//                     resetEditing()
//                 }}
//             >
//                 <Input placeholder='Enter First Name' value={editingUser?.firstname} onChange={(e) => {
//                     setEditingUser(prev => {
//                         return {...prev, firstname:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Last Name' value={editingUser?.lastname} onChange={(e) => {
//                     setEditingUser(prev => {
//                         return {...prev, lastname:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Email' value={editingUser?.email} onChange={(e) => {
//                     setEditingUser(prev => {
//                         return {...prev, email:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Date of Birth' value={editingUser?.dob} onChange={(e) => {
//                     setEditingUser(prev => {
//                         return {...prev, dob:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Address' value={editingUser?.address} onChange={(e) => {
//                     setEditingUser(prev => {
//                         return {...prev, address:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Role' value={editingUser?.role} onChange={(e) => {
//                     setEditingUser(prev => {
//                         return {...prev, role:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Username' value={editingUser?.username} onChange={(e) => {
//                     setEditingUser(prev => {
//                         return {...prev, username:e.target.value}
//                     })
//                 }} />
//             </Modal>
//         </section>
//     )
// }

// export default UsersPage



// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Table, Space, Button, Modal, Input } from 'antd'
// import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

// const UsersPage = () => {
//     const [isAdding, setIsAdding] = useState(false)
//     const [newUser, setNewUser] = useState({})
//     const [usersData, setUsersData] = useState([])

//     useEffect(() => {
//         const getUsersData = async () => {
//             // if (newUser) {
//             //     await axios.post('/users', newUser)
//             // }
//             const res = await axios.get('/users')
//             const data = res.data.users
//             setUsersData(data)
//         }
//         getUsersData()
//     }, [usersData.length])

//     const columns = [
//         // {
//         //     title: 'ID',
//         //     dataIndex: '_id',
//         //     key: '_id',
//         // },
//         {
//             title: 'First Name',
//             dataIndex: 'firstname',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.firstname - b.firstname,
//             key: 'firstname',
//         },
//         {
//             title: 'Last Name',
//             dataIndex: 'lastname',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.lastname - b.lastname,
//             key: 'lastname',
//         },{
//             title: 'Email',
//             dataIndex: 'email',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.email - b.email,
//             key: 'email',
//         },
//         {
//             title: 'Date of Birth',
//             dataIndex: 'dob',
//             defaultSortOrder: 'descend',
//             sorter: (a, b) => a.dob - b.dob,
//             // key: 'dob',
//         },
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.address - b.address,
//             key: 'address',
//         },
//         {
//             title: 'Role',
//             dataIndex: 'role',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.role - b.role,
//             key: 'role',
//         },
//         {
//             title: 'Username',
//             dataIndex: 'username',
//             // defaultSortOrder: 'descend',
//             // sorter: (a, b) => a.username - b.username,
//             key: 'username',
//         },
//         // {
//         //     title: 'Password',
//         //     dataIndex: 'password',
//         //     key: 'password',
//         // },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (record) => {
//                 return (
//                     <Space size='large'>
//                         <EditOutlined style={{color:'blue'}} 
//                         // onClick={() => { EditUser(record)}} 
//                         />
//                         <DeleteOutlined style={{color:'red'}} onClick={() => {DeleteUser(record)}} 
//                         />
//                     </Space>
//                 )
//             }
//         }
//     ]

//     const AddUser = () => {
//         setIsAdding(true)

//         // addNewUser({...record})
//         // const newUser = {}
//         // setUsersData((prevUserData) => {
//         //     return [...prevUserData, newUser]
//         // })
//     }

//     // const EditUser = (record) => {
//     //     setIsEditing(true)
//     //     setEditingUser({...record})
//     // }

//     const DeleteUser = (record) => {
//         Modal.confirm({
//             title: 'Are you sure you want to delete user record',
//             okText: 'Yes',
//             okType:'danger',
//             onOk: () => {
//                 setUsersData((prevUserData) => {
//                     return {...prevUserData, newUser}
//                 })
//             }
//         })
//     }

//     const resetAdding = () => {
//         setIsAdding(false)
//         setNewUser({})
//     }

//     return (
//         <section className='section'>
//             <h1>Users</h1>
//             {/* {(usersData === 'undefined') ? (
//                 <h1>Loading...</h1>
//             ) : (
//                 usersData.map((user) => (
//                     <h1 key={user._id}>{user.username}</h1>
//                 ))
//             )} */}
//             <Button className='btn' onClick={AddUser}>Add New User</Button>
//             <Table rowKey={usersData => usersData._id} dataSource={usersData} columns={columns}></Table>
//             <Modal 
//                 title="Add User"
//                 open={isAdding}
//                 okText="Save"
//                 onCancel={() => {
//                     resetAdding()
//                 }}
//                 onOk={() => {
//                     setUsersData((prevUserData) => {
//                         return [...prevUserData, newUser]
//                     })
//                     resetAdding()
//                 }}
//             >
//                 <Input placeholder='Enter First Name' value={newUser?.firstname} onChange={(e) => {
//                     setNewUser((prev) => {
//                         return {...prev, firstname:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Last Name' value={newUser?.lastname} onChange={(e) => {
//                     setNewUser((prev) => {
//                         return {...prev, lastname:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Email' value={newUser?.email} onChange={(e) => {
//                     setNewUser((prev) => {
//                         return {...prev, email:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Date of Birth' value={newUser?.dob} onChange={(e) => {
//                     setNewUser((prev) => {
//                         return {...prev, dob:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Address' value={newUser?.address} onChange={(e) => {
//                     setNewUser((prev) => {
//                         return {...prev, address:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Role' value={newUser?.role} onChange={(e) => {
//                     setNewUser((prev) => {
//                         return {...prev, role:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Enter Username' value={newUser?.username} onChange={(e) => {
//                     setNewUser((prev) => {
//                         return {...prev, username:e.target.value}
//                     })
//                 }} />
//                 <Input placeholder='Password' value={newUser?.password} onChange={(e) => {
//                     setNewUser((prev) => {
//                         return {...prev, password:e.target.value}
//                     })
//                 }} />
//             </Modal>
//         </section>
//     )
// }

// export default UsersPage