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
    </div>
  </header>
 <product-component></product-component>
 <product-component></product-component>
 <product-component></product-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductComponent from "@/components/ProductComponent.vue";

export default defineComponent({
  name: "App",
  components: {ProductComponent},
  data() {
    return {
      cartOpen: false,
      cart: new Array<any>(),      
    };
  },
  methods: {
    
  },
});
</script>
