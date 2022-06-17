<template>
  <div class="card_review_container">
    <q-card class="card_review" flat bordered>
      <q-card-section class="cafe_info row items-center justify-between">
        <div @click="cnoteTitleClick" class="text-h5 cafe_name q-mb-xs q-mr-xs">
          {{ cnote.cnote_title }}
        </div>
        <div class="btn_like">
          <btn-like
            :user_id="1"
            :id_what="cnote.cnote_id"
            like_what="cnote"
            :is_liked="cnote.user_cnote_liked"
            :likeit_cnt="cnote.cnote_liked_cnt"
          />
        </div>
      </q-card-section>
      <q-card-section horizontal class="coffee_info_wrap row q-pt-none q-pr-md">
        <div class="coffee_info q-py-none q-px-md">
          <div class="caption text-caption text-grey q-my-sm">
            {{ cnote.cnote_content }}
          </div>
        </div>
        <q-img
          class="col-5 q-pr-sm review_image"
          :initial-ratio="1"
          :src="cnote.cnote_thumbnail"
        />
      </q-card-section>
      <q-card-section
        class="review_bottom row justify-between items-center q-mb-m"
        ><div class="user_info row items-center">
          <btn-avatar :url="cnote.user_thumbnail" />
          <div class="q-ml-sm user_name">{{ cnote.user_name }}</div>
        </div>

        <div class="text-grey">{{ createDate }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { format, toDate } from 'date-fns'
import { defineComponent } from 'vue'
import BtnAvatar from 'src/components/Button/BtnAvatar.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'

export default defineComponent({
  name: 'CardReview',
  components: { BtnAvatar, BtnLike },
  props: {
    cnote: {
      type: Object,
      default: () => {
        return {
          cnote_id: 1,
          user_id: 1,
          cnote_title: '한 잔의 커피는 나의 아낭케',
          user_name: '동글동글동글이',
          user_thumbnail:
            'https://lh3.googleusercontent.com/a-/AOh14GggDZ_vzX_GCd3BjndXJiua3NszhmGTdr-CK82pLcU=s83',
          cnote_content:
            '오늘도 정량을 비운 커피잔엔 내일 마실 한 잔의 커피를 그리워하는 마음이 말라버린 거품으로 남았다.오늘도 정량을 비운 커피잔엔 내일 마실 한 잔의 커피를 그리워하는 마음이 말라버린 거품으로 남았다.',
          cnote_thumbnail:
            'https://cdn.mhns.co.kr/news/photo/202103/502451_604128_1858.jpg',
          created_at: '2022-06-10T10:58:54.000Z',
          user_cnote_liked: true,
          cnote_liked_cnt: 142,
          user_cnote_marked: false
        }
      }
    }
  },
  computed: {
    createDate() {
      let time = toDate(Date.parse(this.cnote.created_at))
      return format(time, 'MMM dd. yyyy')
      // let time = this.cnote.created_at
      // return created_at
    }
  },
  methods: {
    cnoteTitleClick() {
      console.log(`cnote id(${this.cnote.cnote_id}) clicked`)
      // this.$router.push({ path: '/cafedetail/1' })
    }
  }
})
</script>

<style lang="scss" scoped>
.user_info {
  .user_name {
    color: $grey-9;
  }
}
.card_review {
  background-color: $card-bg-color;
  border: 1px solid $grey-4;
  .cafe_info {
    .cafe_name {
      transition: all 0.5s;
      color: $grey-9;
      cursor: pointer;
      &:hover {
        color: $grey-6;
      }
    }
    .btn_like {
      position: relative;
      left: 7px;
    }
  }
  .review_image {
    border-radius: 4px;
  }
  .review_bottom {
    padding: 4px 16px 8px 16px;
  }
}
</style>
