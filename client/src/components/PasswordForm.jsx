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
                <label htmlFor="website">
                    Website: 
                </label>
                <input type="text"
                id="website"
                value={website} 
                onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="username">
                    Username: 
                </label>
                <input type="text"
                id="username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">
                    Password: 
                </label>
                <input type="password"
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

        <button type="submit">
            Save
        </button>
        <button type="button" onClick={onCancel}>
            Cancel
        </button>

        </form>
    )

}

export default PasswordForm;