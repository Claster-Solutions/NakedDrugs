import fb from '@/app/tools/firebase/queries'
import React, { useState } from 'react'

// const EditForm = (p: User) => {
//     const [editedUser, setEditedUser] = useState(p)
//     const handleSubmit = async () => {
//         fb.setUser(editedUser)
//     }
//     const handleChange = (event) => {
//         setEditedUser({
//             ...editedUser,
//             [event.target.name]: event.target.value,
//         })
//     }
//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Edit Profile</h2>
//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     value={editedUser.name}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={editedUser.email}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>

//             <button type="submit">Edit Profile</button>
//         </form>
//     )
// }
// export default EditForm

const EditPageForm = (user: User) => {
    const [editedUser, setEditedUser] = useState(user) // Pre-fill with user data

    const handleChange = (event: { target: { name: any; value: any } }) => {
        setEditedUser({
            ...editedUser,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        fb.setUser(editedUser) // Update user data using fb.setUser()
        // Optional: Display success message or redirect to a confirmation page
        console.log('User profile edited successfully!')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Edit Profile</button>
        </form>
    )
}

export default EditPageForm
