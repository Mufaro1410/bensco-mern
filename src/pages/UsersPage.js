import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Space, Button, Modal, Input } from 'antd'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const UsersPage = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [newUser, setNewUser] = useState({})
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [isEditing, setIsEditing] = useState(false)
    const [editingUser, setEditingUser] = useState({})

    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        const getUsersData = async () => {
            const res = await axios.get('http://localhost:5001/users')
            const data = res.data.users
            setUsersData(data)
        }
        getUsersData()
    }, [])

    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: '_id',
        //     key: '_id',
        // },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.firstname - b.firstname,
            key: 'firstname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.lastname - b.lastname,
            key: 'lastname',
        },{
            title: 'Email',
            dataIndex: 'email',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.email - b.email,
            key: 'email',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.dob - b.dob,
            // key: 'dob',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.address - b.address,
            key: 'address',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.role - b.role,
            key: 'role',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.username - b.username,
            key: 'username',
        },
        // {
        //     title: 'Password',
        //     dataIndex: 'password',
        //     key: 'password',
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size='large'>
                        <EditOutlined style={{color:'blue'}} onClick={() => {
                            EditUser(record)
                        }} />
                        <DeleteOutlined style={{color:'red'}} onClick={() => {
                            DeleteUser(record)
                        }} />
                    </Space>
                )
            }
        }
    ]

    const AddUser = () => {
        setIsAdding(true)

        // const newUser = {}
        // setUsersData((prevUserData) => {
        //     return [...prevUserData, newUser]
        // })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = 'http://localhost:5000/users'
        // const user =  {"firstname": newUser.firstname, "lastname": newUser.lastname, "email": newUser.email,
        //     "dob":newUser.dob , "address": newUser.address, "role": newUser.role, "username": newUser.username,
        //     "password": newUser.password}
        // console.log(JSON.stringify(newUser));
        axios.post(url, newUser)
            .then((res) => {
                setUsersData((prev) => {
                    const newuser = res.data.user
                    return [...prev, newuser]
                })
            })
            .catch((err) => {
                console.log(err);
            })
        resetEditing()
    }

    const EditUser = (record) => {
        setIsEditing(true)
        setEditingUser({...record})
    }

    const handleEditUser = () => {
        // setUsersData((prev) => {
        //     return prev.map(user => {
        //         if (user._id === editingUser._id) {
        //             return editingUser
        //         } else {
        //             return user
        //         }
        //     })
        // })
        setUsersData((prev) => {
            return prev.map(user => {
                if (user._id === editingUser._id) {
                    let userId = editingUser._id
                    let url = `http://localhost:5000/users/${userId}`
                    axios.patch(url, editingUser)
                        .then((res) => {
                            return res
                        })
                        .catch((err) => {
                            return err
                        })
                    return editingUser
                } else {
                    return user
                }
            })
        })
        resetEditing()
    }

    const DeleteUser = (record) => {
        Modal.confirm({
            title: 'Are you sure you want to delete user record',
            okText: 'Yes',
            okType:'danger',
            onOk: () => handleDeleteUser(record)
        })
    }

    const handleDeleteUser = (record) => {
        // setUsersData((prevUserData) => {
        //     return prevUserData.filter((user) => user._id !== record._id)
        // })
        const userList = []
        usersData.forEach((user) => {
            if (user._id === record._id) {
                let userId = record._id
                let url = `http://localhost:5000/users/${userId}`
                axios.delete(url)
                    .then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        console.log(err);
                    })
            } else {
                userList.push(user)
            }
        })
        setUsersData(pre => {
            return userList
        })
        resetEditing()
    }

    const resetEditing = () => {
        setIsAdding(false)
        setNewUser({})
        setPasswordConfirm('')

        setIsEditing(false)
        setEditingUser({})
    }

    return (
        <section className='section'>
            <h1>Users</h1>
            {/* {(usersData === 'undefined') ? (
                <h1>Loading...</h1>
            ) : (
                usersData.map((user) => (
                    <h1 key={user._id}>{user.username}</h1>
                ))
            )} */}
            <Button onClick={AddUser} className='btn'>Add New User</Button>
            <Table rowKey={usersData => usersData._id} dataSource={usersData} columns={columns}></Table>
            <Modal 
                title="Edit User"
                open={isEditing}
                okText="Save"
                onCancel={() => {
                    resetEditing()
                }}
                onOk={handleEditUser}
            >
                <Input placeholder='Enter First Name' value={editingUser?.firstname} onChange={(e) => {
                    setEditingUser(prev => {
                        return {...prev, firstname:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Last Name' value={editingUser?.lastname} onChange={(e) => {
                    setEditingUser(prev => {
                        return {...prev, lastname:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Email' value={editingUser?.email} onChange={(e) => {
                    setEditingUser(prev => {
                        return {...prev, email:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Date of Birth' value={editingUser?.dob} onChange={(e) => {
                    setEditingUser(prev => {
                        return {...prev, dob:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Address' value={editingUser?.address} onChange={(e) => {
                    setEditingUser(prev => {
                        return {...prev, address:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Role' value={editingUser?.role} onChange={(e) => {
                    setEditingUser(prev => {
                        return {...prev, role:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Username' value={editingUser?.username} onChange={(e) => {
                    setEditingUser(prev => {
                        return {...prev, username:e.target.value}
                    })
                }} />
                <Input type='password' placeholder='Enter Password' value={editingUser?.password} onChange={(e) => {
                    setEditingUser(prev => {
                        return {...prev, password:e.target.value}
                    })
                }} />
            </Modal>



            <Modal 
                title="Add User"
                open={isAdding}
                okText="Save"
                onCancel={() => {
                    resetEditing()
                }}
                onOk={handleSubmit}
            >
                <Input placeholder='Enter First Name' value={newUser?.firstname} onChange={(e) => {
                    setNewUser(prev => {
                        return {...prev, firstname:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Last Name' value={newUser?.lastname} onChange={(e) => {
                    setNewUser(prev => {
                        return {...prev, lastname:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Email' value={newUser?.email} onChange={(e) => {
                    setNewUser(prev => {
                        return {...prev, email:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Date of Birth' value={newUser?.dob} onChange={(e) => {
                    setNewUser(prev => {
                        return {...prev, dob:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Address' value={newUser?.address} onChange={(e) => {
                    setNewUser(prev => {
                        return {...prev, address:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Role' value={newUser?.role} onChange={(e) => {
                    setNewUser(prev => {
                        return {...prev, role:e.target.value}
                    })
                }} />
                <Input placeholder='Enter Username' value={newUser?.username} onChange={(e) => {
                    setNewUser(prev => {
                        return {...prev, username:e.target.value}
                    })
                }} />
                <Input type='password' placeholder='Enter Password' value={newUser?.password} onChange={(e) => {
                    setNewUser(prev => {
                        return {...prev, password:e.target.value}
                    })
                }} />
                <Input type='password' placeholder='Re-enter Password' value={passwordConfirm} onChange={(e) => {
                    setPasswordConfirm(prev => {
                        return e.target.value
                    }) 
                }} />
            </Modal>
        </section>
    )
}

export default UsersPage