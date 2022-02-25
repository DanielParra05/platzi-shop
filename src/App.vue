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

  <div class="field" id="searchform">
    <input
      type="text"
      id="searchterm"
      placeholder="what are you searching for?"
      v-model="searchField"
      @keyup.enter="search"
    />
  </div>

  <product-component
    v-for="product in products"
    :key="product.name"
    :product="product"
    @send-to-cart="addToCart"
    @send-discount="applyDiscount"
  ></product-component>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
} from "vue";
import ProductComponent from "./components/ProductComponent.vue";
import Product from "./types/Product";
import Axios from "axios";

export default defineComponent({
  components: { ProductComponent },
  setup() {
    const productSate = reactive({
      products: new Array<Product>(),
      searchField: "",
    });

    const cartState = reactive({
      cartOpen: false,
      cart: new Array<any>(),
      total: computed(() => {
        var total: number = cartState.cart.reduce((prev, curr) => {
          const prevPrice = prev.price || prev;
          const prevQuantity = prev.quantity || 1;
          return prevPrice * prevQuantity + curr.price * curr.quantity;
        }, 0);

        return total;
      }),
    });

    Axios.get<Product[]>(
      "https://my-json-server.typicode.com/iosamuel/demo/products"
    ).then((res) => (productSate.products = res.data));

    function search() {
      Axios.get<Product[]>(
        "https://my-json-server.typicode.com/iosamuel/demo/products"
      ).then((resp) => {
        productSate.products = resp.data.filter(
          (result: { name: string }) =>
            result.name.toLowerCase() ==
              productSate.searchField.toLowerCase() ||
            "" == productSate.searchField
        );
      });
    }

    function addToCart(product: Product) {
      var proIndex = cartState.cart.findIndex(
        (prod) => prod.name == product.name
      );
      if (proIndex >= 0) {
        cartState.cart[proIndex].quantity += 1;
      } else {
        cartState.cart.push(product);
      }
      product.stock -= 1;
    }
    const discountCodes = ref(["PLATZI20", "DANIEL"]);

    function applyDiscount(event: Event, product: Product) {
      var discountCodeIndex: number = discountCodes.value.indexOf(
        (event.target as HTMLInputElement).value
      );
      if (discountCodeIndex >= 0) {
        product.price *= 50 / 100;
        discountCodes.value.splice(discountCodeIndex, 1);
      }
    }
    /**
  watch(cartState.cart, () => {
    cartState.total = cartState.cart.reduce((prev, curr) => {
      const prevPrice = prev.price || prev;
        const prevQuantity = prev.quantity || 1;
        return prevPrice * prevQuantity + curr.price * curr.quantity;
      }, 0);
    });
  */

    return {
      ...toRefs(cartState),
      ...toRefs(productSate),
      addToCart,
      applyDiscount,
      search,
    };
  },
});
</script>
