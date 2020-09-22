<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="answer_input">Answer</label>
            <input
              v-model="answer"
              autocomplete="off"
              id="answer_input"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="reply_input">Reply</label>
            <input
              v-model="reply"
              autocomplete="off"
              id="reply_input"
              class="form-control"
              required
            />
          </div>
          <div class="text-center">
              <router-link to="/">
                  <button class="btn btn-primary">BACK</button>
              </router-link>
              <button class="btn btn-primary" type="submit">CREATE</button>
          </div>
        </form>
      </div>
      <div v-if="valid != null" class="alert" :class="!valid ? 'alert-danger' : 'alert-success'" style="margin: 10px">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      answer: "",
      reply: ""
    };
  },
  computed: {
    message() {
      return this.$store.state.createPage.message;
    },
    valid() {
      return this.$store.state.createPage.valid;
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("createAnswer", {
        answer: this.answer,
        reply: this.reply
      });
    }
  }
};
</script>

<style lang="scss">
.btn {
    margin: 10px;
}
</style>