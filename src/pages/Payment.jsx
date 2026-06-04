import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppState'

export default function Payment() {
  const { cart, cartTotal, clearCart } = useApp()
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  async function handlePay() {
    setProcessing(true)
    await new Promise((r) => setTimeout(r, 1500))
    clearCart()
    setProcessing(false)
    setDone(true)
  }

  if (done) {
    return (
      <section className="py-24 px-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-4">
          Payment Successful
        </h1>
        <p className="text-black/60 mb-6">Your payment has been processed and cart has been cleared.</p>
        <Link
          to="/products"
          className="bg-dark-blue text-white px-6 py-2 rounded hover:bg-light-blue hover:text-black transition-colors"
        >
          Continue Shopping
        </Link>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <section className="text-center py-24 px-6">
        <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-4">Payment</h1>
        <p className="text-black/60 mb-6">Your cart is empty.</p>
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
    <section className="py-24 px-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-8">Payment</h1>
      <div className="border border-black/10 rounded p-6 mb-6">
        <h2 className="font-semibold text-dark-blue mb-4">Order Total</h2>
        <p className="text-2xl font-bold text-dark-blue">${cartTotal.toFixed(2)}</p>
      </div>
      <button
        onClick={handlePay}
        disabled={processing}
        className="w-full bg-dark-blue text-white py-3 rounded hover:bg-light-blue hover:text-black transition-colors disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </section>
  )
}
