<template>
  <main id="content" class="main">
    <DragBox title="Default" />
    <DragBox axis="x" title="Horizontal" />
    <DragBox axis="y" title="Vertical" />
    <DragBox handle title="With handle" />
  </main>
</template>

<script>
  import DragBox from "./DragBox.vue"

  export default {
    name: "app",
    components: {
      DragBox
    }
  }
</script>
