<template>
    <div class="h-full w-full bg-purple-900 ">
       <h2>Overlay Settings</h2>
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