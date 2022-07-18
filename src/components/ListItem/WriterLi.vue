<template>
  <!-- 유저 li -->
  <li>
    <div class="writer">
      <div class="row justify-center items-center">
        <btn-avatar :url="writer.user_thumbnail_url" />
      </div>
      <div class="column justify-center">
        <p class="nickname">{{ writer.user_nickname }}</p>
        <p class="cumulative">
          글 {{ writeCnt }}<span class="dot">‧</span>구독자
          {{ followerCnt }}
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import { defineComponent } from 'vue'
import useFormatter from 'src/composables/useFormatter'
const { formatNumber } = useFormatter()
import BtnAvatar from 'src/components/Button/BtnAvatar.vue'

export default defineComponent({
  name: 'WriterLi',
  components: { BtnAvatar },
  props: {
    writer: {
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
    writeCnt() {
      return formatNumber(this.writer.write_cnt, '#,###')
    },
    followerCnt() {
      return formatNumber(this.writer.follower_cnt, '#,###')
    }
  },
  mounted() {},
  methods: {
    handleClick() {
      // 해당 유저 클릭 처리
      // console.log('card clicked. cafe_id: ', this.cnote.cnote_id)
      // this.$router.push(`/cnote/${this.cnote.cnote_id}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.writer {
  min-width: 190px;
  cursor: pointer;
  &:hover {
    background-color: $grey-2;
  }
  display: grid;
  grid-template-columns: 60px 1fr;
  p {
    margin: 0;
    &.nickname {
      font-weight: 400;
      color: $grey-8;
    }
    &.cumulative {
      color: $grey-6;
      font-size: 12px;
      .dot {
        font-size: 2px;
        padding: 0;
      }
    }
  }
}
</style>
