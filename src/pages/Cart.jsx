import { Link } from 'react-router-dom'
import { useApp } from '../context/AppState'

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp()

  if (cart.length === 0) {
    return (
      <section className="text-center py-24 px-6">
        <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-4">Your Cart</h1>
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
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tighter text-dark-blue mb-8">Your Cart</h1>
      <div className="flex flex-col gap-4 mb-8">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border border-black/10 rounded p-4"
          >
            <div className="flex-1">
              <h2 className="font-semibold text-dark-blue">{item.name}</h2>
              <p className="text-sm text-black/60">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(item._id, item.qty - 1)}
                className="w-8 h-8 rounded border border-black/20 hover:bg-black/5 transition-colors"
              >
                -
              </button>
              <span className="w-6 text-center">{item.qty}</span>
              <button
                onClick={() => updateQty(item._id, item.qty + 1)}
                className="w-8 h-8 rounded border border-black/20 hover:bg-black/5 transition-colors"
              >
                +
              </button>
              <span className="w-20 text-right font-medium">
                ${(item.price * item.qty).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red hover:opacity-80 transition-opacity ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-black/10 pt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-dark-blue">
          Total: ${cartTotal.toFixed(2)}
        </span>
        <Link
          to="/checkout"
          className="bg-dark-blue text-white px-6 py-2 rounded hover:bg-light-blue hover:text-black transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </section>
  )
}
