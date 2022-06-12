<template>
  <div class="q-mt-xl q-pl-xl" style="font-size: 20px; font-weight: 600">
    방문자 리뷰 {{ reviewData.length }}건
  </div>
  <q-page class="row q-mt-xs q-gutter-md justify-center">
    <q-card
      v-for="review in reviewData"
      :key="review"
      class="my-card"
      flat
      bordered
    >
      <q-card-section horizontal>
        <q-card-section class="q-pt-sm">
          <div>
            <q-avatar>
              <img :src="User['user_thumbnail_url']" alt="" />
            </q-avatar>
            <div class="text-overline">{{ review.user_name }}</div>
          </div>
          <div class="text q-mt-sm q-mb-xs">{{ review.review_drink }}</div>
          <div class="text-caption text-grey">
            {{ review.review_description }}
          </div>
        </q-card-section>
        <q-card-section class="col-5 flex flex-center">
          <q-img class="borders" :src="review.review_thumbnail" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import userData from 'src/data/userData'

export default {
  name: 'ReviewCard',
  props: {
    userData: Array,
    reviewData: Array
  },
  computed: {
    User() {
      return userData[1]
    }
  }
}
</script>
<style lang="scss" scoped>
.my-card {
  width: 500px;
  height: 250px;
  .user-info {
    width: 30px;
    display: flex;
    align-items: center;
    margin: 10px;
  }
  .user-name {
    font-size: 20px;
    margin: 10px;
  }
}
</style>
