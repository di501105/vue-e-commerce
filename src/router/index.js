import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/pages/Home';
import Shopping from '@/components/pages/Shopping';
import Dashboard from '@/components/pages/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import ProductDetail from '@/components/pages/ProductDetail';
import Cart from '@/components/pages/Cart';
import Checkout from '@/components/pages/Checkout';
import Order from '@/components/pages/Order';
import Coupons from '@/components/pages/Coupons';
import OrderList from '@/components/pages/OrderList';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login',
    },//避免進入不存在的頁面
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: Shopping
    },
    {
      path: '/shopping/:productId',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/order/:orderId',
      name: 'Order',
      component: Order,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'orderlist',
          name: 'OrderList',
          component: OrderList,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
      ],
    },
  ]
})
