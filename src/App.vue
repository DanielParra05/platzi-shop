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
import { defineComponent, ref, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const productSate = reactive({
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
      activeImage: 0,
    });

    const cartState = reactive({
      cartOpen: false,
      cart: new Array<any>(),
    });

    const discountCodes = ref(["PLATZI20", "DANIEL"]);
    function applyDiscount(event: Event) {
      var discountCodeIndex: number = discountCodes.value.indexOf(
        (event.target as HTMLInputElement).value
      );
      if (discountCodeIndex >= 0) {
        productSate.product.price *= 50 / 100;
        discountCodes.value.splice(discountCodeIndex, 1);
      }
    }

    function addToCart() {
      var proIndex = cartState.cart.findIndex(
        (prod) => prod.name == productSate.product.name
      );
      if (proIndex >= 0) {
        cartState.cart[proIndex].quantity += 1;
      } else {
        cartState.cart.push( productSate.product);
      }
       productSate.product.stock -= 1;
    }

    setTimeout(() => {
      productSate.activeImage = 1;
    }, 2000);

    return {
      ...toRefs(productSate),
      ...toRefs(cartState),

      applyDiscount,
      addToCart,
    };
  },
});
</script>
