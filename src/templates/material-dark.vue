<script>
import getOptions from './options';

export default getOptions('material-dark');
</script>

<template>
  <div class="resume">
    <div class="left-column">
      <img v-if="person.picture" class="picture" :src="'../../data/' + person.picture" alt="" />

      <div class="section-headline">{{ lang.contact }}</div>
      <div v-if="address" class="item">
        <div class="icon">
          <i class="material-icons md-location_city"></i>
        </div>
        <div class="text">
          <div v-if="person.contact.addressLine1">{{ person.contact.addressLine1 }}</div>
          <div v-if="person.contact.addressLine2">{{ person.contact.addressLine2 }}</div>
        </div>
      </div>

      <a v-if="person.contact.phone" :href="contactLinks.phone" target="_blank">
        <div class="item">
          <div class="icon">
            <i class="material-icons md-phone"></i>
          </div>
          <div class="text">
            {{ person.contact.phone }}
          </div>
        </div>
      </a>

      <a v-if="person.contact.email" :href="contactLinks.email" target="_blank">
        <div class="item">
          <div class="icon">
            <i class="material-icons md-email"></i>
          </div>
          <div class="text">
            {{ person.contact.email }}
          </div>
        </div>
      </a>

      <a v-if="websiteText" :href="contactLinks.website" target="_blank">
        <div class="item">
          <div class="icon">
            <i class="material-icons md-language"></i>
          </div>
          <div class="text">
            <span>{{ websiteText }}</span>
          </div>
        </div>
      </a>

      <a v-if="linkedinText" :href="contactLinks.linkedin" target="_blank">
        <div class="item">
          <div class="icon">
            <i class="fa-brands fa-linkedin"></i>
          </div>
          <div class="text">
            {{ linkedinText }}
          </div>
        </div>
      </a>

      <a v-if="githubText" :href="contactLinks.github" target="_blank">
        <div class="item">
          <div class="icon">
            <i class="fa-brands fa-github"></i>
          </div>
          <div class="text">
            {{ githubText }}
          </div>
        </div>
      </a>

      <div v-if="person.skills" class="section-headline">{{ lang.skills }}</div>
      <div v-if="person.skills" class="item skill-item">
        <div v-for="skill in person.skills" :key="skill.name" class="skill">
          <span>{{ skill.name }}&nbsp;</span>
          <div class="progress">
            <div class="determinate" :style="'width: ' + skill.level + '%;'">
              <i class="fa-solid fa-circle"></i>
            </div>
          </div>
        </div>
      </div>

      <div v-if="person.hobbies" class="section-headline">{{ lang.hobbies }}</div>
      <div v-for="hobby in person.hobbies" :key="hobby.name">
        <div class="item">
          <div v-if="hobby.iconClass" class="icon">
            <i :class="hobby.iconClass"></i>
          </div>
          <div class="text">{{ hobby.name }}</div>
        </div>
      </div>

      <div v-if="person.knowledge" class="item">
        <div class="skill">{{ person.knowledge }}</div>
      </div>
    </div>

    <div class="right-column">
      <div class="title">
        <h2>{{ person.name.first }} {{ person.name.last }}</h2>
        <div v-if="person.position" class="position">{{ person.position }}</div>
        <div v-if="person.about" class="about">{{ person.about }}</div>
      </div>

      <div v-if="person.experience" class="section-headline experience">{{ lang.experience }}</div>
      <div v-if="person.experience" v-for="(experience, index) in person.experience" :key="index" class="block">
        <h3 class="headline">
          {{ experience.position
          }}<span v-if="experience.company">
            - <a :href="sanitizeUrl(experience.url)" target="_blank">{{ experience.company }}</a></span
          >
        </h3>
        <div v-if="experience.timePeriod" class="sub-headline">{{ experience.timePeriod }}</div>
        <ul v-if="Array.isArray(experience.description)" class="info">
          <li v-for="item in experience.description" :key="item">
            {{ item }}
          </li>
        </ul>
        <div v-else-if="experience.description" class="info">{{ experience.description }}</div>
      </div>

      <div v-if="person.education" class="section-headline">{{ lang.education }}</div>
      <div v-if="person.education" v-for="(education, index) in person.education" :key="index" class="block">
        <div v-if="education.degree" class="headline">{{ education.degree }}</div>
        <p class="info">
          {{ education.timePeriod
          }}<span v-if="education.school"
            >, <a :href="sanitizeUrl(education.url)" target="_blank">{{ education.school }}</a></span
          >
        </p>
      </div>

      <div v-if="person.projects" class="section-headline">{{ lang.projects }}</div>
      <div v-if="person.projects" v-for="project in person.projects" :key="project.name" class="block">
        <div class="headline">{{ project.name }}</div>
        <div class="sub-headline">{{ project.timePeriod }}</div>
        <p class="info">{{ project.description }}</p>
        <a class="info" :href="sanitizeUrl(project.url)" target="_blank">{{ getUrlText(project.url) }}</a>
      </div>

      <div v-if="person.contributions" class="section-headline">{{ lang.contributions }}</div>
      <div v-if="person.contributions" v-for="contribution in person.contributions" :key="contribution.name" class="block">
        <div class="headline">{{ contribution.name }}</div>
        <p class="info">{{ contribution.description }}</p>
        <a class="info" :href="sanitizeUrl(contribution.url)" target="_blank">{{ getUrlText(contribution.url) }}</a>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import 'variables.less';

.resume {
  --flex-direction: row;

  display: flex;
  flex-direction: var(--flex-direction);
  font-family: 'Roboto', sans-serif;
  background: #ccc;

  h2 {
    margin: 0;
    font-weight: 500;
    font-size: 1.17em;
    line-height: 37pt;
    letter-spacing: 10px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.7);
  }

  h3 {
    margin: 0;
    font-weight: 400;
  }

  ul {
    padding-left: 20px;
  }

  .section-headline {
    margin: 12px 0 6px 0;
    font-weight: 500;
    font-size: 10pt;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #3f3d3c;
    opacity: 0.8;

    ~ .section-headline {
      margin-top: 24px;
    }
  }

  .left-column {
    width: 35%;
    min-height: @page-height;
    padding: 0 24px 24px;
    box-shadow:
      0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
    background-color: #16151c;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 300;
    font-size: 13px;

    .picture {
      width: 277px;
      height: 277px;
      margin: 0 -24px;
    }

    .section-headline {
      color: rgba(255, 255, 255, 0.5);

      ~ .section-headline {
        margin-top: 32px;
      }
    }

    .item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 13px;

      .fa-solid,
      .fa-brands,
      .material-icons {
        display: inherit;
        width: 26px;
        font-size: 26px;
      }
    }

    .skill-item {
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
    }

    .skill {
      .progress {
        position: relative;
        height: 2px;
        margin: 0.5rem 0 10px;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, 0.2);

        .determinate {
          position: absolute;
          top: 0;
          bottom: 0;
          background-color: #78909c;

          .fa-solid,
          .fa-brands,
          .material-icons {
            position: absolute;
            top: -5px;
            right: -2px;
            font-size: inherit;
            color: #fff;
          }
        }
      }
    }
  }

  .right-column {
    display: flex;
    flex-direction: column;
    width: 65%;
    min-height: @page-height;
    padding: 16px;

    .title {
      padding: 10px 20px 20px;

      .position {
        font-weight: 500;
        font-size: 10pt;
        line-height: 15pt;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: rgba(63, 61, 60, 0.7);
        opacity: 0.8;
      }

      .about {
        margin-top: 8px;
        font-weight: 300;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.5);
      }
    }

    .block {
      margin: 5px 0;
      padding: 20px;
      box-shadow:
        0 2px 5px 0 rgba(0, 0, 0, 0.16),
        0 2px 10px 0 rgba(0, 0, 0, 0.12);
      background-color: #fff;

      .headline {
        font-weight: 400;
        display: block;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.9);
      }

      .sub-headline {
        color: rgba(0, 0, 0, 0.5);
        display: block;
        font-size: 14px;
        font-weight: 300;
      }

      .info {
        margin: 0;
        padding-top: 20px;
        font-weight: 300;
        font-size: 10pt;
        line-height: 17pt;
        font-family: 'Roboto', sans-serif;
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
}
</style>
