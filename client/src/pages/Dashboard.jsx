import { useState, useEffect } from "react"; 
import { savePassword, updatePassword, deletePassword, getPasswords } from "../services/api";
import PasswordCard from "../components/PasswordCard";
import PasswordForm from "../components/PasswordForm";


function DashBoard({ onLogout }) {

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
            const response = await savePassword(data.website, data.username, data.password);
            setPasswords([...passwords, response.savePassword]);
        }

        setEditPassword(null);
        setShowForm(false);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{isError}</div>;
    if (passwords.length === 0) return <h4>No Saved Passwords</h4>;

    return (
    <div className="p-6 max-w-7xl mx-auto">

<div className="flex justify-between items-center mb-8">
  <div className="w-32">
    <button onClick={handleAdd} className="btn-primary cursor-pointer">
      Add New Password
    </button>
  </div>
  
  <h1 className="text-3xl uppercase text-gray-200 font-bold">Dashboard</h1>
  
  <div className="w-32 flex justify-end">
    <button onClick={onLogout} className="btn-secondary cursor-pointer">
      Logout
    </button>
  </div>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {passwords.map((data) => (
            <PasswordCard
            key={data._id}
            password={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />
        ))}
        </div>

        {showForm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <PasswordForm
            onSave={handleSave} 
            onCancel={() => setShowForm(false)}
            initalData={editPassword} />
            </div>
            </div>
        )}
    </div>
)}


export default DashBoard;

