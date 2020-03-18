import request from '../utils/request'

export function login (loginInfo) {
  return request.post('/user/login', loginInfo)
}
export function findAllUser () {
  return request.get('/user/findAllUser')
}
export function updateUser (user) {
  return request.post('/user/updateUser', user)
}
export function deleteUser (user) {
  return request.post('/user/deleteUser', user)
}
export function getCategoryList () {
  return request.get('/category/listCategories')
}
export function deleteCategory (category) {
  return request.post('/category/deleteCategory', category)
}
export function updateCategory (category) {
  return request.post('category/updateCategory', category)
}
export function insertCategory (category) {
  return request.post('/category/insertCategory', category)
}
export function getSecondCategoryList () {
  return request.get('/secondCategory/listSecondCategory')
}

export function searchByName (searchInfo) {
  return request.post('/category/search', searchInfo)
}
