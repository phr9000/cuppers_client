<template>
  <!-- Card, 카페 추천리스트 -->
  <q-card class="card_cafe_main overflow-hidden">
    <btn-icon
      @click="close"
      :flat="true"
      color="grey-9"
      class="btn_close"
      icon="close"
    />
    <q-img class="border-rad" :ratio="16 / 9" :src="imgUrl" />

    <q-card-section class="title_wrap">
      <!-- 위치 아이콘 및 거리 -->
      <!-- <div class="location absolute column items-center" style="">
        <div class="q-mt-xs text-grey text-caption">
          <q-icon name="place" /> {{ distance }}
        </div>
      </div> -->
      <div class="text-left text-h6">
        {{ title }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="caption text-caption text-grey overflow-hidden">
        {{ caption }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import BtnIcon from 'src/components/Button/BtnIcon.vue'

export default defineComponent({
  name: 'CardCafeMap',
  components: {
    BtnIcon
  },
  props: {
    cafeId: {
      type: Number,
      default: -1
    },
    imgUrl: {
      type: String,
      default: 'https://cdn.quasar.dev/img/parallax2.jpg'
    },
    title: { type: String, default: '커퍼즈커피 본점' },
    distance: { type: String, default: '4.7km' },
    caption: {
      type: String,
      default:
        '커피즈커피는 커피를 매개로 만나는 사람들의 미각적 행복과 기술적 진보를 위해 노력합니다. 커피리브레는 커피를 매개로 만나는 사람들의 미각적 행복과 기술적 진보를 위해 노력합니다.'
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClickCard() {
      // 해당 카페의 상세 페이지로 이동
      console.log('card clicked. cafe_id: ', this.cafeId)
    },
    clickClose() {
      console.log('close clicked.')
      this.$emit('close')
    }
  }
})
</script>

<style lang="scss" scoped>
.card_cafe_main {
  width: 100%;
  max-width: 500px;

  .title_wrap {
    padding-right: 70px;
    @media (max-width: 962px) {
      padding-right: 65px;
    }
    @media (max-width: 722px) {
      padding-right: 65px;
    }
  }

  .btn_close {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    border-radius: 50%;
    transform: scale(1.2);
  }

  .location {
    top: -28px;
    right: 12px;
    @media (max-width: 962px) {
      top: -21px;
    }
  }
  .caption {
    height: 60px;
  }
  .text-h6 {
    @media (max-width: 962px) {
      font-size: 1rem;
    }
  }
}
</style>
