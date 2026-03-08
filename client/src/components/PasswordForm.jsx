import { useState } from "react";

function PasswordForm({ initalData, onSave, onCancel }) {
    const [website, setWebsite] = useState(initalData?.website || '');
    const [username, setUsername] = useState(initalData?.username || '');
    const [password, setPassword] = useState(initalData?.password || '');


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            website: website,
            username: username,
            password: password
        }

        onSave(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="website" className="font-medium">
                    Website: 
                </label>
                <input type="text"
                id="website"
                value={website} 
                onChange={(e) => setWebsite(e.target.value)}
                className="input-field"
                required
                />
            </div>

            <div>
                <label htmlFor="username" className="font-medium">
                    Username: 
                </label>
                <input type="text"
                id="username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
                />
            </div>

            <div>
                <label htmlFor="password" className="font-medium">
                    Password: 
                </label>
                <input type="password"
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
                />
            </div>

        <button type="submit" className="btn-secondary mr-3 cursor-pointer">
            Save
        </button>
        <button type="button" onClick={onCancel} className="mt-6 btn-primary cursor-pointer">
            Cancel
        </button>

        </form>
    )

}

export default PasswordForm;