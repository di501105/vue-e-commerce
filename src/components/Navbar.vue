<template>
  <div>
    <nav class="navbar navbar-light fixed-top navbar-expand-lg bg-white flex-lg-nowrap p-0 shadow">
      <router-link class="navbar-brand ml-2" to="/home">
        <img src="static/images/logo-all-dark.svg" class="img-fluid" width="150">
      </router-link>
      <button class="navbar-toggler d-lg-none d-flex align-items-center order-lg-1" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="material-icons">menu</i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto px-3">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">
            <i class="fas fa-boxes"></i>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupons">
            <i class="fas fa-ticket-alt"></i>
            優惠券
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/orderlist">
            <i class="fas fa-list-ol"></i>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/customer_order">
            <i class="fas fa-shopping-cart"></i>
            模擬訂單
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.APIPATH}logout`;
      this.$http.post(url).then((response) => {
        console.log(response.data);
        if(response.data.success) {
          vm.$router.push('/login')
        }
      });
    }
  },
};
</script>