<template>
  <q-card v-if="cnote" @click="handleCLickCnoteCard" class="card" flat bordered>
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
            :is_liked="cnote.user_liked"
            :likeit_cnt="cnote.like_cnt"
          />
        </div>
        <div class="btn_bookmark_wrap">
          <btn-book-mark
            :user_id="cnote.user_id"
            :cnote_id="cnote.cnote_id"
            :is_marked="cnote.user_marked"
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
    <q-card-section class="card_bottom row justify-between items-center q-mb-m"
      ><div class="user_info row items-center">
        <btn-avatar :url="cnote.user_thumbnail" />
        <div class="q-ml-sm user_name">{{ cnote.user_name }}</div>
      </div>

      <div class="text-grey">{{ createDate }}</div>
    </q-card-section>
  </q-card>
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
        return null
      }
    }
  },
  computed: {
    createDate() {
      let time = toDate(Date.parse(this.cnote.created_at))
      return format(time, 'MMM dd. yyyy')
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
      left: 16px;
      top: -1px;
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
