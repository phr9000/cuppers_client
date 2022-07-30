<template>
  <!-- Card, 카페 Main -->
  <q-card class="card_cafe_main" @click="handleClickCard">
    <q-img :ratio="16 / 9" :src="calUrl" />

    <q-card-section class="title_wrap">
      <!-- 위치 아이콘 및 거리 -->
      <div class="location absolute column items-center" style="">
        <q-btn
          @click="handleClickLocation"
          class="icon_place"
          color="primary"
          icon="place"
        />
        <div class="row items-center q-mt-xs text-grey text-caption">
          <q-icon name="place" />
          <div class="distance">{{ distance }}Km</div>
        </div>
      </div>
      <div class="text-left text-h6 cafe-title">
        {{ title }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="caption text-caption text-grey cafe-description">
        {{ caption }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardCafeMain',
  props: {
    cafe_id: {
      type: Number,
      default: -1
    },
    imgUrl: {
      type: String,
      default: 'images/cafe/0/cafe.jpg'
    },
    title: { type: String, default: '커퍼즈커피 본점' },
    distance: { type: String, default: '' },
    caption: {
      type: String,
      default:
        '커피즈커피는 커피를 매개로 만나는 사람들의 미각적 행복과 기술적 진보를 위해 노력합니다. 커피리브레는 커피를 매개로 만나는 사람들의 미각적 행복과 기술적 진보를 위해 노력합니다.'
    }
  },
  computed: {
    calUrl() {
      if (this.imgUrl.startsWith('images/')) {
        return `${process.env.STATIC}/${this.imgUrl}`
      }
      return this.imgUrl
    }
  },
  methods: {
    handleClickCard() {
      // 해당 카페의 상세 페이지로 이동
      console.log('card clicked. cafe_id: ', this.cafe_id)
      this.$router.push(`/cafe/${this.cafe_id}`)
    },
    handleClickLocation(event) {
      event.stopPropagation() // 버튼 클릭시 상위 클릭이벤트 호출 방지
      // 해당 카페를 지도에서 보기 (나중에 구현)
      console.log('location icon clicked. cafe_id: ', this.cafe_id)
    }
  }
})
</script>

<style lang="scss" scoped>
.card_cafe_main {
  max-width: 500px;
  cursor: pointer;
  overflow: hidden;

  .title_wrap {
    padding-right: 70px;
    @media (max-width: 962px) {
      padding-right: 65px;
    }
    @media (max-width: 722px) {
      padding-right: 65px;
    }
  }

  .location {
    top: -28px;
    right: 12px;
    @media (max-width: 962px) {
      top: -23px;
    }
    .icon_place {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      @media (max-width: 962px) {
        width: 42px;
        height: 42px;
      }
    }
  }
  .caption {
    height: 60px;
    &.cafe-description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .text-h6 {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 962px) {
      font-size: 1rem;
    }
  }
}
</style>
