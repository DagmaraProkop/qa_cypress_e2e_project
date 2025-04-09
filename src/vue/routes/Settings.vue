<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="updateSettings()">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="user.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.username"
                  placeholder="Your username"
                  data-cy="username-settings"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="user.bio"
                  placeholder="Short bio about you"
                  data-cy="bio-settings"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.email"
                  placeholder="Email"
                  data-cy="email-settings"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="user.password"
                  placeholder="Password"
                  data-cy="password-settings"
                />
              </fieldset>
              <button 
                class="btn btn-lg btn-primary pull-xs-right"
                data-cy="update-btn">
                Update Settings
              </button>
            </fieldset>
          </form>
          <!-- Line break for logout button -->
          <hr />
          <button @click="logout" 
            class="btn btn-outline-danger"
            data-cy="logout-btn">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Settings",
  computed: {
    ...mapGetters([
      "user",
    ])
  },
  mounted() {
    console.log("Settings.vue mounted!");
  },
  methods: {
    updateSettings() {
      swal({
          text: "Updating your information... Please wait...",
          timer: 500,
          buttons: false,
        })
        .then(async () => {
          return await this.$store.dispatch("updateUser", this.user);
        })
        .then((response) => {
          if (response === true) {
            return swal({
              title: "Update successful!",
              icon: "success"
            });
          }
          let error = "";
          for (let key in response.errors) {
            error += `${response.errors[key]} `;
          }
          swal({
            title: "Update failed!",
            text: error,
            icon: "error"
          });
        });
    },
    mounted() {
      console.log("Settings.vue mounted!");
    },
    logout() {
      this.$store.dispatch("logOut")
        .then(() => {
          this.$router.push({ name: "home" });
        });
    }
  }
};
</script>
