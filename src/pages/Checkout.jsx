import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppState'

export default function Checkout() {
  const { cart, cartTotal } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/order')
  }

  if (cart.length === 0) {
    return (
      <section className="text-center py-24 px-6">
        <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-4">Checkout</h1>
        <p className="text-black/60 mb-6">Your cart is empty. Add items before checking out.</p>
        <Link
          to="/products"
          className="bg-dark-blue text-white px-6 py-2 rounded hover:bg-light-blue hover:text-black transition-colors"
        >
          Browse Products
        </Link>
      </section>
    )
  }

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="border border-black/20 rounded px-4 py-2 focus:outline-none focus:border-dark-blue"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            required
            className="border border-black/20 rounded px-4 py-2 focus:outline-none focus:border-dark-blue"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            required
            className="border border-black/20 rounded px-4 py-2 focus:outline-none focus:border-dark-blue"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="ZIP Code"
            required
            className="border border-black/20 rounded px-4 py-2 focus:outline-none focus:border-dark-blue"
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
          />
          <button
            type="submit"
            className="bg-dark-blue text-white py-2 rounded hover:bg-light-blue hover:text-black transition-colors mt-2"
          >
            Place Order
          </button>
        </form>
        <div className="md:col-span-3 border border-black/10 rounded p-6 h-fit">
          <h2 className="font-semibold text-dark-blue mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between text-sm mb-2">
              <span>
                {item.name} x{item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-black/10 pt-2 mt-2 flex justify-between font-bold text-dark-blue">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
