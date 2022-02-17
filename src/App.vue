<template>
  <header>
    <h3>PlatziCommerce</h3>
    <button class="cart">Carro (0)</button>
    <div class="cart-content">
      <div class="cart-content__product">
        <img src="" alt="" />
        <span>{{product.name}} - $ {{ new Intl.NumberFormat("es-CO").format(product.price)}}</span>
      </div>
      <div class="cart-content__product">
        <img src="" alt="" />
        <span>{{product.name}} - $ {{ new Intl.NumberFormat("es-CO").format(product.price)}}</span>
      </div>
    </div>
  </header>
  <main>
    <section class="product">
      <div class="product__thumbnails">
        <div class="thumb active"></div>
        <div class="thumb"></div>
      </div>
      <div class="product__image">
        <img src="" alt="" />
      </div>
    </section>
    <section class="description">
      <h4>{{product.name}}{{product.stock == 0? '😒' : '😊'}}</h4>
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
  components: {
  },
  data(){
    return {
      product:{
        name:"camara",
        price: 450000,
        stock : 0,
        content : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt atqu",
        images:[
          {
            image: "@/assets/images/camera.jpg",
            thumbnail:"@/assets/images/camera-thumb.jpg"
          },
          {
            image: "@/assets/images/camera-2.jpg",
            thumbnail:"@/assets/images/camera-2-thumb.jpg"
          }
        ]
      }
    }
  }
});
</script>
