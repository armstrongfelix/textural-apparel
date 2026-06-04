import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppState'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <section className="max-w-md mx-auto py-24 px-6">
      <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-8">Sign In</h1>
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
        <button
          type="submit"
          className="bg-dark-blue text-white py-2 rounded hover:bg-light-blue hover:text-black transition-colors"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-black/60 mt-4 text-center">
        No account?{' '}
        <Link to="/register" className="text-dark-blue underline">
          Register
        </Link>
      </p>
    </section>
  )
}
