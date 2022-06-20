<template>
  <div class="card-user-info-container">
    <div class="card-user-info-inner">test</div>
  </div>
</template>
<script>
export default {
  name: 'CardUserInfo',
  components: {},
  props: {
    user_id: { type: Number, required: true }, // 로그인한 사용자의 아이디
    user_email: { type: String, required: true }, // 'review' or 'cnote' or 'cafe'
    user_introduce: { type: String, required: true }, // 'review_id' or 'cnote_id' or 'cafe_id',
    user_thumbnail_url: { type: String, required: true } // 'review_id' or 'cnote_id' or 'cafe_id'
  },
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
