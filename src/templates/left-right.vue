<script>
import getOptions from './options';

export default getOptions('left-right');
</script>

<template>
  <div class="resume">
    <header>
      <div class="text-center">
        <span class="name">{{ person.name.first }} {{ person.name.last }}</span>
      </div>
      <div v-if="person.position" class="text-center">
        <p class="position text-center">{{ person.position }}</p>
      </div>
      <div class="picture">
        <img v-if="person.picture" :src="'../../data/' + person.picture" alt="" />
      </div>
    </header>
    <main>
      <div class="left-column">
        <section>
          <h3>{{ lang.experience }}</h3>
          <div v-for="(experience, index) in filteredExperience" :key="index" class="block">
            <a v-if="experience.company" class="heading" :href="sanitizeUrl(experience.url)" target="_blank">{{ experience.company }}</a>
            <div v-if="experience.position" class="text-italic">{{ experience.position }}</div>
            <div v-if="experience.timePeriod">{{ experience.timePeriod }}</div>
            <ul v-if="Array.isArray(experience.description)">
              <li v-for="item in experience.description" :key="item">{{ item }}</li>
            </ul>
            <div v-else-if="experience.description">{{ experience.description }}</div>
          </div>
        </section>
        <section>
          <h3>{{ lang.contact }}</h3>
          <div class="block icon-items">
            <div v-if="person.contact.email">
              <i class="fa-solid fa-envelope" aria-hidden="true"></i>
              <a :href="contactLinks.email" target="_blank">{{ person.contact.email }}</a>
            </div>
            <div v-if="person.contact.phone">
              <i class="fa-solid fa-phone" aria-hidden="true"></i>
              <a :href="contactLinks.phone" target="_blank">{{ person.contact.phone }}</a>
            </div>
            <div v-if="person.contact.addressLine1">
              <i class="fa-solid fa-house" aria-hidden="true"></i>
              <div>
                <div v-if="person.contact.addressLine1">{{ person.contact.addressLine1 }}</div>
                <div v-if="person.contact.addressLine2">{{ person.contact.addressLine2 }}</div>
              </div>
            </div>
            <div v-if="websiteText">
              <i class="fa-solid fa-globe" aria-hidden="true"></i>
              <a :href="contactLinks.website" target="_blank">{{ websiteText }}</a>
            </div>
            <div v-if="linkedinText">
              <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
              <a :href="contactLinks.linkedin" target="_blank">{{ linkedinText }}</a>
            </div>
            <div v-if="githubText">
              <i class="fa-brands fa-github" aria-hidden="true"></i>
              <a :href="contactLinks.github" target="_blank">{{ githubText }}</a>
            </div>
          </div>
        </section>
        <section v-if="person.projects">
          <h3>Projects</h3>
          <div v-for="project in person.projects" :key="project.name" class="block">
            <div v-if="project.name" class="heading">{{ project.name }}</div>
            <div v-if="project.platform" class="text-italic">{{ project.platform }}</div>
            <div v-if="project.description">{{ project.description }}</div>
            <a v-if="project.url" :href="sanitizeUrl(project.url)" target="_blank">{{ getUrlText(project.url) }}</a>
          </div>
        </section>
        <section v-if="person.contributions">
          <h3>Contributions</h3>
          <div v-for="contribution in person.contributions" :key="contribution.name" class="block">
            <div v-if="contribution.name" class="heading">{{ contribution.name }}</div>
            <div v-if="contribution.description">{{ contribution.description }}</div>
            <a v-if="contribution.url" :href="sanitizeUrl(contribution.url)" target="_blank">{{ getUrlText(contribution.url) }}</a>
          </div>
        </section>
      </div>
      <div class="right-column">
        <section v-if="person.education">
          <h3>{{ lang.education }}</h3>
          <div v-for="(education, index) in person.education" :key="index" class="block">
            <div v-if="education.degree" class="heading">{{ education.degree }}</div>
            <div v-if="education.school">{{ education.school }}</div>
          </div>
        </section>
        <section v-if="person.skills">
          <h3>{{ lang.skills }}</h3>
          <div class="skills block">
            <div v-for="skill in person.skills" :key="skill.name" class="skill-block">
              <div class="skill">{{ skill.name }}</div>
              <div v-if="skill.level" class="skill-bar">
                <div :style="'width: ' + skill.level + '%'" class="level"></div>
              </div>
            </div>
          </div>
        </section>
        <section v-if="person.about">
          <h3>{{ lang.about }}</h3>
          <div class="block">{{ person.about }}</div>
        </section>
        <section v-if="person.knowledge">
          <div class="block">{{ person.knowledge }}</div>
        </section>
        <section v-if="person.hobbies">
          <h3>{{ lang.hobbies }}</h3>
          <div class="block">
            <div class="icon-items">
              <div v-for="hobby in person.hobbies" :key="hobby.name">
                <i v-if="hobby.iconClass" :class="hobby.iconClass" aria-hidden="true"></i>
                {{ hobby.name }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import 'variables.less';

.resume {
  font-size: 18px;
  font-family: 'Source Sans Pro', sans-serif;

  h3 {
    margin: 0;
  }

  section {
    margin-top: 24px;
  }

  ul {
    margin: 6px 0 12px;
    padding: 0 0 0 24px;

    li {
      padding: 2px 0;
    }
  }

  .name {
    display: inline-block;
    margin-top: 80px;
    margin-bottom: 5px;
    padding: 10px 20px;
    border: 1px solid #000;
    font:
      600 36px 'Open Sans',
      sans-serif;
    letter-spacing: 10px;
    text-transform: uppercase;
  }

  .position {
    margin-bottom: 40px;
    font-size: smaller;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    color: #757575;
  }

  .picture {
    width: 100px;
    height: 100px;
    margin: 40px auto 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  main {
    display: flex;
    gap: 32px;
    padding: 24px;
  }

  .left-column {
    width: 50%;
  }

  .right-column {
    width: 50%;
  }

  .block {
    color: #616161;

    ~ .block {
      margin-top: 16px;
    }
  }

  .heading {
    font-weight: 700;
    padding-bottom: 5px;
    color: #424242;
  }

  .icon-items {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;

    > div {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    i {
      width: 24px;
      text-align: center;
      color: inherit;
    }
  }

  .skills {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 5px;

    .skill-block {
      display: flex;
      gap: 12px;

      .skill {
        width: 125px;
        font-size: 15px;
      }

      .skill-bar {
        flex: 1 1 0;
        height: 8px;
        margin-top: 6.5px;
        border-radius: 3px;
        background: #e0e0e0;

        .level {
          height: 100%;
          border-radius: 3px;
          background: #757575;
        }
      }
    }
  }

  .text-center {
    text-align: center;
  }

  .text-italic {
    font-style: italic;
  }
}
</style>
