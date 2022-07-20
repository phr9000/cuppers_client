<template>
  <!-- 메뉴판 이미지 -->
  <div class="column">
    <div class="row q-mb-xs">
      <q-icon size="xs" name="img:/icons/menu.png" class="q-mr-xs" />
      <div class="text_subtitle1">메뉴판 이미지</div>
    </div>
    <div class="menu_image_wrap">
      <q-img class="menu_image" width="100%" height="130px" :src="calUrl">
        <div
          class="rounded-borders absolute-full text-subtitle2 flex flex-center"
        >
          크게 보기
        </div></q-img
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselMenu',
  components: {},
  props: {
    url: {
      type: String,
      default: 'images/avatar/1/thumb.jpg'
    }
  },
  computed: {
    calUrl() {
      return `${process.env.STATIC}/${this.url}`
    }
  }
}
</script>

<style lang="scss" scoped>
.menu_image_wrap {
  padding-top: 0;
  align-items: end;
  margin: 0 0px 16px 22px;
  @media (max-width: $breakpoint-xs-max) {
    align-items: start;
    padding-top: 0;
    margin: 0 0 16px 0px;
  }
  .menu_image {
    border-radius: 4px;
  }
}
</style>
