import { auth, firestore } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import { useState } from 'react'

interface Props {
    user: User
}

const EditPageForm = (p: Props) => {
    const [editedUser, setEditedUser] = useState(p.user)

    const handleChange = (event: { target: { name: any; value: any } }) => {
        setEditedUser({
            ...editedUser,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async () => {
        try {
            await fb.setUser(editedUser)
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" value={editedUser.name} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={editedUser.email} onChange={handleChange} required />
            </div>
            <button type="submit">Edit Profile</button>
        </form>
    )
}

export default EditPageForm
