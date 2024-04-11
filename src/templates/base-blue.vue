<script setup>
import BaseTemplate from './base.vue';
</script>

<template>
  <base-template></base-template>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@base-color: #192a53;

.resume {
  --header-footer-background-color: lighten(@base-color, 30%);
  --header-footer-box-shadow-color: @base-color;
  --divider-color: @base-color;
  --accent-text-color: lighten(@base-color, 10%);
}
</style>
