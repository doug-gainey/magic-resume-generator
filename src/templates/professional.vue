<script>
import getOptions from './options';

export default getOptions('base-template');
</script>

<template>
  <div class="resume">
    <header class="resume-header">
      <h1>{{ person.name.first }} {{ person.name.last }}</h1>
      <h2 v-if="person.position">{{ person.position }}</h2>
      <div class="contact-links">
        <a v-if="person.contact.email" :href="contactLinks.email" target="_blank"> <i class="fa-solid fa-envelope" aria-hidden="true"></i> {{ person.contact.email }}</a>
        <a v-if="person.contact.phone" :href="contactLinks.phone" target="_blank"><i class="fa-solid fa-phone-square" aria-hidden="true"></i> {{ person.contact.phone }}</a>
        <a v-if="person.contact.linkedin" :href="contactLinks.linkedin" target="_blank"><i class="fa-brands fa-linkedin" aria-hidden="true"></i> {{ person.contact.linkedin }}</a>
        <a v-if="person.contact.github" :href="contactLinks.github" target="_blank"><i class="fa-brands fa-github" aria-hidden="true"></i> {{ person.contact.github }}</a>
        <a v-if="websiteText" :href="contactLinks.website" target="_blank"><i class="fa-solid fa-globe" aria-hidden="true"></i> {{ websiteText }}</a>
      </div>
    </header>
    <main class="resume-body">
      <section v-if="person.about">
        <h2 class="heading">{{ person.lang === 'en' ? 'Professional Profile' : lang.about }}</h2>
        <div v-if="person.about" class="block">
          {{ person.about }}
        </div>
      </section>
      <section v-if="groupedSkills || person.knowledge">
        <h2 class="heading">{{ person.lang === 'en' ? 'Skills Summary' : lang.skills }}</h2>
        <div class="block">
          <p v-if="person.knowledge" class="skill-description">{{ person.knowledge }}</p>
          <div v-if="person.skills" class="block">
            <ul>
              <li v-for="(value, key) in groupedSkills" :key="key" class="skill">
                <strong>{{ key }}:</strong> <span class="text-primary">{{ value.join(', ') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section v-if="person.experience">
        <h2 class="heading">{{ person.lang === 'en' ? 'Professional Experience' : lang.experience }}</h2>
        <div v-for="(experience, index) in filteredExperience" :key="index" class="block" v-bind:class="{'page-break': experience.breakAfter}">
          <h3 v-if="experience.company">{{ experience.company }}</h3>
          <p v-if="experience.position || experience.timePeriod" class="job-info">
            <span v-if="experience.position" class="title">{{ experience.position }} | </span>
            <span v-if="experience.timePeriod" class="detail">{{ experience.timePeriod }}</span>
          </p>
          <ul v-if="Array.isArray(experience.description)">
            <li v-for="item in experience.description" :key="item">
              <span class="text-primary">{{ item }}</span>
            </li>
          </ul>
          <div v-else-if="experience.description">{{ experience.description }}</div>
        </div>
      </section>
      <section v-if="person.education">
        <h2 class="heading">{{ lang.education }}</h2>
        <div v-for="(education, educationIndex) in person.education" :key="educationIndex" class="block">
          <h3 v-if="education.school">{{ education.school }}</h3>
          <p v-if="education.degree">
            <span class="title">{{ education.degree }}<span v-if="education.timePeriod"> | </span></span>
            <span v-if="education.timePeriod" class="detail">{{ education.timePeriod }}</span>
          </p>
        </div>
      </section>
      <section v-if="person.projects">
        <h2 class="heading">{{ lang.projects }}</h2>
        <div v-for="project in person.projects" :key="project.name" class="block">
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
        <div v-for="contribution in person.contributions" :key="contribution.name" class="block">
          <span v-if="contribution.name" class="title">{{ contribution.name }}</span>
          <p v-if="contribution.description">{{ contribution.description }}</p>
          <p>
            <a v-if="contribution.url" :href="sanitizeUrl(contribution.url)" target="_blank">{{ getUrlText(contribution.url) }}</a>
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import 'variables.less';

.resume {
  --accent-text-color: rgba(0, 0, 0, 0.8);

  font-weight: 400;
  font-size: 10pt;
  font-family: 'Open Sans', sans-serif;
  color: #333;

  h1,
  h2,
  h3 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul {
    margin: 5px 0 0 32px;
    padding: 0;

    li {
      padding: 2px 0;
      color: var(--accent-text-color);
    }
  }

  .resume-header {
    padding: 20px 40px;

    h1 {
      font-size: 20pt;
      color: var(--accent-text-color);
    }

    h2 {
      font-weight: 400;
      font-size: 12pt;
    }

    .contact-links {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      margin-top: 12px;
      font-size: 11pt;
      color: var(--accent-text-color);

      i {
        margin-right: 2px;
      }
    }
  }

  .resume-body {
    padding: 10px 40px 20px;

    h2,
    h3 {
      color: var(--accent-text-color);
    }

    h3 {
      font-size: 14pt;
    }

    section ~ section {
      margin-top: 24px;
    }

    .heading {
      margin: 0 -20px;
      padding: 3px 6px;
      font-size: 12pt;
      text-transform: uppercase;
      background: #d3d3d3;
    }

    .block {
      margin: 10px 0 10px;
    }

    .job-info {
      margin-bottom: 5px;
    }

    .title {
      font-weight: 600;
      font-size: 12pt;
      color: var(--accent-text-color);
    }

    .detail {
      font-size: 11pt;
      color: var(--accent-text-color);
    }

    .text-primary {
      color: initial;
    }

    .text-italic {
      font-style: italic;
    }

    .page-break {
      page-break-after: always;
    }
  }
}
</style>
