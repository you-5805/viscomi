<template>
  <div class="ma-10">
    <h1 id="form-title">ログイン</h1>
    <p>ボタンをクリックすると、自動でサンプルのログイン情報が入力されます。</p>
    <div class="login-auto-fill">
      <button @click="comUser">公民館ユーザー</button>
      <button @click="genUser">一般ユーザー</button>
    </div>
    <v-form class="form" ref="login_form" @submit.prevent>
      <base-input 
        label="メールアドレス"
        type="email"
        :value="form.email"
        placeholder="ビズコミに登録したメールアドレスを入力してください。"
        @input="form.email = $event" />
      <base-input
        label="パスワード"
        type="password"
        :value="form.password"
        @input="form.password = $event" />
      <span
        class="blue--text text--lighten-2 signin-span to-password-reset pb-5"
        @click="toPasswordReset"
      >パスワードを忘れた場合</span>
      <!-- formタグのsubmitを使うと自動で画面がリフレッシュされ、不都合なため、clickイベントで処理 -->
      <base-button value="ログイン" @click="onSubmit" />
    </v-form>
    <p class="ma-5">初めてのご利用ですか？ <br><span @click="toSignUp" class="blue--text text--lighten-2 signin-span">利用者登録</span></p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    password: 'foobarbaz',
    appendIcon: false
  }),
  computed: mapGetters(["loggedIn"]),
  mounted () {
    if (this.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions(["logIn"]),
    ...mapMutations(['updateIsLoading']),
    toSignUp () {
      this.$router.push('/signup')
    },
    toPasswordReset () {
      this.$router.push('/reset')
    },
    onSubmit () {
      if (this.$refs.login_form.validate()) {
        this.updateIsLoading(true)
        this.logIn(this.form)
      }
    },
    comUser () {
      this.form = {
        email: 'test.center@example.com',
        password: this.password
      }
    },
    genUser () {
      this.form = {
        email: 'user1@example.com',
        password: this.password
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-auto-fill {
  button {
    border: 1px solid skyblue;
    border-radius: 10px;
    padding: 5px;
    background-color: skyblue;
    color: white;
  }
}
</style>