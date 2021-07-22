<script>
import { defineComponent } from 'vue'
import SideDrawer from '@/components/SideDrawer.vue'


export default defineComponent({
  components: { SideDrawer },
    data: () => ({
    frmSrc: 'http://dice.bee.ac'
  }),
})
</script>

<template>
    <div class="bg-gray-50 grid grid-cols-12 w-screen h-full grid-flow-col-dense">
      <div class="col-span-3 bg-yellow-600">
        <SideDrawer />
      </div>
      
      <div class="bg-pink-700 h-full col-span-9">
        <iframe class="relative border-0 h-full w-full overflow-hidden" scrolling="no" frameborder="0" width="100%" :src="frmSrc"></iframe>

      </div>
    </div>
</template>