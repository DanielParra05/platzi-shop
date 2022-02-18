<template>
  <main>
    <section class="product">
      <div class="product__thumbnails">
        <div
          v-for="(image, index) in product.images"
          :key="image.thumbnail"
          class="thumb"
          :class="{ active: activeImage == index }"
          :style="{
            backgroundImage: 'url(' + product.images[index].thumbnail + ')',
          }"
          @click="activeImage = index"
        ></div>
      </div>
      <div class="product__image">
        <img :src="product.images[activeImage].image" :alt="product.name" />
      </div>
    </section>
    <section class="description">
      <h4>{{ product.name }}{{ product.stock == 0 ? "😒" : "😊" }}</h4>
      <badges-component :product="product"></badges-component>
      <p class="description__status" v-if="product.stock == 3">
        Quedan pocas unidades
      </p>
      <p class="description__status" v-else-if="product.stock == 2">
        Producto esta por terminarse
      </p>
      <p class="description__status" v-else-if="product.stock == 1">
        Ulitma unidad disponible
      </p>
      <p class="description__status" v-else-if="product.stock == 0">
        Out of stock
      </p>
      <p class="description__price">
        {{ new Intl.NumberFormat("es-CO").format(product.price) }}
      </p>
      <p class="description__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt atque
        dolorum corporis, reiciendis eaque temporibus quod magnam amet ea natus
        delectus? Aut placeat ipsam minus labore voluptas. Porro, vel aliquid!
      </p>
      <div class="discount">
        <span>Codigo de Descuent:</span>
        <input
          type="text"
          placeholder="Ingresa tu codigo"
          @keyup.enter="applyDiscount($event)"
        />
      </div>
      <button :disabled="product.stock == 0" @click="addToCart()">
        Agregar al carrito
      </button>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import BadgesComponent from "@/components/BadgesComponent.vue";

export default defineComponent({
  name: "ProductComponent",
  components: { BadgesComponent },
  props: {product : {} },
  setup(props) {
    const productSate = reactive({
      activeImage: 0
    });

    const discountCodes = ref(["PLATZI20", "DANIEL"]);
    function applyDiscount(event: Event) {
      var discountCodeIndex: number = discountCodes.value.indexOf(
        (event.target as HTMLInputElement).value
      );
      if (discountCodeIndex >= 0) {
       // props.product.price *= 50 / 100;
       // discountCodes.value.splice(discountCodeIndex, 1);
      }
    }
    /** 
    function addToCart() {
        var proIndex = cartState.cart.findIndex(
        (prod) => prod.name == props.product.name
      );
      if (proIndex >= 0) {
        cartState.cart[proIndex].quantity += 1;
      } else {
        cartState.cart.push(props.product);
      }
      props.product.stock -= 1;
    }  
          */

    setTimeout(() => {
      productSate.activeImage = 1;
    }, 2000);

    return {
      ...toRefs(productSate),

     // addToCart,
    };
  },
});
</script>
