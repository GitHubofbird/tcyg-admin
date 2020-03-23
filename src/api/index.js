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
export function searchByName (searchInfo) {
  return request.post('/category/searchByName', searchInfo)
}
// 用户权限API
export function getRuleList () {
  return request.get('/role/listRules')
}
export function deleteRule (role) {
  return request.post('/role/deleteRule', role)
}
export function updateRule (role) {
  return request.post('role/addRule', role)
}
export function insertRule (role) {
  return request.post('/role/addRule', role)
}
export function searchRuleByName (searchInfo) {
  return request.post('/role/searchByName', searchInfo)
}

// 二级分类API
export function getSecondCategoryList () {
  return request.get('/secondCategory/listAll')
}
export function deleteSecondCategory (secondCategory) {
  return request.post('/secondCategory/deleteSecondCategory', secondCategory)
}
export function updateSecondCategory (secondCategory) {
  return request.post('/secondCategory/addSecondCategory', secondCategory)
}
export function insertSecondCategory (secondCategory) {
  return request.post('/secondCategory/addSecondCategory', secondCategory)
}
export function searchSecondCategoryByName (searchInfo) {
  return request.post('/secondCategory/searchByName', searchInfo)
}
// 商品API
export function getProductList () {
  return request.get('/product/listAll')
}
export function deleteProduct (product) {
  return request.post('/product/deleteProduct', product)
}
export function updateProduct (product) {
  return request.post('/product/addProduct', product)
}
export function insertProduct (product) {
  return request.post('/product/addProduct', product)
}
export function searchProductByName (searchInfo) {
  return request.post('/product/searchByName', searchInfo)
}
