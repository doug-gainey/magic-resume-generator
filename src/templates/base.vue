<script>
import getOptions from './options';

export default getOptions('base-template');
</script>

<template>
  <div class="resume">
    <header class="resume-header">
      <h2 v-if="person.position">{{ person.position }}</h2>
      <h1>{{ person.name.first }} {{ person.name.last }}</h1>
      <div class="contact-links">
        <a v-if="person.contact.email" :href="contactLinks.email" target="_blank"> <i class="fa-solid fa-envelope" aria-hidden="true"></i> {{ person.contact.email }}</a>
        <a v-if="person.contact.phone" :href="contactLinks.phone" target="_blank"><i class="fa-solid fa-phone-square" aria-hidden="true"></i> {{ person.contact.phone }}</a>
        <a v-if="person.contact.linkedin" :href="contactLinks.linkedin" target="_blank"><i class="fa-brands fa-linkedin" aria-hidden="true"></i> {{ person.contact.linkedin }}</a>
        <a v-if="person.contact.github" :href="contactLinks.github" target="_blank"><i class="fa-brands fa-github" aria-hidden="true"></i> {{ person.contact.github }}</a>
        <a v-if="websiteText" :href="contactLinks.website" target="_blank"><i class="fa-solid fa-globe" aria-hidden="true"></i> {{ websiteText }}</a>
      </div>
    </header>
    <main class="resume-body">
      <section v-if="person.experience">
        <h2 class="heading">{{ lang.experience }}</h2>
        <div class="divider"></div>
        <div v-for="(experience, index) in filteredExperience" :key="index" class="indent">
          <h3 v-if="experience.company">{{ experience.company }}</h3>
          <p v-if="experience.position || experience.timePeriod" class="job-info">
            <span v-if="experience.position" class="title">{{ experience.position }} | </span>
            <span v-if="experience.timePeriod" class="detail">{{ experience.timePeriod }}</span>
          </p>
          <ul v-if="Array.isArray(experience.description)">
            <li v-for="item in experience.description" :key="item">
              <i class="material-icons md-chevron_right"></i>
              <span class="text-primary">{{ item }}</span>
            </li>
          </ul>
          <div v-else-if="experience.description">{{ experience.description }}</div>
        </div>
      </section>
      <section v-if="person.education">
        <h2 class="heading">{{ lang.education }}</h2>
        <div class="divider"></div>
        <div v-for="(education, educationIndex) in person.education" :key="educationIndex" class="indent">
          <h3 v-if="education.school">{{ education.school }}</h3>
          <p v-if="education.degree">
            <span class="title">{{ education.degree }}<span v-if="education.timePeriod"> | </span></span>
            <span v-if="education.timePeriod" class="detail">{{ education.timePeriod }}</span>
          </p>
        </div>
      </section>
      <section v-if="person.skills || person.knowledge">
        <h2 class="heading">{{ lang.skills }}</h2>
        <div class="divider"></div>
        <p v-if="person.knowledge" class="skill-description">{{ person.knowledge }}</p>
        <div v-if="person.skills" class="indent">
          <ul class="skill-list">
            <li v-for="skill in person.skills" :key="skill.name" class="skill">
              <span class="text-primary">{{ skill.name }}</span>
            </li>
          </ul>
        </div>
      </section>
      <section v-if="person.projects">
        <h2 class="heading">{{ lang.projects }}</h2>
        <div class="divider"></div>
        <div v-for="project in person.projects" :key="project.name" class="indent">
          <span v-if="project.name" class="title"
            >{{ project.name }}
            <span v-if="project.platform">
              | <span class="detail">{{ project.platform }}</span></span
            ></span
          >
          <p v-if="project.description">{{ project.description }}</p>
          <p>
            <a v-if="project.url" :href="sanitizeUrl(project.url)" target="_blank">{{ getUrlText(project.url) }}</a>
          </p>
        </div>
      </section>
      <section v-if="person.contributions">
        <h2 class="heading">{{ lang.contributions }}</h2>
        <div class="divider"></div>
        <div v-for="contribution in person.contributions" :key="contribution.name" class="indent">
          <span v-if="contribution.name" class="title">{{ contribution.name }}</span>
          <p v-if="contribution.description">{{ contribution.description }}</p>
          <p>
            <a v-if="contribution.url" :href="sanitizeUrl(contribution.url)" target="_blank">{{ getUrlText(contribution.url) }}</a>
          </p>
        </div>
      </section>
    </main>
    <!-- This invisible placeholder provides the padding needed to keep the absolutely positioned footer from overlapping the resume content. -->
    <div class="resume-footer resume-footer--placeholder">
      <div v-if="person.about">
        <h2>{{ lang.about }}</h2>
        <p>{{ person.about }}</p>
        <p v-if="person.hobbies" class="hobbies">
          <strong class="heading">{{ lang.hobbies }}: </strong>
          {{ person.hobbies.map(hobby => hobby.name).join(', ') }}
        </p>
      </div>
    </div>
    <footer class="resume-footer">
      <div v-if="person.about">
        <h2>{{ lang.about }}</h2>
        <p>{{ person.about }}</p>
        <p v-if="person.hobbies" class="hobbies">
          <strong class="heading">{{ lang.hobbies }}: </strong>
          {{ person.hobbies.map(hobby => hobby.name).join(', ') }}
        </p>
      </div>
    </footer>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import 'variables.less';

@base-color: #000;
@template-color: lighten(@base-color, 30%);
@text-color: lighten(@base-color, 10%);

.resume {
  --header-footer-background-color: @template-color;
  --header-footer-box-shadow-color: @base-color;
  --divider-color: @base-color;
  --accent-text-color: @text-color;
  --content-padding: 40px 100px;
  --header-text-color: #fff;
  --footer-display: block;
  --indent-margin: 32px;

  font-weight: 300;
  font-size: 15px;
  font-family: 'Open Sans', sans-serif;

  h1,
  h2,
  h3 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul {
    margin: 5px 0 0 12px;
    padding: 0;
    list-style-type: none;

    li {
      display: flex;
      gap: 12px;
      padding: 4px 0;
      color: var(--accent-text-color);
    }

    .material-icons {
      font-size: 18px;
    }
  }

  .resume-header {
    padding: var(--content-padding);
    box-shadow: inset 0 0 200px var(--header-footer-box-shadow-color);
    background-color: var(--header-footer-background-color);
    color: var(--header-text-color);

    h1 {
      font-size: 56px;
      line-height: 56px;
      text-transform: uppercase;
    }

    h2 {
      font-size: 22px;
    }

    .contact-links {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      margin-top: 20px;
      font-weight: 400;
      font-size: 14px;

      i {
        margin-right: 2px;
      }
    }
  }

  .resume-body {
    padding: var(--content-padding);

    h2,
    h3 {
      color: var(--accent-text-color);
    }

    h3 {
      font-size: 18px;
    }

    section ~ section {
      margin-top: 24px;
    }

    .heading {
      font-size: 24px;
      text-transform: uppercase;
    }

    .divider {
      margin: 5px 0 10px;
      border-bottom: 1px solid var(--divider-color);
    }

    .indent {
      margin: 10px 0 10px var(--indent-margin);
    }

    .job-info {
      margin-bottom: 5px;
    }

    .title {
      font-weight: 600;
      font-size: 16px;
      color: var(--accent-text-color);
    }

    .detail {
      font-weight: 300;
      font-size: 16px;
      color: var(--accent-text-color);
    }

    .skill-list {
      margin-left: 32px;
      list-style-type: disc;
      column-count: 3;
      font-weight: 400;
      font-size: 12px;

      li {
        display: list-item;
        padding: 2px 0;
      }
    }

    .text-primary {
      color: initial;
    }

    .text-italic {
      font-style: italic;
    }
  }

  .resume-footer {
    position: absolute;
    bottom: 0;
    display: var(--footer-display);
    width: @page-width;
    padding: 20px 100px;
    box-shadow: inset 0 0 100px var(--header-footer-box-shadow-color);
    background-color: var(--header-footer-background-color);
    color: #fff;

    &--placeholder {
      position: static;
      visibility: hidden;
    }

    .hobbies {
      margin-top: 5px;
    }
  }
}
</style>
