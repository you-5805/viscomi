<template>
  <v-btn
    @click="onClick"
    rounded
    class="white--text px-10 py-7"
    color="#243743">
    <v-icon v-show="!!icon" class="pr-3">{{ icon }}</v-icon>
    <p>{{ name }}</p>
  </v-btn>
</template>

<script>
export default {
  props: {
    path: {
      require: true
    },
    name: {
      require: true
    },
    icon: {
      require: false
    }
  },
  methods: {
    onClick () {
      this.$router.push(this.path)
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 17px;
  margin: auto 0;
}
@media (max-width: 600px) {
  p {
    font-size: 18px;
  }
}
</style>