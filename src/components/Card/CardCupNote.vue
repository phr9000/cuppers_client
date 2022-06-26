<template>
  <div class="card_container">
    <q-card @click="handleCLickCnoteCard" class="card" flat bordered>
      <q-card-section
        class="card_title_wrap row no-wrap items-start justify-between"
      >
        <div class="text-h5 card_title q-mb-xs q-mr-xs">
          {{ cnote.cnote_title }}
        </div>
        <div class="btns_wrap row no-wrap">
          <div class="btn_like_wrap">
            <btn-like
              :user_id="cnote.user_id"
              :id_what="cnote.cnote_id"
              like_what="cnote"
              :is_liked="cnote.user_cnote_liked"
              :likeit_cnt="cnote.cnote_liked_cnt"
            />
          </div>
          <div class="btn_bookmark_wrap">
            <btn-book-mark
              :user_id="cnote.user_id"
              :cnote_id="cnote.cnote_id"
              :is_marked="cnote.user_cnote_marked"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section horizontal class="coffee_info_wrap row q-pt-none q-pr-md">
        <div class="coffee_info q-py-none q-px-md">
          <div class="caption text-caption text-grey q-my-sm">
            {{ cnote.cnote_content }}
          </div>
        </div>
        <q-img
          class="col-5 q-pr-sm card_image"
          :initial-ratio="1"
          :src="cnote.cnote_thumbnail"
          ><div
            class="rounded-borders absolute-full text-subtitle2 flex flex-center"
          ></div>
        </q-img>
      </q-card-section>
      <q-card-section
        class="card_bottom row justify-between items-center q-mb-m"
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
import BtnBookMark from 'src/components/Button/BtnBookMark.vue'

export default defineComponent({
  name: 'CardReview',
  components: { BtnAvatar, BtnLike, BtnBookMark },
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
    handleCLickCnoteCard() {
      const cnote_id = this.cnote.cnote_id
      // console.log(`cnote id(${cnote_id}) clicked`)
      this.$router.push({ path: `/cnote/${cnote_id}` })
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
.card {
  background-color: $card-bg-color;
  border: 1px solid $grey-4;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: $card-bg-color-hover;
  }
  .card_title_wrap {
    .card_title {
      color: $grey-9;
    }
    .btn_like_wrap {
      min-width: 68px !important;
      position: relative;
      left: 14px;
    }
    .btn_bookmark_wrap {
      position: relative;
      left: 7px;
      top: 1px;
    }
  }
  .card_image {
    border-radius: 4px;
  }
  .card_bottom {
    padding: 4px 16px 8px 16px;
  }
  .absolute-full {
    background: rgba(69, 69, 69, 0.15);
    color: transparent;
  }
}
</style>
