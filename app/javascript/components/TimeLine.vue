<template>
  <div id="timeline-container" class="mt-5">
    <template v-if="noContent">
      <v-img
        src="/images/timeline_empty.png"
        alt="投稿がありません"
        width="300"
        height="300"
        class="mx-auto"
      />
      <p class="text-xl" style="whitespace: wrap;">まだ記事や地域情報が投稿されていないようです</p>
    </template>
    <template v-else>
      <v-tabs v-model="tab" class="mb-10 px-auto tabs-container">
        <v-row no-gutters>
          <v-col v-for="tab in tabs" :key="tab">
            <v-tab class="py-4 px-0">{{ tab }}</v-tab>
          </v-col>
        </v-row>
      </v-tabs>
      <div
        v-for="post in sortedPosts"
        class="post"
        :key="post.id">
        <post-card :post="post" :open="open" :key="post.id" @openModal="open = true" @close="open = false" />
      </div>
      <v-row v-if="tab == 3">
        <v-col
          cols=12 sm=6 lg=4
          v-for="ad in shuffledAds"
          class="ad"
          :key="ad.phone_number">
          <ad-card :ad="ad" :key="ad.phone_number" />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    posts: [],
    sortedPosts: [],
    ads: [],
    tabs: ['すべて', 'イベント', '連絡事項', '地域広告'],
    tab: 0,
    open: false,
    noContent: false
  }),
  computed: {
    shuffledAds () {
      // 広告の表示順をシャッフルするメソッド
      // 仕様未決定のため保留
      // let result = []
      // for (let i = 0; i < this.ads.length; i++) {
      //   let n = Math.floor(Math.random() * Math.floor(2))
      //   if (n === 0) {
      //     result.push(this.ads[i])
      //   } else {
      //     result.unshift(this.ads[i])
      //   }
      // }
      // this.ads =  result
      return this.ads
    }
  },
  watch: {
    tab () {
      if (this.tab === 0) {
        this.sortedPosts = this.posts
      } else if (this.tab === 1) {
        this.sort('イベントの告知・報告')
      } else if (this.tab === 2) {
        this.sort('連絡事項')
      } else {
        this.sortedPosts = null
      }
    }
  },
  mounted () {
    this.$axios.get('/timelines').then(res => {
      this.posts = this.sortedPosts = res.data.posts
      this.ads = res.data.ads
      if (this.posts.length === 0 && this.ads.length === 0) {
        this.noContent = true
      }
    })
  },
  methods: {
    sort (str) {
      this.sortedPosts = []
      for (let i = 0; i < this.posts.length; i ++) {
        if (this.posts[i].type == str) {
          this.sortedPosts.push(this.posts[i])
        }
      }
    }
  }
}
</script>