
let NomDuClient = 'NomDuClient';
let year = new Date().getFullYear();

export default {
  companyInfo: {
    name: `${NomDuClient}`, // TODO
    address: 'Adresse du client', // TODO
    phone: '(999) <strong>999-9999</strong>', // TODO
    phoneUrl: 'tel:+19999999999', // TODO
    contactEmail: 'exemple@exemple.com', // TODO
  },
  credits: {
    copyrights: `© ${NomDuClient}, ${year}`,
    allRights: 'Tous droits réservés',
  },
  language: {
    name: 'EN',
    url: 'en-ca',
  },
  nmedia: {
    name: 'Nmedia - Votre Allié numérique',
    url: 'https://www.nmedia.ca/',
  },
  projet1047: {
    name: 'Projet1047',
    url: 'https://www.projet1047.ca/',
  },
  social: {
    facebook: {
      text: `Facebook - ${NomDuClient}`, // TODO
      url: '/' // TODO
    },
    instagram: {
      text: '',
      url: ''
    },
    linkedin: {
      text: '',
      url: ''
    },
    youtube: {
      text: '',
      url: ''
    },
  },
}
