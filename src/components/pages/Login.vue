<template>
  <div>
    <HomeNavbar/>
    <section class="container px-0">
      <div class="row no-gutters justify-content-center">
        <div class="col-md-6 justify-content-center">
          <div class="bg-primary d-md-none">
            <h1 class="text-white text-center py-5 mb-0">會員登入</h1>
          </div>
          
          <form @submit.prevent="signin">
            <div class="bg-primary d-none d-md-block">
              <h1 class="text-white text-center py-6 mb-0">會員登入</h1>
            </div>
            <div class="bg-primary p-5 pb-md-3 pt-md-0">
              <div class="form-square form-square-withicon d-flex justify-content-between text-primary mb-2">
                <label for="inputUser" class="material-icons form-square-icon-left">person</label>
                <input type="text" id="inputUser" class="form-input w-100" placeholder="電子郵件/手機號碼" v-model="user.username" required autofocus>
              </div>
              <div class="form-square form-square-withicon d-flex justify-content-between text-primary mb-2">
                <label for="inputPassword" class="material-icons form-square-icon-left">vpn_key</label>
                <input type="password" id="inputPassword" class="form-input w-100" placeholder="請輸入使用者密碼" v-model="user.password" required>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="remember">
                <label class="custom-control-label text-white" for="remember">記住我</label>
              </div>
            </div>
            <button class="btn btn-minor btn-block btn-xl text-primary font-weight-bold py-2 mb-md-7" type="submit">登入帳號</button>
          </form> 
        </div>
      </div>
    </section>
    <Footer/>
    <!-- <form class="form-signin" @submit.prevent="signin">
      <router-link to="/" class="d-block text-center mb-3">
        <img src="../../assets/images/logo-all-dark.svg" alt="" width="200">
      </router-link>
      <h1 class="h4 mb-3 text-center font-weight-normal">請登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.username" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password" required>
      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="remember-me">
        <label class="custom-control-label" for="remember-me">記住我</label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form> -->
  </div>
</template>

<script>
import HomeNavbar from '../HomeNavbar';
import Footer from '../Footer';

export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
        username: '',
        password: '',
      } ,
    };
  },
  components: {
    HomeNavbar,
    Footer,
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}admin/signin` ;
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push('/admin/products')
        }
      });
    }
  },
}
</script>