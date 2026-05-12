import { get, post, destroy } from './helpers/ApiRequestsHelper'

// TODO exam: implements endpoints for: getCategoriesByRestaurant, getCategoryDetail, create, remove

function getCategoriesByRestaurant(restaurantId) {
  return get(`/productCategories/restaurants/${restaurantId}`)
}

function getCategoryDetail(id) {
  return get(`/productCategories/${id}`)
}

function create(restaurantId, data) {
  return post(`/productCategories/restaurants/${restaurantId}`, data)
}

function remove(restaurantId, productCategoryId) {
  return destroy(`/productCategories/${restaurantId}/categories/${productCategoryId}`)
}

export { getCategoryDetail, getCategoriesByRestaurant, create, remove }

// TODO exam: END
