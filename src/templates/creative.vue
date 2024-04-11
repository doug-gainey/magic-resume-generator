<script>
import getOptions from './options';

export default getOptions('creative');
</script>

<template>
  <div class="resume">
    <div class="left-column">
      <h1>
        {{ person.name.first }}
        <span class="text-uppercase">{{ person.name.last }}</span>
      </h1>

      <p v-if="person.position" class="position text-white">{{ person.position }}</p>
      <div v-if="person.location" class="location">{{ person.location }}</div>

      <section v-if="person.about">
        {{ person.about }}
      </section>

      <section v-if="person.knowledge">
        {{ person.knowledge }}
      </section>

      <section class="icon-items">
        <div v-if="person.contact.addressLine1" class="icon-item text-white">
          <i class="fa-solid fa-house" aria-hidden="true"></i>
          <div>
            {{ person.contact.addressLine1 }}
            <div v-if="person.contact.addressLine2">{{ person.contact.addressLine2 }}</div>
          </div>
        </div>
        <a v-if="person.contact.email" class="icon-item text-white" :href="contactLinks.email" target="_blank">
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
          {{ person.contact.email }}
        </a>
        <a v-if="person.contact.phone" class="icon-item text-white" :href="contactLinks.phone" target="_blank">
          <i class="fa-solid fa-phone-square" aria-hidden="true"></i>
          {{ person.contact.phone }}
        </a>
        <a v-if="websiteText" class="icon-item text-white" :href="contactLinks.website" target="_blank">
          <i class="fa-solid fa-globe" aria-hidden="true"></i>
          {{ websiteText }}
        </a>
        <a v-if="linkedinText" class="icon-item text-white" :href="contactLinks.linkedin" target="_blank">
          <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
          {{ linkedinText }}
        </a>
        <a v-if="githubText" class="icon-item text-white" :href="contactLinks.github" target="_blank">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
          {{ githubText }}
        </a>
      </section>

      <section v-if="person.hobbies" class="icon-items">
        <h3>{{ lang.hobbies }}</h3>
        <div v-for="hobby in person.hobbies" :key="hobby.name" class="icon-item">
          <i v-if="hobby.iconClass" :class="hobby.iconClass"></i>
          {{ hobby.name }}
        </div>
      </section>
    </div>

    <div class="right-column">
      <section class="experience-section">
        <div class="icon">
          <i class="material-icons md-work"></i>
          <span class="section-headline">{{ lang.experience }}</span>
        </div>

        <div class="section-content">
          <div v-for="(experience, index) in person.experience" :key="index" class="section-content__item">
            <div v-if="experience.position" class="section-content__header">{{ experience.position }}</div>
            <a v-if="experience.company" class="section-content__subheader" :href="sanitizeUrl(experience.url)" target="_blank">{{ experience.company }}</a>
            <div v-if="experience.timePeriod" class="section-content__text">{{ experience.timePeriod }}</div>
            <div v-if="experience.description" class="job-description">
              <ul v-if="Array.isArray(experience.description)">
                <li v-for="item in experience.description" :key="item">
                  <i class="material-icons md-arrow_right"></i>
                  {{ item }}
                </li>
              </ul>
              <div v-else class="section-content__text section-content__text--light">{{ experience.description }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="education-section">
        <div class="icon">
          <i class="material-icons md-school"></i>
          <span class="section-headline">{{ lang.education }}</span>
        </div>

        <div class="section-content">
          <div v-for="(education, index) in person.education" :key="index" class="section-content__item">
            <a v-if="education.school" class="section-content__header" :href="sanitizeUrl(education.url)" target="_blank">{{ education.school }}</a>
            <div v-if="education.degree" class="section-content__subheader">{{ education.degree }}</div>
            <div v-if="education.timePeriod" class="section-content__text">{{ education.timePeriod }}</div>
          </div>
        </div>
      </section>

      <section v-if="sortedSkills" class="skills-section">
        <div class="icon">
          <i class="material-icons md-done_all"></i>
          <span class="section-headline">{{ lang.skills }}</span>
        </div>

        <div class="section-content-grid">
          <span v-for="skill in sortedSkills" :key="skill.name" class="squared-grid-item">{{ skill.name }}</span>
        </div>
      </section>

      <section v-if="person.projects" class="projects-section">
        <div class="icon">
          <i class="material-icons md-code"></i>
          <span class="section-headline">{{ lang.projects }}</span>
        </div>

        <div class="section-content">
          <div v-for="project in person.projects" :key="project.name" class="section-content__item">
            <div v-if="project.name" class="section-content__header">{{ project.name }}</div>
            <div v-if="project.platform" class="section-content__subheader">{{ project.platform }}</div>
            <div v-if="project.description" class="section-content__text">{{ project.description }}</div>
            <a v-if="project.url" class="section-content__text section-content__text--light" :href="sanitizeUrl(project.url)" target="_blank">{{ getUrlText(project.url) }}</a>
          </div>
        </div>
      </section>

      <section v-if="person.contributions" class="contributions-section">
        <div class="icon">
          <i class="fa-solid fa-heart font-awesome-icons"></i>
          <span class="section-headline">{{ lang.contributions }}</span>
        </div>

        <div class="section-content-grid">
          <div v-for="contribution in person.contributions" :key="contribution.name" class="section-content__item-grid">
            <div v-if="contribution.name" class="section-content__header">{{ contribution.name }}</div>
            <div v-if="contribution.description" class="section-content__text">{{ contribution.description }}</div>
            <a v-if="contribution.url" class="section-content__text section-content__text--light" :href="sanitizeUrl(contribution.url)" target="_blank">
              {{ getUrlText(contribution.url) }}
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import 'variables.less';

.resume {
  --template-color: #4e5d79;

  position: relative;
  display: flex;
  align-items: stretch;
  font-size: 0.9em;
  font-family: 'Roboto', sans-serif;

  h1,
  h2,
  h3 {
    margin: 0;
  }

  h1 {
    margin: 0;
    color: #fff;
    font-size: 1.3em;
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;
    padding: 5px 0 10px;
    list-style-type: none;
    font-weight: 300;
    line-height: 18px;

    li {
      display: flex;
    }

    .material-icons {
      font-size: 16px;
      line-height: 18px;
    }
  }

  .left-column {
    width: 35%;
    padding: 48px 24px;
    background-color: var(--template-color);
    color: rgba(255, 255, 255, 0.6);

    section {
      margin-top: 30px;
    }

    p {
      margin-bottom: 0;
    }

    .icon-items {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .icon-item {
        display: flex;
        align-items: center;
        gap: 8px;

        i {
          font-size: 1.3em;
          width: 1.1em;
          text-align: center;
        }
      }
    }
  }

  .right-column {
    display: flex;
    flex-direction: column;
    width: 65%;
    padding: 30px 24px;

    section {
      margin-top: 10px;
    }

    .section-headline {
      color: var(--template-color);
      display: inline-block;
      font-size: 1.2em;
    }

    .section-content {
      margin-top: 10px;
      padding-left: 30px;

      &__item {
        display: block;
        margin-bottom: 10px;

        &-grid {
          flex: 1 1 0;
          margin-bottom: 10px;
          padding-right: 10px;
        }
      }

      &-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 2px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left: 30px;
      }

      &__header,
      &__subheader,
      &__text--light {
        line-height: 1.5em;
      }

      &__header {
        font-weight: 500;
        font-size: 1.1em;
      }

      &__subheader {
        font-weight: 400;
      }

      &__text {
        font-weight: 300;

        &--light {
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .squared-grid-item {
      display: block;
      margin-top: 5px;
      padding: 5px;
      border: 1px solid var(--template-color);
      background-color: var(--template-color);
      color: #fff;
      transition: 0.5s;

      &:hover {
        background-color: transparent;
        color: var(--template-color);
      }
    }

    .icon {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .material-icons {
      color: var(--template-color);
    }

    .font-awesome-icons {
      margin-right: 6px;
      font-size: 1.3em;
      color: var(--template-color);
    }
  }

  .text-white {
    color: #fff;
  }

  .text-uppercase {
    text-transform: uppercase;
  }
}
</style>
