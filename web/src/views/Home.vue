<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div v-if="messages.length < 1">
          <h3 class="text-center">Nothing here :(</h3>
        </div>
        <div v-else class="message" v-for="(x, key) in messages" :key="key">
          <h5
            v-html="`<b><span style='${x.user === 'Bot' ? 'color: blue' : 'color: #f33'}'>${x.user}</span></b>` + ': ' +  parseContent(x.content)"
          ></h5>
        </div>
      </div>
      <div class="card-footer">
        <form @submit.prevent="sendMessage">
          <div class="form-group">
            <input
              id="chat_input"
              autocomplete="off"
              v-model="input"
              placeholder="Message"
              style="margin-bottom: 0.25em"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="text-center">
            <button class="btn btn-primary" type="submit">SEND</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      input: "",
      message: ""
    };
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    parseContent(text) {
      return text
        .replace(/{username}/g, this.user.username)
        .replace(/{time}/g, dayjs(Date.now()).format("h:mm"));
    },
    sendMessage() {
      if (this.input) {
        this.message = this.input;
        this.input = "";

        setTimeout(() => {
          this.$store.commit("PUSH_MESSAGE", {
            user: this.user.username,
            content: this.message
          });

          this.$store.dispatch("sendMessage", this.message);
          window.scrollTo(0, 9999);
        }, 200);
      }
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

$background: #6200ee;

html,
body,
#app {
  background-color: $background !important;
  font-family: "Roboto", sans-serif !important;
}

.card {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background: white;
  width: 400px;
}

.card-body {
  padding: 1em;
}

.message {
  padding: 10px;
  margin: 10px;
  background-color: whitesmoke;
  background-clip: padding-box;
}
</style>