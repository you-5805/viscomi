<template>
  <v-card
    class="mx-auto my-4 text-left"
    max-width="374">

    <v-img
      height="250"
      :src="imageUrl" />

    <v-card-title class="font-maru">{{ ad.owner_name }}</v-card-title>
    <v-divider></v-divider>

    <v-card-text class="font-maru">
      <p style="white-space: pre-wrap;">{{ ad.content }}</p>
    </v-card-text>
    <v-card-text class="font-maru" v-if="ad.phone_number">
      <v-icon>mdi-phone</v-icon>
      <a :href="phone_link">{{ ad.phone_number}}</a>
    </v-card-text>
      <p class="ad-link py-3 font-maru text-center"><a :href="ad.url" target="_blank">詳しくはこちら</a></p>
  </v-card>
</template>

<script>
export default {
  props: {
    ad: {
      default: () => ({
        owner_name: '',
        content: '',
        phone_number: '',
        ad_image: {
          image: {
            url: null
          }
        },
        community_center_id: 0,
        url: ''
      }),
    }
  },
  data: () => ({
    // ダミーデータの画像表示用のため、本番では削除
    samplePicks: [
      '/images/sample/nikuzyaga.jpg',
      '/images/sample/pizza.jpg',
      '/images/sample/coffee.jpg',
      '/images/sample/cafe.jpg',
    ]
  }),
  computed: {
    imageUrl () {
      if (this.ad.ad_image !== null) {
        return this.ad.ad_image.image.url
      } else {
        return this.samplePicks[this.n]
      }
    },
    phone_link () {
      if (this.ad.phone_number) {
        return `tel:${this.ad.phone_number}`
      }
    },
    n () {
      return Math.floor(Math.random() * Math.floor(4))
    }
  }
}
</script>