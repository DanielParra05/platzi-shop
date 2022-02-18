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
          @keyup.enter="applyDiscount"
        />
      </div>
      <button :disabled="product.stock == 0" @click="addToCart">
        Agregar al carrito
      </button>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  props: {},
  data() {
    return {
      activeImage: 0,
      discountCodes: ["PLATZI20", "DANIEL"],
      product: {
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
    };
  },
  methods : {
    applyDiscount(event: Event) {
      var discountCodeIndex: number = this.discountCodes.indexOf(
        (event.target as HTMLInputElement).value
      );
      if (discountCodeIndex >= 0) {
        this.product.price *= 50 / 100;
        this.discountCodes.splice(discountCodeIndex, 1);
      }
    },
    
      /**
    addToCart() {

      var proIndex = this.cart.findIndex(
        (prod) => prod.name == this.product.name
      );
      if (proIndex >= 0) {
        this.cart[proIndex].quantity += 1;
      } else {
        this.cart.push(this.product);
      }
      this.product.stock -= 1;
    }
  },
        */
  }});
</script>
