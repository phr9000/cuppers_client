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
              <img :src="userData[2]['user_thumbnail_url']" alt="" />
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
export default {
  name: 'ReviewCard',
  props: {
    userData: {
      type: Object,
      default: () => {
        return {
          user_thumbnail_url:
            'https://i.pinimg.com/564x/ae/b2/9c/aeb29ca628a2e8c49feddbd0688f4c44.jpg'
        }
      }
    },
    reviewData: {
      type: Object,
      default: () => {
        return {
          user_name: 'Weme',
          review_drink: '에스프레소',
          reivew_description:
            '동네커피숍처럼 아기자기했던 까페 ^^ 이곳저곳 모두 비슷한매장컨셉에 질렸던터라, 이곳은 저에겐 좀 색다르게느껴졌어요 ㅎㅎㅎ까페치고는 매우 간략한메뉴판이 있는 곳입니다 ㅎㅎ',
          review_thumbnail:
            'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Fmystore%2F8B933339DC3E4BF2B9033A30ADBCA5F4'
        }
      }
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
