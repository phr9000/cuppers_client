<template>
  <!-- 커핑노트 li -->
  <q-card
    v-if="cnote"
    @click="handleCardClick"
    flat
    class="card q-pa-md column overflow-hidden"
  >
    <q-card-section class="row q-pa-none">
      <div class="col-10">
        <div class="">
          <div class="row justify-between items-start q-mb-xs">
            <div class="row items-center">
              <div class="text_title text-left q-mr-sm">
                {{ cnote.cnote_title }} - {{ cnote.cnote_description }}
              </div>
            </div>
          </div>
          <div class="caption text-caption overflow-hidden">
            {{ cnote.cnote_content }}
          </div>
          <div class="info q-mb-xs">
            <div class="text-grey row items-center">
              <q-icon size="12" name="favorite_border" class="icon" />
              {{ cnote.like_cnt }}
              <div class="dot">‧</div>
              <div class="date">{{ dateago }}</div>
              <div class="dot">‧</div>
              <!-- <btn-avatar :url="cnote.user_thumbnail" /> -->
              <div class="user_name">{{ cnote.user_name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2 q-pl-md q-pt-xs">
        <!-- style="max-width: 280px; max-height: 320px" -->
        <q-img class="thumbnail" :ratio="1" :src="cnote.cnote_thumbnail" /></div
    ></q-card-section>
    <q-card-section class="q-pa-none"> </q-card-section>
  </q-card>
</template>

<script>
import { format, toDate } from 'date-fns'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardCafeSmall',
  components: {},
  props: {
    cnote: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    dateago() {
      try {
        if (this.cnote.created_at) {
          const created_parse = Date.parse(this.cnote.created_at)
          console.log(created_parse) // 1656678895000
          const current_parse = Date.parse(new Date())
          console.log(current_parse) // 1656678969000
          const diff = (current_parse - created_parse) / 60000
          console.log(diff) // 현재시간과차이 (분)

          if (diff < 60) {
            // 작성시간이 현시간 기준 1시간 미만
            if (diff < 1) {
              return 조금전
            }
            // X 분전
            return parseInt(diff) + '분전'
          } else {
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
  mounted() {},
  methods: {
    handleCardClick() {
      // 해당 카페 클릭 처리
      console.log('card clicked. cafe_id: ', this.cnote.cnote_id)
      this.$router.push(`/cnote/${this.cnote.cnote_id}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  min-width: 300px;
  border-bottom: 1px solid $grey-4;
  cursor: pointer;
  &:hover {
    background-color: $grey-2;
  }
  .text_title {
    font-size: 18px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .thumbnail {
    border-radius: $border-radius-md;
  }
  .caption {
    color: $grey-8;
    padding-left: 2px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .info {
    color: $grey-8;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding-top: 6px;
    position: relative;
    .icon {
      padding-right: 1px;
    }
    .date {
      font-size: 13px;
      padding-top: 1px;
    }
    .dot {
      font-size: 10px;
      padding: 0 4px;
    }
  }
}
</style>
