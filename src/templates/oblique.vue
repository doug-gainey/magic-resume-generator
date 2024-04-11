<script>
import getOptions from './options';

export default getOptions('oblique');
</script>

<template>
  <div class="resume">
    <div class="triangle"></div>
    <header class="resume-header">
      <div>
        <div class="name">{{ person.name.first }} {{ person.name.last }}</div>
        <div v-if="person.position">{{ person.position }}</div>
        <div v-if="person.location">{{ person.location }}</div>
      </div>
      <img v-if="person.picture" class="picture" :src="'../../data/' + person.picture" alt="" />
    </header>
    <main>
      <section v-if="person.about" class="about">{{ person.about }}</section>
      <section v-if="person.experience">
        <h3>{{ lang.experience }}</h3>

        <div v-for="(experience, index) in filteredExperience" :key="index" class="block">
          <div class="icon-item">
            <span class="text-uppercase">{{ experience.position }}</span>
            <span v-if="experience.company" class="text-bold">
              <i class="fa-solid fa-caret-down"></i>
              <span class="text-uppercase">{{ experience.company }}</span>
            </span>
          </div>

          <div v-if="experience.description">
            <div>
              <div v-if="Array.isArray(experience.description)">
                <span class="text-italic">{{ experience.timePeriod }}</span>
                <ul>
                  <li v-for="item in experience.description" :key="item">
                    <i class="material-icons md-keyboard_arrow_right"></i>
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div v-else>
                <span>{{ experience.timePeriod }}</span>
                <span
                  >, <span class="text-italic">{{ experience.description }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-if="person.projects">
        <h3>{{ lang.projects }}</h3>
        <div v-for="project in person.projects" :key="project.name" class="block">
          <div class="text-uppercase">{{ project.name }}</div>
          <div v-if="project.platform" class="text-italic">{{ project.platform }}</div>
          <div v-if="project.description">
            <span v-if="project.timePeriod" class="text-italic">{{ project.timePeriod }}, </span>
            {{ project.description }}
          </div>
          <a v-if="project.url" :href="sanitizeUrl(project.url)" target="_blank">{{ getUrlText(project.url) }}</a>
        </div>
      </section>
      <section v-if="person.contributions">
        <h3>{{ lang.contributions }}</h3>
        <div v-for="contribution in person.contributions" :key="contribution.name" class="block">
          <div v-if="contribution.name" class="text-uppercase">{{ contribution.name }}</div>
          <div v-if="contribution.description">{{ contribution.description }}</div>
          <a v-if="contribution.url" :href="sanitizeUrl(contribution.url)" target="_blank">{{ getUrlText(contribution.url) }}</a>
        </div>
      </section>
      <section v-if="person.education">
        <h3>{{ lang.education }}</h3>
        <div v-for="(education, index) in person.education" :key="index" class="block">
          <div v-if="education.degree" class="text-uppercase">{{ education.degree }}</div>
          <div v-if="education.school">{{ education.school }}</div>
        </div>
      </section>
      <section v-if="person.skills">
        <h3>{{ lang.skills }}</h3>
        <ul class="columns">
          <li v-for="skill in person.skills" :key="skill.name">
            <i class="material-icons md-keyboard_arrow_right"></i>
            <span class="skill">{{ skill.name }}</span>
          </li>
        </ul>
      </section>
      <section v-if="person.knowledge">{{ person.knowledge }}</section>
      <section v-if="person.hobbies">
        <h3>{{ lang.hobbies }}</h3>
        <div class="hobby-links">
          <span v-for="hobby in person.hobbies" :key="hobby.name" class="icon-item">
            <i v-if="hobby.iconClass" :class="hobby.iconClass"></i>
            {{ hobby.name }}
          </span>
        </div>
      </section>
      <section>
        <h3>{{ lang.contact }}</h3>
        <div class="contact-links">
          <div v-if="person.contact.email" class="icon-item">
            <i class="fa-solid fa-envelope"></i>
            <a :href="contactLinks.email" target="_blank">{{ person.contact.email }}</a>
          </div>
          <div v-if="person.contact.phone" class="icon-item">
            <i class="fa-solid fa-phone"></i>
            <a :href="contactLinks.phone" target="_blank">{{ person.contact.phone }}</a>
          </div>
          <div v-if="address" class="icon-item">
            <i class="fa-solid fa-house"></i>
            {{ address }}
          </div>
          <div v-if="linkedinText" class="icon-item">
            <i class="fa-brands fa-linkedin"></i>
            <a :href="contactLinks.linkedin" target="_blank">{{ linkedinText }}</a>
          </div>
          <div v-if="githubText" class="icon-item">
            <i class="fa-brands fa-github"></i>
            <a :href="contactLinks.github" target="_blank">{{ githubText }}</a>
          </div>
          <div v-if="websiteText" class="icon-item">
            <i class="fa-solid fa-globe"></i>
            <a :href="contactLinks.website" target="_blank">{{ websiteText }}</a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import 'variables.less';

.resume {
  --template-color: #3d3e3b;

  font-size: 20px;
  font-family: 'Open Sans Condensed', sans-serif;

  h3 {
    margin: 0;
    padding-bottom: 5px;
    font-weight: 700;
    font-size: 22px;
    text-transform: uppercase;
    color: var(--template-color);
  }

  ul {
    margin: 0;
    padding: 5px 0 0 20px;
    list-style-type: none;
    font-weight: 300;
    line-height: 18px;

    li {
      display: flex;
      gap: 6px;
      padding: 2px 0;

      ~ li {
        margin-top: 10px;
      }
    }

    .material-icons {
      font-size: 16px;
      line-height: 18px;
    }

    &.columns {
      columns: 2;
    }
  }

  section {
    ~ section {
      margin-top: 24px;
    }
  }

  .block {
    ~ .block {
      margin-top: 16px;
    }
  }

  .triangle {
    position: absolute;
    top: -100px;
    left: -300px;
    border-style: solid;
    border-width: 600px 0 0 1500px;
    border-color: var(--template-color) transparent transparent transparent;
    pointer-events: none;
  }

  header {
    position: relative;
    display: flex;
    gap: 24px;
    justify-content: end;
    padding-right: 10%;
    padding-top: 50px;
    text-align: right;
    color: #fff;

    .name {
      font-weight: 700;
      font-size: 50px;
      line-height: 1;
      text-transform: uppercase;
    }

    .picture {
      width: 100px;
      height: 100px;
    }
  }

  main {
    padding: 75px 10% 24px;

    .about {
      font-weight: 300;
      width: 385px;
    }

    .hobby-links,
    .contact-links {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      row-gap: 12px;
    }
  }

  .icon-item,
  .icon-item > * {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .icon-item {
    i {
      color: #555;
    }

    .text-bold {
      color: #555;
    }
  }

  .text-bold {
    font-weight: 700;
  }

  .text-uppercase {
    text-transform: uppercase;
  }

  .text-italic {
    font-style: italic;
  }
}
</style>
