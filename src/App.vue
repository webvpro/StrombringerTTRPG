<template>
  <div>
    <header class="bg-indigo-900 shadow" v-if="$route.meta.title">
      <page-header />
    </header>
    <main>
      <router-view/>
    </main>
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

