<template>
  <div class="q-pt-md" id="contact">
    <h2 class="section--title">Contact</h2>
    <div class="q-gutter-y-md row q-pt-md contact">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 contact-info">
        <div class="contact-title q-mb-md">Contact Info</div>
        <div class>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <i class="fab fa-facebook fa-2x" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-btn
                type="a"
                href="https://www.facebook.com/beatboxer.mrteo"
                no-shadow
                target="__blank"
                >[Thành Lý] jimmi2051@gmail.com
              </q-btn>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <i class="fab fa-instagram-square fa-2x" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-btn
                type="a"
                href="https://www.instagram.com/deftnguyen/"
                no-shadow
                target="__blank"
                >[Thành Lý] jimmi2051@gmail.com
              </q-btn>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <i class="fab fa-google fa-2x" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-btn
                type="a"
                href="mailto:thanhnl0697@gmail.com"
                no-shadow
                target="__blank"
                >[Thành Nguyễn Lý] thanhnl0697@gmail.com
              </q-btn>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <i class="fas fa-phone fa-2x" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-btn type="a" href="tel:0569363575" no-shadow target="__blank">
                [Thành Nguyễn Lý] (+84) 569363575
              </q-btn>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 contact-touch">
        <div class="contact-title q-mb-md">Get In Touch</div>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Your mail *"
            hint="E-mail"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please type something',
              isValidEmail
            ]"
            ref="email"
          />

          <q-input
            filled
            v-model="name"
            label="Your name *"
            hint="Name and surname"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            ref="name"
          />
          <q-input
            label="Description *"
            hint="Minimum 50 characters"
            v-model="description"
            filled
            type="textarea"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            ref="description"
          />
          <q-toggle v-model="accept" label="I'm not a bot" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </div>
    <!-- <q-splitter v-model="splitterModel">
      <template v-slot:before></template>

      <template v-slot:after></template>
    </q-splitter>-->
  </div>
</template>

<script>
import FetchApi from "utils/FetchApi";
import { EMAIL_RECEIVE_CONTACT } from "utils/Constants";
export default {
  data() {
    return {
      splitterModel: 50, // start at 50%,
      name: null,
      email: null,
      accept: false,
      description: null
    };
  },
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need confirm you aren't a bot."
        });
      } else {
        const payload = {
          uri: "email",
          params: {
            to: EMAIL_RECEIVE_CONTACT,
            subject: `Notice: You have a contact from ${this.name} - ${this.email}`,
            text: `Name: ${this.name} - Email: ${this.email} - Message: ${this.description}`,
            html: `<h1>Name: ${this.name} <br/>- Email: ${this.email} <br/>- Message: ${this.description}</h1>`
          },
          opt: {
            method: "POST"
          }
        };
        FetchApi(payload).then(response => {
          if (response.error) {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: response.message
            });
          } else {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message:
                "Submitted. Thanks for your contact. I'll check it as soon as possible."
            });
            this.onReset();
            this.$refs.email.resetValidation();
            this.$refs.description.resetValidation();
            this.$refs.name.resetValidation();
          }
        });
      }
    },

    onReset() {
      this.name = "";
      this.description = "";
      this.email = "";
      this.accept = false;
    },
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    }
  }
};
</script>
