import { useState, useEffect } from "react"; 
import { savePassword, updatePassword, deletePassword, getPasswords } from "../services/api";
import PasswordCard from "../components/PasswordCard";
import PasswordForm from "../components/PasswordForm";


function DashBoard({onLogout}) {

    const [passwords, setPasswords] = useState([]);
    const [isError, setError] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [editPassword, setEditPassword] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchPasswords = async () => {
        try {
            setLoading(true);
            const data = await getPasswords();
            setPasswords(data.savedPasswords);
            setError("");
        } catch (error) {
            setError("Page was not able to load.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPasswords();
   }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await deletePassword(id);
            setPasswords(passwords.filter((p) => p._id != id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (password) => {
        setShowForm(true);
        setEditPassword(password);
    };

    const handleAdd = () => {
        setShowForm(true);
        setEditPassword(null);
    };

    const handleSave = async (data) => {
        if (editPassword) {
            await updatePassword(editPassword._id, data.website, data.username, data.password);
            setPasswords(passwords.map((p) => (
                (p._id === editPassword._id) ? (
                    {...p, ...data}
                ) : p
            )));
        } else {
            await savePassword(data.website, data.username, data.password);
            setPasswords([...passwords, data]);
        }

        setEditPassword(null);
        setShowForm(false);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{isError}</div>;
    if (passwords.length === 0) return <h4>No Saved Passwords</h4>;

    return (
    <div>
        <h1>DashBoard</h1>
        {passwords.map((data) => (
            <PasswordCard
            key={data._id}
            password={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />
        ))}

        <div>
            <button onClick={handleAdd}>
                Add New Password
            </button>
        </div>

        {showForm && (
            <PasswordForm
            onSave={handleSave} 
            onCancel={() => setShowForm(false)}
            initalData={editPassword} />
        )}

        <button onClick={onLogout}>
            Logout
        </button>
    </div>
)}


export default DashBoard;

