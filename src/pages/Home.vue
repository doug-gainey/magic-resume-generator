<script>
export default {
  data() {
    return {
      templates: ['base', 'base-blue', 'base-green', 'base-purple', 'base-white', 'cool', 'cool-rtl', 'cool-reverse', 'creative', 'creative-crimson', 'creative-purple', 'creative-teal', 'left-right', 'material-dark', 'material-dark-reverse', 'oblique', 'oblique-orange', 'oblique-red', 'oblique-teal', 'professional', 'side-bar']
    };
  }
};
</script>

<template>
  <div class="home">
    <h3 class="title">
      <i class="fa-solid fa-wand-magic-sparkles"></i>
      Magic Resume Generator
      <small class="subtitle">
        <i class="fa-solid fa-code-fork"></i>
        <a href="https://github.com/gainedm/magic-resume-generator/fork" target="_blank">Fork Magic Resume Generator on Github</a>
      </small>
    </h3>
    <div class="previews">
      <div v-for="template in templates" :key="template" class="preview">
        <router-link :to="'/resume/' + template">
          <div class="preview-wrapper">
            <img :src="'/assets/previews/resume-' + template + '.png'" alt="" />
            <span>{{ template }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <footer>
      <p class="text-center">Copyright &copy; {{ new Date().getFullYear() }}, <a href="https://github.com/gainedm" target="_blank">gainedm</a>.</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
  font-family: 'Roboto', sans-serif;
}

.logo img {
  height: 50px;
  margin-top: 40px;
}

.title {
  position: relative;
  margin: 0;
  padding: 80px 0;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  font-size: 3rem;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 1px 1px 2px #333;
  text-align: center;
}

.subtitle {
  position: absolute;
  bottom: 12px;
  right: 24px;
  display: flex;
  gap: 5px;
  justify-content: center;
  font-size: 1rem;
  align-items: center;

  a {
    color: inherit;
    text-decoration: none;
  }
}

.previews {
  max-width: 70%;
  margin: 60px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 36px;
  row-gap: 36px;
}

.preview {
  width: 180px;
  height: 252px;
  overflow: hidden;
}

.preview-wrapper {
  position: relative;
  background: #fff;
}

.preview img {
  width: 100%;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}

.preview span {
  position: absolute;
  max-width: 100%;
  font-size: 24px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.75);
  width: 100%;
  text-align: center;
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
}

footer {
  width: 90%;
  margin: auto;
  border-top: 1px solid #aaa;
  color: #aaa;

  a {
    color: inherit;
  }
}

.text-center {
  text-align: center;
}
</style>
