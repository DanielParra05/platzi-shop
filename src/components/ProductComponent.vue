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
      <p class="description__price" :style="{ color: price_color }">
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
          @keyup.enter="sendDiscount($event)"
        />
      </div>
      <button :disabled="product.stock == 0" @click="sendToCart">
        Agregar al carrito
      </button>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from "vue";
import BadgesComponent from "@/components/BadgesComponent.vue";

export default defineComponent({
  name: "ProductComponent",
  components: { BadgesComponent },
  props: ["product"],
  emits: ["send-to-cart", "send-discount"],
  setup(props, { emit }) {
    const productState = reactive({
      activeImage: 0,
      //price_color: "rgb(104,104,209)",
      price_color: computed(() => {
        return props.product.stock <= 1
          ? "rgb(188, 30, 67)"
          : "rgb(104, 104, 209)";
      }),
    });

    function sendDiscount(event: Event) {
      emit("send-discount", event, props.product);
    }
    function sendToCart() {
      emit("send-to-cart", props.product);
    }

    watch(
      () => productState.activeImage,
      (val: number, oldValue: number) => {
        console.log(val, oldValue);
      }
    );
    /**
    watch(
      () => props.product.stock,
      (stock) => {
        if (stock <= 1) {
          productState.price_color = "rgb(188, 30, 67)";
        }
      }
      );

    const price_color = computed(() => {
      if (props.product.stock <= 1) {
        return "rgb(188, 30, 67)";
      }
      return "rgb(104, 104, 209)";
    });
      */
    return {
      ...toRefs(productState),

      sendToCart,
      sendDiscount,
    };
  },
});
</script>
