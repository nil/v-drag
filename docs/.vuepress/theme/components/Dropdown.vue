<template>
  <div class="dropdown" :class="{ active: isDropdownActive }">
    <a class="dropdown--title sidebar--link" @click="toggleDropdown">
      {{ item.text }}
    </a>

    <ul class="dropdown--list"
      :style="{ maxHeight: currentHeight }"
      ref="dropdownList">
      <li class="dropdown--item"
        v-for="(subItem, index) in item.items"
        :key="index">
        <Link class="dropdown--link" :item="subItem" />
      </li>
    </ul>
  </div>
</template>

<script>

import Link from '@theme/components/Link.vue';

export default {
  components: {
    Link
  },

  props: {
    item: Object
  },

  data() {
    return {
      isDropdownActive: true,
      dropdownHeight: null
    };
  },

  mounted() {
    this.dropdownHeight = this.$refs.dropdownList.scrollHeight;
    this.isDropdownActive = false;
  },

  computed: {
    currentHeight() {
      return this.isDropdownActive ? `${this.dropdownHeight}px` : '0';
    }
  },

  methods: {
    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive;
    }
  }
};

</script>
