import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppState'

export default function Register() {
  const { signup } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'customer' })
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await signup(form.email, form.password, form.role)
      navigate('/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <section className="max-w-md mx-auto py-24 px-6">
      <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-8">Create Account</h1>
      {error && <p className="text-red mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          required
          className="border border-black/20 rounded px-4 py-2 focus:outline-none focus:border-dark-blue"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="border border-black/20 rounded px-4 py-2 focus:outline-none focus:border-dark-blue"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="border border-black/20 rounded px-4 py-2 focus:outline-none focus:border-dark-blue bg-white"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-dark-blue text-white py-2 rounded hover:bg-light-blue hover:text-black transition-colors"
        >
          Register
        </button>
      </form>
      <p className="text-sm text-black/60 mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-dark-blue underline">
          Sign in
        </Link>
      </p>
    </section>
  )
}
