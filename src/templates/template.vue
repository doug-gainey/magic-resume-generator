<script>
import getOptions from './options';

export default getOptions('template-name');
</script>

<template>
  <div class="resume">
    <h1>{{ person.name.first }} {{ person.name.last }}</h1>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.resume {
}
</style>
