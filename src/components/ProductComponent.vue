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
      <span class="badge new" v-if="product.new">Nuevo</span>
      <span class="badge offer" v-if="product.offer">Oferta</span>
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
      <p class="description__price" :style="{color : price_color}">
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
          @keyup.enter="sendDiscount($event, product)"
        />
      </div>
      <button :disabled="product.stock == 0" @click="sendToCart(product)">
        Agregar al carrito
      </button>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  props: { product: {} },
  data() {
    return {
      activeImage: 0,
      price_color: "rgb(104,104,209)"
    };
  },
  methods: {
    sendDiscount(event: Event, product: any) {
      this.$emit("send-discount", event, product);
    },

    sendToCart(product: any) {
      this.$emit("send-to-cart", product);
    },
  },
  watch : {
  //  activeImage(value, oldValue){

   // },
    "product.stock"(stock){
      if (stock <= 1){
        this.price_color = "rgb(188,30,67)"
      } 
    }
  }
});
</script>
