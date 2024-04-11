<script setup></script>

<template>
  <main v-cloak>
    <RouterView v-slot="{Component, route}">
      <transition v-bind:name="route.path === '/' ? 'fade' : 'slide-fade'" mode="out-in">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </transition>
    </RouterView>
  </main>
</template>

<style>
/* Icons */
@import '@fortawesome/fontawesome-free/css/all.css';
@import '@material-icons/font/css/all.css';

/* Import fonts here */
@import '@fontsource/open-sans/300.css';
@import '@fontsource/open-sans/400.css';
@import '@fontsource/open-sans/500.css';
@import '@fontsource/open-sans/600.css';
@import '@fontsource/open-sans/700.css';
@import '@fontsource/open-sans-condensed';
@import 'raleway-webfont';
@import 'roboto-fontface';
@import 'source-sans/source-sans-3.css';

.fade-enter-active,
.slide-fade-enter-active {
  transition: all 0.25s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
