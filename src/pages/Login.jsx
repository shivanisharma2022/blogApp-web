import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/login', form);
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} required />
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}
