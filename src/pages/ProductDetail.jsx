import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { useApp } from '../context/AppState'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useApp()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then(({ data }) => setProduct(data.product || data))
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="text-center py-24 text-black/60">Loading...</p>
  if (error) return <p className="text-center py-24 text-red">{error}</p>
  if (!product) return null

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <Link
        to="/products"
        className="text-dark-blue underline text-sm mb-8 inline-block hover:text-light-blue transition-colors"
      >
        &larr; Back to Collection
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-12">
        <div className="md:col-span-4">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded mb-6" />
          <h1 className="text-4xl font-bold tracking-tighter text-dark-blue mb-4">
            {product.name}
          </h1>
          <p className="text-black/60 leading-relaxed mb-6">{product.description}</p>
          <p className="text-3xl font-bold text-dark-blue mb-8">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-dark-blue text-white px-8 py-3 rounded hover:bg-light-blue hover:text-black transition-colors"
          >
            Add to Cart
          </button>
        </div>
        <div className="md:col-span-3 border border-black/10 rounded p-6 h-fit">
          <h2 className="font-semibold text-dark-blue mb-3">Details</h2>
          <dl className="text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-black/60">ID</dt>
              <dd className="text-black">{product._id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/60">Price</dt>
              <dd className="text-dark-blue font-semibold">${product.price.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/60">Stock</dt>
              <dd className="text-black">{product.stock}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
