<template>
  <ul class="sidebar--item">
    <li v-for="item in items" :key="item.path">
      <router-link class="sidebar--link"
        :class="`sidebar--level_${level}`"
        :to="item.path">
        {{ item.title }}
      </router-link>

      <ul v-if="$route.path === item.path && item.headers">
        <li v-for="link of item.headers" :key="link.slug">
          <router-link class="sidebar--link"
            :class="`sidebar--level_${level + 1}`"
            :to="`${item.path}#${link.slug}`">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    items: Array,
    level: Number
  }
};

</script>
