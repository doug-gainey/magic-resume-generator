<script>
import getOptions from './options';

export default getOptions('side-bar');
</script>

<template>
  <div class="resume">
    <div class="top-row">
      <div class="person-name">{{ person.name.first }} {{ person.name.last }}</div>
      <div v-if="person.position" class="person-position">{{ person.position }}</div>
    </div>
    <div class="columns">
      <div class="left-col">
        <img v-if="person.picture" class="picture" :src="'../../data/' + person.picture" alt="" />
        <div class="contact">
          <h3>{{ lang.contact }}</h3>
          <div v-if="person.contact.email" class="contact-row">
            <a :href="contactLinks.email" target="_blank">{{ person.contact.email }}</a>
          </div>
          <div v-if="person.contact.email && person.contact.phone" class="contact-row dots">
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
          </div>
          <div v-if="person.contact.phone" class="contact-row">
            <a :href="contactLinks.phone" target="_blank">{{ person.contact.phone }}</a>
          </div>
          <div v-if="person.contact.addressLine1 || person.contact.addressLine2" class="contact-row dots">
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
          </div>
          <div v-if="person.contact.addressLine1 || person.contact.addressLine2" class="contact-row">
            <div v-if="person.contact.addressLine1">{{ person.contact.addressLine1 }}</div>
            <div v-if="person.contact.addressLine2">{{ person.contact.addressLine2 }}</div>
          </div>
          <div v-if="websiteText" class="contact-row dots">
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
          </div>
          <div v-if="websiteText" class="contact-row">
            <a :href="contactLinks.website" target="_blank">{{ websiteText }}</a>
          </div>
          <div v-if="linkedinText" class="contact-row dots">
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
          </div>
          <div v-if="linkedinText" class="contact-row">
            <a :href="contactLinks.linkedin" target="_blank">{{ linkedinText }}</a>
          </div>
          <div v-if="githubText" class="contact-row dots">
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
            <i class="fa-solid fa-circle" aria-hidden="true"></i>
          </div>
          <div v-if="githubText" class="contact-row">
            <a :href="contactLinks.github" target="_blank">{{ githubText }}</a>
          </div>
        </div>
        <div v-if="person.projects" class="projects-contributions">
          <h3 class="text-center">{{ lang.projects }}</h3>
          <div v-for="project in person.projects" :key="project.name">
            <div class="row">
              <div class="name text-center">{{ project.name }}</div>
              <div v-if="project.platform" class="row text-center text-italic">
                {{ project.platform }}
              </div>
              <div v-if="project.timePeriod" class="row text-center text-muted">
                {{ project.timePeriod }}
              </div>
              <div v-if="project.description" class="row description">
                {{ project.description }}
              </div>
              <a v-if="project.url" :href="sanitizeUrl(project.url)" target="_blank">{{ getUrlText(project.url) }}</a>
            </div>
          </div>
        </div>
        <div v-if="person.contributions" class="projects-contributions">
          <h3 class="text-center">{{ lang.contributions }}</h3>
          <div v-for="contribution in person.contributions" :key="contribution.name">
            <div class="row">
              <div v-if="contribution.name" class="name text-center">{{ contribution.name }}</div>
              <div v-if="contribution.description" class="row description">
                {{ contribution.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-col">
        <section v-if="person.experience" class="experience">
          <h3>{{ lang.experience }}</h3>
          <div v-for="(experience, index) in person.experience" :key="index" class="block">
            <div class="row">
              <span v-if="experience.company" class="company">
                <a :href="sanitizeUrl(experience.url)" target="_blank">{{ experience.company }}</a>
                <span v-if="experience.position"> - </span>
              </span>
              <span v-if="experience.position" class="job-title">{{ experience.position }}</span>
            </div>
            <div v-if="experience.timePeriod" class="row text-muted">{{ experience.timePeriod }}</div>
            <ul v-if="Array.isArray(experience.description)">
              <li v-for="item in experience.description" :key="item">{{ item }}</li>
            </ul>
            <div v-else-if="experience.description" class="row job-description">{{ experience.description }}</div>
          </div>
        </section>
        <section v-if="person.education">
          <h3>{{ lang.education }}</h3>
          <div v-for="(education, index) in person.education" :key="index" class="block">
            <div v-if="education.degree" class="row">
              <span class="degree">{{ education.degree }}</span>
            </div>
            <div v-if="education.school" class="row">
              <a :href="sanitizeUrl(education.url)" target="_blank">{{ education.school }}</a>
            </div>
          </div>
        </section>
        <section v-if="person.skills">
          <h3>{{ lang.skills }}</h3>
          <div class="skills">
            <div v-for="skill in person.skills" :key="skill.name" class="skill">
              {{ skill.name }}
            </div>
          </div>
          <span class="skills-other">{{ person.knowledge }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import 'variables.less';

.resume {
  padding-bottom: 24px;
  font-family: 'Raleway', sans-serif;

  h3 {
    margin-top: 0;
    padding-top: 0;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 5px;
  }

  .top-row {
    padding: 100px 0;
    text-align: center;

    .person-name {
      font-size: 50px;
      letter-spacing: 10px;
      text-transform: uppercase;
    }

    .person-position {
      letter-spacing: 5px;
    }
  }

  .columns {
    display: flex;
  }

  .left-col {
    width: 40%;
    padding: 0 36px;

    .picture {
      display: block;
      width: 250px;
      height: 250px;
      margin: auto;
    }

    .contact {
      h3 {
        margin-top: 20px;
        text-align: center;
      }

      &-row {
        margin-bottom: 3px;
        letter-spacing: 2px;
        text-align: center;

        &.dots {
          margin-top: 20px;
          margin-bottom: 15px;
          font-size: 10px;
          color: rgba(153, 153, 153, 0.6);
        }
      }
    }

    .projects-contributions {
      margin-top: 40px;
      text-align: justify;

      .name {
        text-transform: uppercase;
      }
    }
  }

  .right-col {
    width: 60%;
    padding: 0 24px;

    section {
      ~ section {
        margin-top: 36px;
      }
    }

    .block {
      ~ .block {
        margin-top: 24px;
      }
    }

    .company {
      font-size: 19px;
      text-transform: uppercase;
    }

    .job-title {
      font-size: 19px;
    }

    .degree {
      font-size: 19px;
      text-transform: uppercase;
      margin-bottom: 3px;
    }

    .skills {
      display: flex;
      flex-direction: var(--flex-direction);
      flex-wrap: wrap;
      align-items: center;
      gap: 5px;
      margin-bottom: 20px;
      position: relative;
      margin-left: auto;
      margin-right: auto;
      overflow-wrap: anywhere;

      .skill {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: #333 1px solid;
        font-size: 12px;
        padding: 2px;
      }

      &-other {
        margin-top: 24px;
      }
    }
  }

  .text-center {
    text-align: center;
  }

  .text-italic {
    font-style: italic;
  }

  .text-muted {
    color: #777;
  }
}
</style>
