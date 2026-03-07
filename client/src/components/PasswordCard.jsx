import { useState } from "react";

function PasswordCard({ password, onEdit, onDelete }) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
           <div>{password.website}</div> 
           <div>{password.username}</div>
           <div>{showPassword ? password.password : '********'}</div>
           <button onClick={() => setShowPassword(!showPassword)}>
            Show Password
           </button>

           <div>
            <button onClick={() => onEdit(password)}>
                Edit
            </button>
           </div>

           <div>
            <button onClick={() => onDelete(password._id)}>
                Delete
            </button>
           </div>
        </div>

    );

}


export default PasswordCard;