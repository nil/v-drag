<template>
  <div class="sidebar--group">
    <p
      class="sidebar--heading"
      :class="{ open }"
    >
      <Link v-if="item.link" :item="{
        link: item.link,
        text: item.title
      }" />
      <span v-else>{{ item.title }}!!!</span>
    </p>

    <SidebarLinks class="sidebar-group-items" :items="item.children" />
  </div>
</template>

<script>

import Link from '@theme/components/Link.vue';
import SidebarLinks from '@theme/components/SidebarLinks.vue';

import { isActive } from '../js/utils';

export default {
  components: {
    Link,
    SidebarLinks
  },

  props: {
    item: Object
  },

  data() {
    return {
      open: true
    };
  },

  methods: {
    isActive
  }
};

</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar--heading:not(.clickable)
      cursor auto
      color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar--heading
      font-size 0.95em
      line-height 1.4
      font-weight normal
      padding-left 2rem
      &:not(.clickable)
        opacity 0.5
    & > .sidebar-group-items
      padding-left 1rem
      & > li > .sidebar-link
        font-size: 0.95em;
        border-left none
  &.depth-2
    & > .sidebar--heading
      border-left none

.sidebar--heading
  color $textColor
  transition color .15s ease
  cursor pointer
  font-size 1.1em
  font-weight bold
  // text-transform uppercase
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  width 100%
  box-sizing border-box
  margin 0
  border-left 0.25rem solid transparent
  &.open, &:hover
    color inherit
  .arrow
    position relative
    top -0.12em
    left 0.5em
  &.clickable
    &.active
      font-weight 600
      color $accentColor
      border-left-color $accentColor
    &:hover
      color $accentColor

.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden

.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em

a.sidebar-link
  font-size 1em
  font-weight 400
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  padding 0.35rem 1rem 0.35rem 1.25rem
  line-height 1.4
  width: 100%
  box-sizing: border-box
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor
  .sidebar-group &
    padding-left 2rem
  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none
    &.active
      font-weight 500
</style>
