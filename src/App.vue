<template>
  <header>
    <h3>PlatziCommerce</h3>
    <button class="cart" @click="cartOpen = !cartOpen">
      Carro ({{ cart.length }})
    </button>
    <div class="cart-content" v-show="cartOpen">
      <div
        class="cart-content__product"
        :class="{ 'bg-gray': index & 1 }"
        v-for="(carItem, index) in cart"
        :key="carItem.name"
      >
        <img :src="carItem.images[0].image" :alt="carItem.name" />
        <span
          >{{ carItem.name }} - $
          {{ new Intl.NumberFormat("es-CO").format(carItem.price) }}
          ({{ carItem.quantity }})</span
        >
      </div>
      <p>Total: ${{ new Intl.NumberFormat("es-CO").format(total) }}</p>
    </div>
  </header>
  <product-component
    v-for="product in products"
    :key="product"
    :product="product"
    @send-to-cart="addToCart"
    @send-discount="addDiscount"
  ></product-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductComponent from "@/components/ProductComponent.vue";

export default defineComponent({
  name: "App",
  components: { ProductComponent },
  data() {
    return {
      cartOpen: false,
      cart: new Array<any>(),
      discountCodes: ["PLATZI20", "DANIEL"],
      totalPrice: 0,
      products: [],
    };
  },
  computed: {
    total() {
      var total: number = this.cart.reduce((prev, curr) => {
        const prevPrice = prev.price || prev;
        const prevQuantity = prev.quantity || 1;
        return prevPrice * prevQuantity + curr.price * curr.quantity;
      }, 0);
      return total;
    },
  },
  methods: {
    addToCart(product: any) {
      var proIndex = this.cart.findIndex((prod) => prod.name == product.name);
      if (proIndex >= 0) {
        this.cart[proIndex].quantity += 1;
      } else {
        this.cart.push(product);
      }
      product.stock -= 1;
    },
    addDiscount(event: Event, product: any) {
      var discountCodeIndex: number = this.discountCodes.indexOf(
        (event.target as HTMLInputElement).value
      );
      if (discountCodeIndex >= 0) {
        product.price *= 50 / 100;
        this.discountCodes.splice(discountCodeIndex, 1);
      }
    },
  },
  beforeCreate() {
    console.log("BeforeCreated");
  },
  created() {
    fetch("https://my-json-server.typicode.com/iosamuel/demo/products").then((res) =>
      res.json().then((data) => {
        this.products = data;
      })
    );
  },
  /** ,
  watch: {
    cart: {
      //Watcher de objeto
      handler(cart: Array<any>) {
        this.totalPrice = cart.reduce((prev, curr) => {
          const prevPrice = prev.price || prev;
          const prevQuantity = prev.quantity || 1;
          return prevPrice * prevQuantity + curr.price * curr.quantity;
        }, 0);
      },
      deep: true, //Observar todas las propiedades del arreglo de objetos
    },
  },*/
});
</script>
