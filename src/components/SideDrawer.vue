<template>
  <!-- Sidebar -->
  <div class="fixed inset-0 flex z-40">
    <!-- Fixed and Flex frame for Sidebar and Dimmer  -->

    <!-- Absolute Frame for Sidebar Content and Drawer    -->
    <div class="absolute flex top-0 h-screen">
      <!--Drawer -->
      <button
        @click="toggle()"
        class="w-12 h-48 p-1 my-auto rounded text-white bg-gray-600 text-center"
      >
        <span class="font-bold">Drawer</span>
      </button>

      <!-- Sidebar Content -->
      <div
        class="bg-yellow-200 overflow-hidden flex items-center justify-center"
      >
        <div class="w-48 text-center font-bold text-xl">Sidebar</div>
      </div>
    </div>

    <!-- Fluid Dimmer background filling empty space -->
    <div class="flex-1 bg-gray-400 bg-opacity-75" />
  </div>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>