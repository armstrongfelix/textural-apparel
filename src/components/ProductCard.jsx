import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppState'

export default function ProductCard({ product }) {
  const { user, addToCart } = useApp()
  const navigate = useNavigate()

  function handleAddToCart(e) {
    e.preventDefault()
    if (!user) {
      navigate('/login', { state: { product } })
      return
    }
    addToCart(product)
  }

  return (
    <figure className="border border-black/10 rounded p-6 flex flex-col hover:-translate-y-0.5 transition-transform">
      <Link to={`/products/${product._id}`} className="flex-1 flex flex-col no-underline text-inherit">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded mb-3" />
        <figcaption className="text-lg font-semibold text-dark-blue mb-1">
          {product.name}
        </figcaption>
        <p className="text-black/60 text-sm mb-3 line-clamp-2">{product.description}</p>
        <p className="text-dark-blue font-bold text-xl mb-4">
          ${product.price.toFixed(2)}
        </p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-dark-blue text-white py-2 rounded hover:bg-light-blue hover:text-black transition-colors"
      >
        Add to Cart
      </button>
    </figure>
  )
}
