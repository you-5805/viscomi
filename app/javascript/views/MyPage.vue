<template>
  <div id="mypage-container">
    <div class="to-edit" @click="toEdit">
      <v-icon large>mdi-account-cog</v-icon>
    </div>
    <h1>設定</h1>
    <v-divider class="hr mt-10 mb-10"></v-divider>
    <div class="user-info">
      <div class="no-img"></div>
      <h3>名前：{{ userData.name }}</h3>
      <h3>メールアドレス：{{ userData.email }}</h3>
      <h3>登録している公民館：{{ userData.following.name }}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['userData', 'followingId', 'loggedIn']),
  mounted () {
    if (!this.loggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    toEdit () {
      this.$router.push('/edit_mypage')
    }
  }
}
</script>