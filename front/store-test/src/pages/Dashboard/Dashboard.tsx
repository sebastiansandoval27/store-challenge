import React from 'react'
import ProductsGrid from '../../components/ProductsGrid'
import useDashboard from '../../hooks/useDashboard'

const Dashboard = () => {
  const { categories, loading, products, getProductsByCategory, addProductToCart } = useDashboard()

  return (
    <div className="dashboard-wrap flex flex-col items-center justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductsGrid
          getProductsByCategory={getProductsByCategory}
          categories={categories}
          products={products}
          addToCart={addProductToCart}
        />
      )}
    </div>
  )
}

export default Dashboard
