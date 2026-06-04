import { Link } from 'react-router-dom'
import { useApp } from '../context/AppState'

export default function Order() {
  const { cartTotal } = useApp()

  return (
    <section className="py-24 px-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-4">Order Placed</h1>
      <p className="text-black/60 mb-2">Your order has been placed successfully.</p>
      <p className="text-black/60 mb-6">
        Total charged: <span className="font-bold text-dark-blue">${cartTotal.toFixed(2)}</span>
      </p>
      <p className="text-sm text-black/40 mb-8">Status: Pending</p>
      <Link
        to="/products"
        className="bg-dark-blue text-white px-6 py-2 rounded hover:bg-light-blue hover:text-black transition-colors"
      >
        Continue Shopping
      </Link>
    </section>
  )
}
