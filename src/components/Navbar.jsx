import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppState'

export default function Navbar() {
  const { user, cart, logout } = useApp()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const linkCls = 'hover:text-light-blue transition-colors'
  const cartLinkCls = 'hover:text-light-blue transition-colors relative'

  const navLinks = !user ? (
    <>
      <Link to="/login" className={linkCls} onClick={close}>Login</Link>
      <Link to="/register" className="bg-light-blue text-black px-3 py-1 rounded hover:opacity-90 transition-opacity text-center" onClick={close}>Register</Link>
    </>
  ) : (
    <>
      <Link to="/products" className={linkCls} onClick={close}>Products</Link>
      <Link to="/cart" className={cartLinkCls} onClick={close}>
        Cart
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-4 bg-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>
        )}
      </Link>
      <Link to="/checkout" className={linkCls} onClick={close}>Checkout</Link>
      <Link to="/order" className={linkCls} onClick={close}>Order</Link>
      <Link to="/payment" className={linkCls} onClick={close}>Payment</Link>
      <span className="text-light-blue text-sm truncate max-w-[120px]">{user.email}</span>
      <button onClick={() => { logout(); close() }} className="bg-red px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity">Logout</button>
    </>
  )

  return (
    <nav className="bg-dark-blue text-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tighter hover:text-light-blue transition-colors whitespace-nowrap">
          <span className="hidden sm:inline">TEXTURAL APPARELS</span>
          <span className="sm:hidden">TEXTURA</span>
        </Link>
        <div className="hidden sm:flex items-center gap-4 lg:gap-6">{navLinks}</div>
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1 shrink-0"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="sm:hidden flex flex-col gap-3 px-6 pb-4 border-t border-white/10">
          {navLinks}
        </div>
      )}
    </nav>
  )
}
