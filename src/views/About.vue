<template>
  <q-page>
    <div class="about-us">
      <div class="section-1">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal class="wrap">
            <q-card-section class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
              <h4 class="text-h4">
                <div>Software Engineer</div>
                Nguyen Ly Thanh
              </h4>
              <p class="text-subtitle1 text-bold">GET IN CONTACT</p>
              <p class="text-body1">
                <span class="text-bold">Mobile:</span>
                <a href="tel:0569363575">(+84) 569363575</a>
                <br />
                <span class="text-bold">Email:</span>
                <a href="mailto:thanhnl0697@gmail.com">thanhnl0697@gmail.com</a>
                <br />
                <span class="text-bold">Linkedin:</span>
                <a
                  href="https://linkedin.com/in/thanh-nguyen-ly"
                  target="blank"
                >
                  https://linkedin.com/in/thanh-nguyen-ly
                </a>
                <br />
                <span class="text-bold">Blog:</span>
                <a href="https://deftnt-blog.herokuapp.com/" target="blank">
                  https://deftnt-blog.herokuapp.com
                </a>
                <br />
                <span class="text-bold">Github:</span>
                <a href="https://deftnt-blog.herokuapp.com/" target="blank">
                  https://github.com/jimmi2051
                </a>
              </p>

              <p class="text-subtitle1 text-bold">Personal Profile</p>
              <p class="text-body1">
                Creative, self-motivated, and independent engineer with two
                years of experience in the Software field in various positions
                fully involved in the Software Development Life Cycle.
                <br />Strong at NodeJS, Python, and ReactJS. <br />Experience
                with AWS. Familiar with Agile/Scrum. <br />Good at Docker,
                CI/CD, Unit Testing & Coverage Testing
              </p>
              <p class="text-subtitle1 text-bold">Technical Expertise</p>
              <p class="text-body1">
                <span class="text-bold">Programming languages:</span>
                Javascript, Python, C#, TypeScript
                <br />
                <span class="text-bold">DBMS:</span> MongoDB, PostgreSQL, SQL
                Server, MySQL, SQLite
                <br />
                <span class="text-bold">Framework / CMS:</span> NextJS, Django,
                Strapi, VueJS, Quasar, .NET & EF
                <br />
                <span class="text-bold">Library:</span>ReactJS
                <br />
                <span class="text-bold">Platform:</span>NodeJS
                <br />
                <span class="text-bold">Style sheet language:</span> CSS, SCSS,
                SASS
                <br />
                <span class="text-bold">Markup Language:</span>HTML
              </p>
            </q-card-section>

            <q-img
              transition="fade"
              class="col-xs-12 col-sm-12 col-md-5 col-lg-5"
              :src="require('@/assets/images/Homepage/profile.jpg')"
              spinner-color="white"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  meta: {
    // sets document title
    title: "About Page",
    titleTemplate: title => `${title} - DefTnt Blog`
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 1140px;
  margin: auto;
}
</style>
