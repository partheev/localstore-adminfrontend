export const routes = {
  AddProduct: '/admin/products/addproducts',
  Analytics: '/admin/dashboard/analytics',
  ManageProducts: '/admin/products/manageproducts',
  Login: '/admin/login',
}

export const authApiRoutes = {
  host: 'localhost',
  protocal: 'http',
  port: 5000,
  Route: function (route: string) {
    const preUrl = this.protocal + '://' + this.host + ':' + this.port
    return preUrl + route
  },
  login: '/api/admin/login',
  logout: '/api/admin/logout',
}
export const apiRoutes = {
  host: 'localhost',
  protocal: 'http',
  port: 4000,
  Route: function (route: string) {
    const preUrl = this.protocal + '://' + this.host + ':' + this.port
    return preUrl + route
  },
  getcategory: '/api/category',
  addcategory: '/api/category',
  getallproducts: '/api/all-products',
}
