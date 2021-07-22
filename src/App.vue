<template>
  <div class="h-screen w-screen overflow-hidden">
    <header class="bg-indigo-900 shadow" v-if="$route.meta.title">
      <page-header />
    </header>
    <div class="h-full w-full">
      <router-view/>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue';
import PageHeader from '@/components/PageHeader.vue';


export default defineComponent({
  components: {
    "page-header": PageHeader
  },
})
</script>

