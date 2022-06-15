<template>
  <div class="flex-1 h-screen bg-gray-400">
    <h1>
      axis is: {{ $store.state.axis }}
    </h1>

    <Button
      label="hello"
      property="axis"
      value="hello"
    />

    <Button
      label="all"
      property="axis"
      value="all"
    />

    <Button
      label="x"
      property="axis"
      value="x"
    />

    <Button
      label="x"
      property="axis"
      value="y"
    />
  </div>
</template>

<script>
import Button from '../inputs/Button.vue';

export default {
  name: 'HelloWorld',
  components: {
    Button,
  },
};

</script>

<style scoped>
a {
  color: #42b983;
}

button {
  display: block;
  padding: 1em;
  margin: 0.2em auto;
  background: yellow;
}

button.active {
  background: cyan;
}

</style>
