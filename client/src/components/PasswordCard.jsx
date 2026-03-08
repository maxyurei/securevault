import { useState } from "react";

function PasswordCard({ password, onEdit, onDelete }) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-gray-300 border rounded-lg shadow-md p-4 space-y-1.5">
           <div className="font-bold text-2xl text-center mb-8 uppercase">{password.website}</div> 
           <div className="font-medium">Username: {password.username}</div>
           <div className="font-medium">Password: {showPassword ? password.password : '********'}</div>
           <button onClick={() => setShowPassword(!showPassword)} className="btn-secondary cursor-pointer">
            Show Password
           </button>

           <div className="flex gap-2 justify-end">
            <button onClick={() => onEdit(password)} className="btn-secondary cursor-pointer">
                Edit
            </button>
            <button onClick={() => onDelete(password._id)} className="btn-danger cursor-pointer">
                Delete
            </button>
           </div>

        </div>

    );

}


export default PasswordCard;