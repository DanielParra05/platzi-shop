<template>
  <header>
    <h3>PlatziCommerce</h3>
    <button class="cart">Carro (0)</button>
    <div class="cart-content">
      <div class="cart-content__product">
        <img :src="product.images[0].image" :alt="product.name" />
        <span
          >{{ product.name }} - $
          {{ new Intl.NumberFormat("es-CO").format(product.price) }}</span
        >
      </div>
      <div class="cart-content__product">
        <img :src="product.images[1].image" :alt="product.name" />
        <span
          >{{ product.name }} - $
          {{ new Intl.NumberFormat("es-CO").format(product.price) }}</span
        >
      </div>
    </div>
  </header>
  <main>
    <section class="product">
      <div class="product__thumbnails">
        <div
          class="thumb"
          :class="{ active: activeImages == 0 }"
          :style="{
            backgroundImage: 'url(' + product.images[0].thumbnail + ')',
          }"
        ></div>
        <div
          class="thumb"
          :class="{ active: activeImages == 1 }"
          :style="{
            backgroundImage: 'url(' + product.images[1].thumbnail + ')',
          }"
        ></div>
      </div>
      <div class="product__image">
        <img src="" alt="" />
      </div>
    </section>
    <section class="description">
      <h4>{{ product.name }}{{ product.stock == 0 ? "😒" : "😊" }}</h4>
      <span class="badge new">Nuevo</span>
      <span class="badge offer">Oferta</span>
      <p class="description__status"></p>
      <p class="description__price">$ 500.000</p>
      <p class="description__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt atque
        dolorum corporis, reiciendis eaque temporibus quod magnam amet ea natus
        delectus? Aut placeat ipsam minus labore voluptas. Porro, vel aliquid!
      </p>
      <div class="discount">
        <span>Codigo de Descuent:</span>
        <input type="text" placeholder="Ingresa tu codigo" />
      </div>
      <button>Agregar al carrito</button>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  data() {
    return {
      activeImages: 0,
      product: {
        name: "camara",
        price: 450000,
        stock: 0,
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
      },
    };
  },
});
</script>
