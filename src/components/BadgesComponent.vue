<template>
  <span class="badge new" v-if="product.new" data-test="newBadge">Nuevo</span>
  <span class="badge offer" v-if="product.offer">Oferta</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:"BadgesComponent",
    props:["product"]
})
</script>
