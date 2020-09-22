<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h2>Login</h2>
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
              v-model="password"
              id="password"
              type="password"
              autocomplete="off"
              class="form-control"
              maxlength="28"
              minlength="8"
              required
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">LOGIN</button>
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
          <router-link to="/register">
            <button class="btn btn-secondary">REGISTER</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    message() {
      return this.$store.state.Authentication.signIn.message;
    },
    valid() {
      return this.$store.state.Authentication.signIn.valid;
    }
  },
  methods: {
    onSubmit() {
      if (
        this.username.length >= 6 &&
        this.username.length <= 14 &&
        this.password.length >= 8 &&
        this.password.length <= 28
      ) {
        this.$store.dispatch("signIn", {
          username: this.username,
          password: this.password
        });
      }
    }
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push("/");
    }
  }
};
</script>