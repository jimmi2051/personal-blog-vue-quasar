<template>
  <q-page>
    <Homesection1 />
    <div class="home-page">
      <Homesection12 />
      <Homesection2 />
      <Homesection3 />
      <Homesection4 />
      <Homesection5 />
      <Homesection6 />
    </div>
  </q-page>
</template>

<script>
// // @ is an alias to /src
import { mapState } from "vuex";
import { isArray } from "lodash";
import { findPage } from "utils/Helpers";
import Homesection1 from "sections/Homepage/Homesection1";
import Homesection12 from "sections/Homepage/Homesection1-2";
import Homesection2 from "sections/Homepage/Homesection2";
import Homesection3 from "sections/Homepage/Homesection3";
import Homesection4 from "sections/Homepage/Homesection4";
import Homesection5 from "sections/Homepage/Homesection5";
import Homesection6 from "sections/Homepage/Homesection6";

function mapStateToProps(state) {
  let data = {};
  const pages = state.Page.pages.data.pages;
  if (pages && isArray(pages)) {
    data = findPage(pages, "Home");
  }
  return {
    loading: state.Page.pages.loading,
    homePage: data
  };
}
export default {
  name: "Home",
  created: function() {},
  mounted() {
    const { current } = this.$router.history;
    if (current.hash && current.hash !== "") {
      let { hash } = current;
      const div = hash.substring(1);
      const elem = document.getElementById(div);
      if (elem) {
        elem.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start"
        });
      }
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  },
  data() {
    return {
      ratingModel: 3,
      slide: 1
    };
  },
  components: {
    Homesection1,
    Homesection12,
    Homesection2,
    Homesection3,
    Homesection4,
    Homesection5,
    Homesection6
  },

  meta: {
    // sets document title
    title: "Home Page",
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: title => `${title} - DefTnt Blog`,

    // meta tags
    meta: {
      description: {
        name: "description",
        content:
          "Hi There, I'm Thanh Nguyen. Software Engineer - Full-stack develop. I have more than a year of experience working with ReactJS & Python Django. Tel: (+84) 569363575 & Email: thanhnl0697@gmail.com"
      },
      keywords: {
        name: "keywords",
        content:
          "Deftnt Blog, Thanh Ly, Thanh Nguyen Ly, thanhnl0697@gmail.com, (+84) 569363575"
      },
      equiv: {
        "http-equiv": "Content-Type",
        content: "text/html; charset=UTF-8"
      }
    },

    // CSS tags
    link: {
      material: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    },

    // JS tags
    script: {
      ldJson: {
        type: "application/ld+json",
        innerHTML: `{ "@context": "http://schema.org" }`
      }
    },

    // <html> attributes
    htmlAttr: {
      "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">
      empty: undefined // generates <html empty>
    },

    // <body> attributes
    bodyAttr: {
      "action-scope": "xyz", // generates <body action-scope="xyz">
      empty: undefined // generates <body empty>
    },

    // <noscript> tags
    noscript: {
      default: "This is content for browsers with no JS (or disabled JS)"
    }
  }
};
</script>
