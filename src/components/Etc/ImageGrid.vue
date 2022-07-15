<template>
  <div v-if="images.length > 0" class="image_grid_wrap">
    <!-- 1-->
    <div v-if="images.length == 1" class="image_grid">
      <q-img class="col img_1" ratio="1" :src="images[0].cafe_image_url" />
    </div>
    <!-- 2 -->
    <div v-if="images.length == 2" class="image_grid row">
      <div class="col">
        <q-img class="col img_1" ratio="1" :src="images[0].cafe_image_url" />
      </div>
      <div class="col q-ml-sm">
        <q-img class="col img_1" ratio="1" :src="images[1].cafe_image_url" />
      </div>
    </div>
    <!-- 3 -->
    <div v-if="images.length == 3" class="image_grid row">
      <div class="col">
        <q-img class="col img_1" ratio="1" :src="images[0].cafe_image_url" />
      </div>
      <div class="col q-ml-sm">
        <q-img class="img_3" :ratio="2 / 1" :src="images[1].cafe_image_url" />
        <q-img
          class="img_3 q-mt-sm"
          :ratio="2 / 1"
          :src="images[2].cafe_image_url"
        />
      </div>
    </div>
    <!-- 4 -->
    <div v-if="images.length == 4" class="image_grid row">
      <div class="col">
        <q-img class="col img_1" ratio="1" :src="images[0].cafe_image_url" />
      </div>
      <div class="col q-ml-sm">
        <q-img class="img_3" :ratio="2 / 1" :src="images[1].cafe_image_url" />
        <div class="row justify-between no-wrap">
          <q-img
            class="img_4 q-mt-sm q-mr-sm"
            :ratio="1"
            :src="images[2].cafe_image_url"
          />
          <q-img
            class="img_4 q-mt-sm"
            :ratio="1"
            :src="images[3].cafe_image_url"
          />
        </div>
      </div>
    </div>
    <!-- 5 -->
    <div v-if="images.length == 5" class="image_grid row">
      <div class="col">
        <q-img class="col img_1" ratio="1" :src="images[0].cafe_image_url" />
      </div>
      <div class="col q-ml-sm">
        <div class="row justify-between no-wrap">
          <q-img
            class="img_4 q-mr-sm"
            :ratio="1"
            :src="images[1].cafe_image_url"
          />
          <q-img class="img_4" :ratio="1" :src="images[2].cafe_image_url" />
        </div>
        <div class="row justify-between no-wrap">
          <q-img
            class="img_4 q-mt-sm q-mr-sm"
            :ratio="1"
            :src="images[3].cafe_image_url"
          />
          <q-img
            class="img_4 q-mt-sm"
            :ratio="1"
            :src="images[4].cafe_image_url"
          />
        </div>
      </div>
    </div>

    <!-- 사진 모두 보기 -->
    <btn-basic
      class="btn_show_all bg-grey-2"
      :rounded="false"
      icon="dashboard"
      color="grey-9"
      label="사진 모두 보기"
      padding="3px 8px "
    />
  </div>
</template>
<script>
import BtnBasic from 'src/components/Button/BtnBasic.vue'

export default {
  name: 'ImageGrid',
  components: { BtnBasic },
  props: {
    images: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            cafe_image_url:
              'https://i.picsum.photos/id/665/800/400.jpg?hmac=xBBSVZk-QQKzSBwMPZFuUB1qHQUUUdY-yj07SqeErXA'
          },
          {
            id: 2,
            cafe_image_url:
              'https://i.picsum.photos/id/494/500/500.jpg?hmac=8aIJmZKMhyh9DfX0RscKrxfxRhyDKHvOnQ_pgMkJ6ZM'
          },
          {
            id: 3,
            cafe_image_url:
              'https://i.picsum.photos/id/756/500/500.jpg?hmac=rZynM_D3hiy3CIW1AZZNAr6m3jBex9SM1bFvp5mKPso'
          },
          {
            id: 4,
            cafe_image_url:
              'https://i.picsum.photos/id/385/500/500.jpg?hmac=pT0ThioZsCmxd0zsVbCnveh0RNWI6uuH1MdOU_w1Wmw'
          },
          {
            id: 5,
            cafe_image_url:
              'https://i.picsum.photos/id/816/500/500.jpg?hmac=Mm5UFwEiRKNt_afeZgiP-32k0ybnIMniitzcSJKFxaM'
          }
        ]
      }
    }
  }
}
</script>
<style scoped lang="scss">
.image_grid_wrap {
  position: relative;
  .image_grid {
    border-radius: $border-radius-md;
    overflow: hidden;
    width: 100%;
    height: 400px;
    @media (max-width: 749px) {
      height: 300px;
    }
    .img_1 {
      height: 400px;
      @media (max-width: 749px) {
        height: 300px;
      }
    }
    .img_3 {
      height: 196px;
      @media (max-width: 749px) {
        height: 146px;
      }
    }
    .img_4 {
      width: 50%;
      height: 196px;
      @media (max-width: 749px) {
        height: 146px;
      }
    }
  }
  .btn_show_all {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
}
</style>
