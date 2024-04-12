<script>
import getOptions from './options';

export default getOptions('cool');
</script>

<template>
  <div class="resume">
    <header class="header">
      <div class="header__fullname">{{ person.name.first }} {{ person.name.last }}</div>
      <div v-if="person.position" class="header__position">{{ person.position }}</div>
      <div v-if="person.location" class="header__location">{{ person.location }}</div>
    </header>

    <main class="content">
      <div class="content__left">
        <section v-if="person.about || person.knowledge" class="section">
          <div class="section-headline">
            {{ lang.about }}
          </div>

          <div v-if="person.about" class="section-content section-content--plain">
            {{ person.about }}
          </div>

          <div v-if="person.knowledge" class="section-content section-content--plain">
            {{ person.knowledge }}
          </div>
        </section>

        <section v-if="sortedSkills" class="section">
          <div class="section-headline">
            {{ lang.skills }}
          </div>

          <div class="section-content-grid">
            <div v-for="skill in sortedSkills" :key="skill.name" class="grid-item">
              <span class="squared-grid-item">{{ skill.name }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-headline">
            {{ lang.contact }}
          </div>

          <div class="section-content section-content--plain">
            <div v-if="address" class="section-link">
              <i class="section-link__icon material-icons md-business"></i>
              <div>
                <div v-if="person.contact.addressLine1">{{ person.contact.addressLine1 }}</div>
                <div v-if="person.contact.addressLine2">{{ person.contact.addressLine2 }}</div>
              </div>
            </div>
            <a v-if="person.contact.email" class="section-link" :href="contactLinks.email" target="_blank"><i class="section-link__icon material-icons md-mail"></i>{{ person.contact.email }}</a>
            <a v-if="person.contact.phone" class="section-link" :href="contactLinks.phone" target="_blank"><i class="section-link__icon material-icons md-phone"></i>{{ person.contact.phone }}</a>
            <a v-if="websiteText" class="section-link" :href="contactLinks.website" target="_blank"><i class="section-link__icon fa-solid fa-globe"></i>{{ websiteText }}</a>
            <a v-if="linkedinText" class="section-link" :href="contactLinks.linkedin" target="_blank"><i class="section-link__icon fa-brands fa-linkedin"></i>{{ linkedinText }}</a>
            <a v-if="githubText" class="section-link" :href="contactLinks.github" target="_blank"><i class="section-link__icon fa-brands fa-github"></i>{{ githubText }}</a>
          </div>
        </section>

        <section v-if="person.hobbies" class="section">
          <div class="section-headline">{{ lang.hobbies }}</div>
          <div class="section-content section-content--plain">
            <div v-for="hobby in person.hobbies" :key="hobby.name" class="section-link"><i class="section-link__icon" :class="hobby.iconClass"></i>{{ hobby.name }}</div>
          </div>
        </section>
      </div>

      <div class="content__right">
        <section v-if="person.experience" class="section">
          <div class="section-headline"><i class="section-headline__icon material-icons md-work"></i>{{ lang.experience }}</div>

          <div class="section-content">
            <div v-for="(experience, index) in person.experience" :key="index" class="section-content__item">
              <span v-if="experience.position" class="section-content__header">{{ experience.position }}</span>
              <a v-if="experience.company" class="section-content__subheader" :href="sanitizeUrl(experience.url)" target="_blank">{{ experience.company }}</a>
              <div v-if="experience.timePeriod" class="section-content__text">{{ experience.timePeriod }}</div>
              <ul v-if="Array.isArray(experience.description)" class="section-content__text--light">
                <li v-for="item in experience.description" :key="item">
                  <span class="text-black">{{ item }}</span>
                </li>
              </ul>
              <div v-else-if="experience.description" class="section-content__text--light">{{ experience.description }}</div>
            </div>
          </div>
        </section>

        <section v-if="person.education" class="section">
          <div class="section-headline"><i class="section-headline__icon material-icons md-school"></i>{{ lang.education }}</div>

          <div class="section-content">
            <div v-for="(education, index) in person.education" :key="index" class="section-content__item">
              <span v-if="education.degree" class="section-content__header">{{ education.degree }}</span>
              <a v-if="education.school" class="section-content__subheader" :href="sanitizeUrl(education.url)" target="_blank">{{ education.school }}</a>
              <span v-if="education.timePeriod" class="section-content__text">{{ education.timePeriod }}</span>
            </div>
          </div>
        </section>

        <section v-if="person.projects" class="section">
          <div class="section-headline"><i class="section-headline__icon material-icons md-code"></i>{{ lang.projects }}</div>

          <div class="section-content">
            <div v-for="project in person.projects" :key="project.name" class="section-content__item-grid">
              <span v-if="project.name" class="section-content__header">{{ project.name }}</span>
              <span v-if="project.platform" class="section-content__subheader">{{ project.platform }}</span>
              <span v-if="project.description" class="section-content__text">{{ project.description }}</span>
              <a v-if="project.url" class="section-content__text--light" :href="sanitizeUrl(project.url)" target="_blank">{{ getUrlText(project.url) }}</a>
            </div>
          </div>
        </section>

        <section v-if="person.contributions" class="section">
          <div class="section-headline"><i class="section-headline__icon fa-solid fa-heart"></i>{{ lang.contributions }}</div>

          <div class="section-content">
            <div v-for="contribution in person.contributions" :key="contribution.name" class="section-content__item-grid">
              <span v-if="contribution.name" class="section-content__header">{{ contribution.name }}</span>
              <span v-if="contribution.description" class="section-content__text">{{ contribution.description }}</span>
              <a v-if="contribution.url" class="section-content__text--light" :href="sanitizeUrl(contribution.url)" target="_blank">{{ getUrlText(contribution.url) }}</a>
            </div>
          </div>
        </section>
      </div>
    </main>

    <img v-if="person.picture" class="picture" :src="hasProtocol(person.picture) ? person.picture : '../../assets/pictures/' + person.picture" alt="" />
  </div>
</template>

<style lang="less" scoped>
@import 'variables.less';

@accent-color: #34495e;
@header-color: #42b883;
@header-height: 180px;
@picture-size: 120px;
@picture-offset: 80px;
@base-padding: 30px;
@left-column-width: 300px;

.resume {
  --justify-header: start;
  --justify-left-column: start;
  --justify-right-column: start;
  --flex-direction: row;

  position: relative;
  font-size: 0.9em;
  font-family: 'Roboto', sans-serif;

  section {
    ~ section {
      margin-top: 32px;
    }
  }

  ul {
    margin: 6px 0 12px;
    padding: 0 0 0 24px;

    li {
      padding: 2px 0;
    }
  }

  .header {
    height: @header-height;
    padding: @base-padding;
    text-align: var(--justify-header);
    background-color: @header-color;
    color: #fff;

    &__fullname {
      font-size: 32px;
    }

    &__position {
      font-size: 16px;
    }

    &__location {
      font-size: 12px;
    }
  }

  .content {
    display: flex;
    flex-direction: var(--flex-direction);

    &__left,
    &__right {
      min-height: calc(@page-height - @header-height);
      padding: @base-padding;

      .section-link,
      .section-headline,
      .section-content {
        justify-content: var(--justify-left-column);
        text-align: var(--justify-left-column);
      }
    }

    &__left {
      width: @left-column-width;
      overflow-wrap: anywhere;
      background-color: @accent-color;
      color: rgba(255, 255, 255, 0.59);

      .section-headline {
        color: #fff;
      }
    }

    &__right {
      flex: 1;

      .section-link,
      .section-headline,
      .section-content {
        justify-content: var(--justify-right-column);
        text-align: var(--justify-right-column);
      }
    }
  }

  .picture {
    position: absolute;
    top: @header-height - @picture-offset;
    left: @left-column-width - @picture-size / 2;
    z-index: 2;
    width: @picture-size;
    height: @picture-size;
    border: 5px solid @accent-color;
    border-radius: 50%;
  }

  .section-link,
  .section-headline {
    display: flex;
    align-items: center;
    margin: 8px 0;
    font-size: 1.2em;
    color: @accent-color;

    &__icon {
      font-size: 1.4em;
      width: 1.3em;
    }
  }

  .section-link {
    gap: 6px;
    font-size: 1.1em;
    color: rgba(255, 255, 255, 0.59);

    &__icon {
      color: #fff;
    }
  }

  .section-content {
    margin-top: 5px;
    padding-left: 32px;
    font-size: 14px;

    &__item {
      display: block;
      margin-top: 5px;
    }

    &__header {
      display: block;
      font-weight: 500;
      font-size: 1.1em;
    }

    &__subheader {
      display: block;
      font-weight: 400;
    }

    &__plain,
    &__text {
      display: block;
      font-size: 12px;

      &--light {
        font-size: 12px;
      }
    }

    &__item-grid {
      display: flex;
      flex-direction: column;
      flex: 1 1 0;
      margin-bottom: 10px;
      padding-right: 5px;
    }

    &--plain {
      padding: 0;
    }
  }

  .section-content-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: var(--justify-left-column);
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .grid-item {
    padding-right: 5px;
  }

  .squared-grid-item {
    display: block;
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #fff;
    color: #fff;
  }
}
</style>
