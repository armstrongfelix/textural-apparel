import { useState, useEffect } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/products')
      .then(({ data }) => setProducts(Array.isArray(data) ? data : data.products || []))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center py-24 text-black/60">Loading...</p>
  if (error) return <p className="text-center py-24 text-red">{error}</p>

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tighter text-dark-blue mb-12">
        Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}
