<script setup>
import Base from '../templates/base.vue';
import BaseBlue from '../templates/base-blue.vue';
import BaseGreen from '../templates/base-green.vue';
import BasePurple from '../templates/base-purple.vue';
import BaseWhite from '../templates/base-white.vue';
import Cool from '../templates/cool.vue';
import CoolRtl from '../templates/cool-rtl.vue';
import CoolReverse from '../templates/cool-reverse.vue';
import Creative from '../templates/creative.vue';
import CreativeCrimson from '../templates/creative-crimson.vue';
import CreativePurple from '../templates/creative-purple.vue';
import CreativeTeal from '../templates/creative-teal.vue';
import LeftRight from '../templates/left-right.vue';
import MaterialDark from '../templates/material-dark.vue';
import MaterialDarkReverse from '../templates/material-dark-reverse.vue';
import Oblique from '../templates/oblique.vue';
import ObliqueOrange from '../templates/oblique-orange.vue';
import ObliqueRed from '../templates/oblique-red.vue';
import ObliqueTeal from '../templates/oblique-teal.vue';
import Professional from '../templates/professional.vue';
import SideBar from '../templates/side-bar.vue';

const defaultTemplate = import.meta.env.VITE_DEFAULT_TEMPLATE || 'base';
const components = {
  base: Base,
  'base-blue': BaseBlue,
  'base-green': BaseGreen,
  'base-purple': BasePurple,
  'base-white': BaseWhite,
  cool: Cool,
  'cool-rtl': CoolRtl,
  'cool-reverse': CoolReverse,
  creative: Creative,
  'creative-crimson': CreativeCrimson,
  'creative-purple': CreativePurple,
  'creative-teal': CreativeTeal,
  'left-right': LeftRight,
  'material-dark': MaterialDark,
  'material-dark-reverse': MaterialDarkReverse,
  oblique: Oblique,
  'oblique-orange': ObliqueOrange,
  'oblique-red': ObliqueRed,
  'oblique-teal': ObliqueTeal,
  professional: Professional,
  'side-bar': SideBar
};
</script>

<template>
  <div class="page-wrapper">
    <div class="page">
      <div v-if="$route.params.resumeId" class="toolbar">
        <router-link to="/">
          <i class="fa-solid fa-arrow-left"></i>
        </router-link>
        <a :href="'/assets/pdf/resume-' + $route.params.resumeId + '.pdf'" :download="'resume-' + $route.params.resumeId + '.pdf'">
          <i class="fa-solid fa-file-pdf"></i>
        </a>
      </div>
      <div class="page-inner">
        <component :is="components[$route.params.resumeId || defaultTemplate]"></component>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../templates/variables.less';

.page-inner {
  width: 100%;
  min-height: @page-height;
}

.page-wrapper {
  overflow-x: hidden;
  background: #cccccc;
  margin: 0;
  padding: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.resume {
  width: @page-width;
  min-height: @page-height;
}

.page {
  background: #fff;
  position: relative;
  width: 210mm;
  min-height: @page-height;
  display: block;
  page-break-after: auto;
  overflow: hidden;
}

.toolbar {
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  padding: 32px 0;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  font-size: 3rem;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 1px 1px 2px #333;
  text-align: center;
  opacity: 0;
  transition: opacity 0.25s ease;
  border-bottom: 12px solid #333;

  &:hover {
    opacity: 1;
  }

  .fa {
    font-size: 48px;
  }

  a {
    color: inherit;
  }
}
</style>
