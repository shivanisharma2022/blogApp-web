import { useState } from 'react';
import api from '../api';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '', profileImage: null });

  const handleChange = (e) => {
    if (e.target.name === 'profileImage') {
      setForm({ ...form, profileImage: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      const res = await api.post('/user/signup', data);
      alert('Signup successful');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="profileImage" type="file" accept="image/*" className="file-input w-full" onChange={handleChange} required />
        <button className="btn btn-primary w-full">Sign Up</button>
      </form>
    </div>
  );
}
