<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h2>Register</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="username"
              id="username"
              autocomplete="off"
              class="form-control"
              minlength="6"
              maxlength="14"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password1"
              id="password"
              type="password"
              autocomplete="off"
              class="form-control"
              maxlength="28"
              minlength="8"
              required
            />
          </div>
          <div class="form-group">
            <label for="repeat_password">Repeat password</label>
            <input
              v-model="password2"
              id="repeat_password"
              type="password"
              autocomplete="off"
              class="form-control"
              maxlength="28"
              minlength="8"
              required
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">REGISTER</button>
          </div>
        </form>
        <div class="text-center">
          <div
            v-if="valid != null"
            class="alert"
            :class="!valid ? 'alert-danger' : 'alert-success'"
            style="margin: 10px"
          >{{ message }}</div>
          <div
            style="width: 100%; height: 20px; border-bottom: 1px solid #858585; text-align: center; margin-bottom: 10px"
          >
            <span style="font-size: 20px; background-color: #fff; padding: 0 10px;">or</span>
          </div>
          <router-link to="/login">
            <button class="btn btn-secondary">LOGIN</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password1: "",
      password2: ""
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    message() {
      return this.$store.state.Authentication.signUp.message;
    },
    valid() {
      return this.$store.state.Authentication.signUp.valid;
    }
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push("/");
    }
  },
  methods: {
    onSubmit() {
      if (this.password1 != this.password2) {
        return this.$store.commit("SIGN_UP", {
          valid: false,
          message: "Passwords do not match"
        });
      }

      this.$store.dispatch("signUp", {
        username: this.username,
        password: this.password1
      });
    }
  }
};
</script>