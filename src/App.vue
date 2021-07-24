<template>
  <div class="h-full w-full flex flex-col flex-nowrap flex-grow">
    <header class="bg-indigo-900 shadow" v-if="$route.meta.title">
      <PageHeader user={false} />
    </header>
    <div class="flex-grow flex flex-col">
      <router-view/>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue';
import PageHeader from '@/components/PageHeader.vue';


export default defineComponent({
  components: {
    PageHeader
  },
})
</script>

