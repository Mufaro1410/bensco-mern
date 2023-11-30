import { Modal } from "antd"

const usersModal = ({title, toggle, resetEditing, }) => {
  return (
    <Modal 
        title={title}
        open={toggle}
        okText="Save"
        onCancel={() => {
            resetEditing()
        }}
        onOk={() => {
            setUsersData((prev) => {
                return prev.map(user => {
                    if (user._id === editingUser._id) {
                        return editingUser
                    } else {
                        return user
                    }
                })
            })
            resetEditing()
        }}
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
    </Modal>
  )
}

export default usersModal

