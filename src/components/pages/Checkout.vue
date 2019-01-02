<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <HomeNavbar/>
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 p-0 px-lg-1">
          <div class="row">
    
            <div class="col-lg-7 pb-0 pb-md-7">
              <form @submit.prevent="createOrder">
                <div class="bg-primary text-primary-200 py-5 px-6">
                  <div class="form-row mb-5">
                    <div class="col-6">
                      <h1 class="m-0">運送</h1>
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="process-step w-100">
                        <div class="step-circle material-icons active"></div>
                        <div class="step-circle material-icons"></div>
                        <div class="step-circle material-icons"></div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="h4" for="email">電子郵件信箱</label>
                    <div class="input-group input-group-lg">
                      <input type="email" class="form-control form-control-lg bg-primary-200 border-right-0" name="email" id="email" v-validate="'required|email'" v-model="form.user.email" placeholder="example@email.com">
                    </div>
                    <span class="text-danger"  v-if="errors.has('email')">{{ errors.first('email') }}</span>
                  </div>

                  
                  <div class="form-group">
                    <label class="h4" for="username">收件人姓名</label>
                    <input type="text" class="form-control form-control-lg bg-primary-200" name="name" id="username" :class="{'is-invalid': errors.has('name')}" v-model="form.user.name" v-validate="'required'" placeholder="王小明">
                    <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span>
                  </div>
              
                  <div class="form-group">
                    <label class="h4" for="tel">電話</label>
                    <input type="tel" class="form-control form-control-lg bg-primary-200" name="tel" id="tel" v-model="form.user.tel" v-validate="'required'" placeholder="0912-345-678">
                    <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
                  </div>
              
                  <div class="form-group">
                    <label class="h4" for="useraddress">地址</label>
                    <input type="text" class="form-control form-control-lg bg-primary-200" name="address" id="useraddress" v-model="form.user.address" v-validate="'required'" placeholder="幸福路 520 號">
                    <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                  </div>

                  <div class="form-group">
                    <label for="useraddress">留言</label>
                    <textarea name="" id="" class="form-control" rows="5" v-model="form.message"></textarea>
                  </div>
                </div>
                <button type="submit" class="btn btn-minor btn-block btn-xl text-primary font-weight-bold py-3">下一步</button>
              </form>
            </div>

            <div class="col-lg-5 d-none d-lg-block">
              <div class="card border-primary-200 mb-3">
                <h2 class="h4 card-header bg-primary-200 border-primary-200 text-primary-100 text-center font-weight-bold">訂單摘要</h2>
                <div class="card-body text-primary-100">
                  <div class="d-flex justify-content-between mb-1" v-if="cart.total === cart.final_total">
                    <span>小計</span>
                    <span>NT$ {{ cart.total | currency }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-1" v-else>
                    <span>小計</span>
                    <span>NT$ {{ cart.final_total | currency }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>運費</span>
                    <span>NT$ 60</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="h5 font-weight-bold">總計</span>
                    <span class="h5 font-weight-bold">NT$ {{ cart.final_total + 60 | currency}}</span>
                  </div>
                </div>
              </div>

              <div class="card border-primary-200" >
                <h2 class="h4 card-header bg-primary-200 border-primary-200 text-primary-100 text-center font-weight-bold">購物清單</h2>
                <div class="card-body pt-0 cart">
                  <div class="d-flex mt-3" v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                    <div class="cart-image cart-image-sm mr-3" :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div>
                    <div class="d-flex align-items-center">
                      <div class="flex-fill text-primary-100">
                        <span>{{ item.product.title }} ({{ item.qty }})</span><br>
                        <span class="h5 font-weight-bold">NT$ {{ item.total | currency }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>


    </section>
    <Footer/>
  </div>
</template>

<script>
import HomeNavbar from '../HomeNavbar';
import Footer from '../Footer';

export default {
  components: {
    HomeNavbar,
    Footer,
  },
  data() {
    return {
      status: {
        loadingItem: '',
      },
      form:{
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
      },
      cart: {},
      isLoading: false,
      coupon_code: '',
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, {data:order}).then((response) => {
            console.log('訂單已建立', response);
            if (response.data.success) {
              vm.$router.push(`/order/${response.data.orderId}`)
            }
            // this.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
  },
  created() {
    this.getCart();

  },
}
</script>