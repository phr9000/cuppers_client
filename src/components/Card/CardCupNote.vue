<template>
  <q-card v-if="cnote" @click="handleCLickCnoteCard" class="card" flat bordered>
    <q-card-section
      class="card_title_wrap row no-wrap items-start justify-between q-pb-sm"
    >
      <div class="text-h5 card_title q-mb-xs q-mr-xs">
        {{ cnote.cnote_title }}
      </div>
      <div class="btns_wrap row no-wrap">
        <div class="btn_like_wrap">
          <btn-like
            :id_what="cnote.cnote_id"
            like_what="cnote"
            :is_liked="cnote.user_liked"
            :likeit_cnt="cnote.like_cnt"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="card_inner q-py-none">
      <div class="inner_left q-py-none q-pr-md">
        <div class="caption text-caption">
          {{ delHtmlContent }}
        </div>
      </div>
      <div class="inner_right">
        <q-img class="thumbnail" :ratio="1" :src="cnote.cnote_img"> </q-img>
      </div>
    </q-card-section>
    <q-card-section
      class="card_bottom row justify-between items-center q-pt-none"
      ><div class="user_info row items-center">
        <btn-avatar :url="cnote.user_thumbnail_url" />
        <div class="q-ml-sm user_name text-grey-6">
          {{ cnote.user_nickname }}
        </div>
      </div>

      <div class="text-grey">{{ dateago }}</div>
    </q-card-section>
  </q-card>
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
        return null
      }
    }
  },
  computed: {
    delHtmlContent() {
      return this.cnote.cnote_content.replace(/<[^>]*>?/g, '')
    },
    dateago() {
      try {
        if (this.cnote.created_at) {
          const created_parse = Date.parse(this.cnote.created_at)
          // console.log(created_parse) // 1656678895000
          const current_parse = Date.parse(new Date())
          // console.log(current_parse) // 1656920503000

          // 현재시간과차이 (분)
          const diff = (current_parse - created_parse) / 60000

          // 작성시간이 현시간 기준 1시간 미만
          if (diff < 60) {
            if (diff < 1) {
              return '조금전'
            }
            // X 분전
            return parseInt(diff) + '분전'
          } else if (diff < 1440) {
            return parseInt(diff / 60) + '시간전'
          } else {
            // 하루이상 지난 게시글은 날짜로 표시
            let time = toDate(created_parse)
            return format(time, 'MMM dd. yyyy')
          }
        }
      } catch {
        return '알수없음'
      }
      return '알수없음'
    }
  },
  methods: {
    handleCLickCnoteCard() {
      const cnote_id = this.cnote.cnote_id
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
      position: relative;
      top: -1px;
      left: 4px;
    }
    // .btn_bookmark_wrap {
    //   position: relative;
    //   left: 7px;
    //   top: 1px;
    // }
  }

  .card_inner {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 120px;

    .caption {
      color: $grey-8;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
    .thumbnail {
      border-radius: $border-radius;
      min-width: 100px;
      min-height: 100px;
    }
  }

  .card_bottom {
    padding: 0px 16px 8px 16px;
  }
  .absolute-full {
    background: rgba(69, 69, 69, 0.15);
    color: transparent;
  }
}
</style>
