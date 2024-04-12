import {terms} from '../terms';
import data from '../../data/data.yml';

let person;
if (import.meta.env.VITE_DATA_URL) {
  try {
    await fetchData(import.meta.env.VITE_DATA_URL);
  } catch (error) {
    console.log(`Fetching data failed (VITE_DATA_URL: ${import.meta.env.VITE_DATA_URL}).`);
  }
} else {
  person = await data;
}

async function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response);
    })
    .then(json => {
      person = json;
    });
}

export default function (name) {
  return {
    name,
    data() {
      return {
        person,
        terms
      };
    },
    computed: {
      lang() {
        const defaultLang = this.terms.en;
        const useLang = this.terms[this.person.lang];

        // overwrite non-set fields with default lang
        Object.keys(defaultLang)
          .filter(k => !useLang[k])
          .forEach(k => {
            useLang[k] = defaultLang[k];
          });

        return useLang;
      },

      contactLinks() {
        const links = {};

        if (this.person.contact.email) {
          links.email = `mailto:${this.person.contact.email}`;
        }

        if (this.person.contact.phone) {
          links.phone = `tel:${this.person.contact.phone.replace(/[^0-9]/g, '')}`;
        }

        if (this.person.contact.linkedin) {
          links.linkedin = `https://linkedin.com/in/${this.person.contact.linkedin}`;
        }

        if (this.person.contact.github) {
          links.github = `https://github.com/${this.person.contact.github}`;
        }

        if (this.person.contact.website) {
          links.website = this.sanitizeUrl(this.person.contact.website);
        }

        return links;
      },

      websiteText() {
        return this.getUrlText(this.person.contact.website);
      },

      linkedinText() {
        if (!this.person.contact.linkedin) {
          return '';
        }

        return 'linkedin.com/in/' + this.person.contact.linkedin;
      },

      githubText() {
        if (!this.person.contact.github) {
          return '';
        }

        return 'github.com/' + this.person.contact.github;
      },

      // Returns address as a single line
      address() {
        const address = [];

        if (this.person.contact.addressLine1) {
          address.push(this.person.contact.addressLine1);
        }

        if (this.person.contact.addressLine2) {
          address.push(this.person.contact.addressLine2);
        }

        return address.join(', ');
      },

      // If your experience has been at mostly one company, your resume will duplicate the company name many times.
      // Use this to filter the company name from successive entries.
      filteredExperience() {
        let company = null;

        return this.person.experience.map(experience => {
          if (experience.company === company) {
            delete experience.company;
          } else {
            company = experience.company;
          }

          return experience;
        });
      },

      // Sorts skills alphabetically
      sortedSkills() {
        if (!this.person.skills) {
          return this.person.skills;
        }

        return this.person.skills.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }

          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }

          return 0;
        });
      },

      // Groups skills by type
      groupedSkills() {
        if (!this.person.skills) {
          return this.person.skills;
        }

        return this.person.skills.reduce((acc, obj) => {
          const key = obj.type;
          const curGroup = acc[key] || [];
          return {...acc, [key]: [...curGroup, obj.name]};
        }, {});
      }
    },
    methods: {
      hasProtocol(url) {
        return url.indexOf('//') !== -1;
      },

      // Prepends url if necessary
      sanitizeUrl(url) {
        if (!url) {
          return 'javascript:void(0);';
        }

        return (this.hasProtocol(url) ? '' : '//') + url;
      },

      // Strips protocol and www if necessary
      getUrlText(url) {
        if (!url) {
          return '';
        }

        const protocolIndex = url.indexOf('//');
        if (protocolIndex !== -1) {
          url = url.substring(protocolIndex + 2);
        }

        const wwwIndex = url.indexOf('www.');
        if (wwwIndex === 0) {
          url = url.substring(4);
        }

        return url;
      }
    }
  };
}
