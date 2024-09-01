import { FastifyInstance } from 'fastify'

import { create } from './create-category'
import { addCategoryProducts } from './add-category-products'
import { listCategories } from './list-categories'
import { deleteCategory } from './delete-category'
import { search } from './search-categories'
import { getBySlug } from './get-category-by-slug'
import { addProductsByCategoryTitle } from './add-products-by-category-title'

export async function CategoriesRoutes(app: FastifyInstance) {
  app.post('/api/categories', create)
  app.get('/api/categories/:slug', getBySlug)
  app.post('/api/categories/add-products/:id', addCategoryProducts)
  app.post('/api/categories/add-products-by-title/:id', addProductsByCategoryTitle)
  app.get('/api/categories/all', listCategories)
  app.get('/api/categories/search', search)
  app.delete('/api/categories/:id', deleteCategory)
}
