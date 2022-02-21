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
    :key="product.name"
    :product="product"
    @send-to-cart="addToCart"
    @send-discount="applyDiscount"
  ></product-component>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch, computed } from "vue";
import ProductComponent from "@/components/ProductComponent.vue";
import Product from "@/types/Product";

export default defineComponent({
  components: { ProductComponent },
  setup() {
    const productSate = reactive({
      products: [
        {
          name: "camara",
          price: 450000,
          stock: 5,
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt atqu",
          images: [
            {
              image: require("@/assets/images/camara.jpg"),
              thumbnail: require("@/assets/images/camara-thumb.jpg"),
            },
            {
              image: require("@/assets/images/camara-2.jpg"),
              thumbnail: require("@/assets/images/camara-2-thumb.jpg"),
            },
          ],
          new: false,
          offer: true,
          quantity: 1,
        },
        {
          name: "camaraPl2",
          price: 36000,
          stock: 3,
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt atqu",
          images: [
            {
              image: require("@/assets/images/camara.jpg"),
              thumbnail: require("@/assets/images/camara-thumb.jpg"),
            },
            {
              image: require("@/assets/images/camara-2.jpg"),
              thumbnail: require("@/assets/images/camara-2-thumb.jpg"),
            },
          ],
          new: true,
          offer: true,
          quantity: 1,
        },
        {
          name: "camaraPl3",
          price: 150000,
          stock: 5,
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt atqu",
          images: [
            {
              image: require("@/assets/images/camara.jpg"),
              thumbnail: require("@/assets/images/camara-thumb.jpg"),
            },
            {
              image: require("@/assets/images/camara-2.jpg"),
              thumbnail: require("@/assets/images/camara-2-thumb.jpg"),
            },
          ],
          new: true,
          offer: false,
          quantity: 1,
        },
      ],
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
    };
  },
});
</script>
