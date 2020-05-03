/**
 * Parameterized Routing with next-route
 *
 * Benefits: Less code, and easily handles complex url structures
 **/
const routes = (module.exports = require('next-routes')())

routes.add('/products/:categoryid/:subcategoryId/:childCatId/:subChildCatId','products/category/categories')
routes.add('/products/:categoryid/:subcategoryId/:childCatId','products/category/categories')
routes.add('/products/:categoryid/:subcategoryId','products/category/categories')
routes.add('/products/:categoryid','products/category/categories')