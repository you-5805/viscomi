<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
  ><template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#243743"
        dark
        v-bind="attrs"
        v-on="on"
        class="hide white--text"
        ></v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="indigo darken-4 white--text"
          text
          @click="close"
        >確認</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {},
    message: {},
    dialog: {
      default: false
    },
    toLogin: {
      require: false,
      default: false
    },
    toTop: {
      require: false,
      default: false
    }
  },
  methods: {
    close () {
      this.dialog = false
      if (this.toLogin) {
        this.$router.push('/login')
      } else if (this.toTop) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
</style>