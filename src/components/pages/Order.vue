<template>
  <div>
    <HomeNavbar/>
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 p-0 px-lg-1">
            <div class="pb-0 pb-md-7">
              <form @submit.prevent="payOrder">
                <div class="bg-primary text-primary-200 py-5 px-6">
                  <div class="form-row mb-5">
                    <div class="col-6">
                      <h1 class="m-0">訂單資訊</h1>
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="process-step w-100">
                        <div class="step-circle material-icons completed">done</div>
                        <div class="step-circle material-icons" :class="{'completed': order.is_paid, 'active': !order.is_paid}">
                          <div v-if=" order.is_paid">done</div>
                        </div>
                        <div class="step-circle material-icons" :class="{'completed': order.is_paid}">
                          <div v-if=" order.is_paid">done</div>
                        </div>
                      </div>
                    </div>
                  </div>

                    <table class="table mb-7">
                      <thead>
                        <th>品名</th>
                        <th>數量</th>
                        <th class="text-right">單價</th>
                      </thead>
                      <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                          <td class="align-middle">{{ item.product.title }}</td>
                          <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
                          <td class="align-middle text-right">NT$ {{ item.final_total | currency }}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="2" class="text-right">運費</td>
                          <td class="text-right">NT$ 60</td>
                        </tr>
                        <tr>
                          <td colspan="2" class="text-right">總計</td>
                          <td class="text-right">NT$ {{ order.total + 60 | currency }}</td>
                        </tr>
                      </tfoot>
                    </table>

                    <table class="table">
                      <tbody>
                        <tr>
                          <th width="150">Email</th>
                          <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                          <th>姓名</th>
                          <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                          <th>收件人電話</th>
                          <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                          <th>收件人地址</th>
                          <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                          <th>付款狀態</th>
                          <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                <button class="btn btn-minor btn-block btn-xl text-primary font-weight-bold py-3" v-if="order.is_paid === false">確認付款去</button>
                <router-link to="/" class="btn btn-minor btn-block btn-xl text-primary font-weight-bold py-3" v-else>繼續購物</router-link>
              </form>

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
      order: {
        user: {},
      },
      orderId: '',
    }
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then((response) => {
        console.log(response);
        if (response.data.success) {
          this.getOrder();
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();
  },
};
</script>