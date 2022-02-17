<template>
  <header>
    <h3>PlatziCommerce</h3>
    <button class="cart">Carro (0)</button>
    <div class="cart-content" v-show="cartOpen">
      <div
        class="cart-content__product"
        :class="{'bg-gray': index & 1}"
        v-for="(carItem, index) in cart"
        :key="carItem.name"
      >
        <img :src="carItem.images[0].image" :alt="carItem.name" />
        <span
          >{{ carItem.name }} - $
          {{ new Intl.NumberFormat("es-CO").format(carItem.price) }}</span
        >
      </div>
    </div>
  </header>
  <main>
    <section class="product">
      <div class="product__thumbnails">
        <div
          v-for="(image, index) in product.images" 
          :key="image.thumbnail"
          class="thumb"
          :class="{ active: activeImages == index }"
          :style="{
            backgroundImage: 'url(' + product.images[index].thumbnail + ')',
          }"
        ></div>
      </div>
      <div class="product__image">
        <img src="" alt="" />
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
      <p class="description__status" v-else>Ulitma unidad disponible</p>
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
      <button :disabled="product.stock == 0">Agregar al carrito</button>
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
      cartOpen: true,
      cart: [
        {
          name: "Camara",
          price: 35000,
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
          new: false,
          offer: true,
        },
        {
          name: "CamaraPL",
          price: 65000,
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
          new: false,
          offer: true,
        },
        {
          name: "CamaraPL2",
          price: 3000,
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
          new: false,
          offer: true,
        },
      ],
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
        new: false,
        offer: true,
      },
    };
  },
});
</script>
