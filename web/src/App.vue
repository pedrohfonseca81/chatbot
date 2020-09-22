<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    if (
      !this.isAuthenticated &&
      !["Login", "Register"].includes(this.$route.name)
    ) {
      this.$router.push("/login");
    } else {
      this.$store.dispatch("fetchUser");
    }
  }
};
</script>