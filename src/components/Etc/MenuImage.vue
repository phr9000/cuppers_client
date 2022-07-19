<template>
  <!-- 메뉴판 이미지 -->
  <div class="menu_image_wrap" :class="{ left: lr === 'left' }">
    <q-img class="menu_image" width="100%" height="130px" :src="calUrl">
      <div
        class="rounded-borders absolute-full text-subtitle2 flex flex-center"
      >
        크게 보기
      </div></q-img
    >
  </div>
</template>

<script>
export default {
  name: 'MenuImage',
  components: {},
  props: {
    url: {
      type: String,
      default: 'images/avatar/1/thumb.jpg'
    },
    lr: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    calUrl() {
      if (this.url.startsWith('images/')) {
        return `${process.env.STATIC}/${this.url}`
      }
      return this.url
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
    margin: 0 22px 16px 22px;
  }
  .menu_image {
    border-radius: 4px;
  }
  &.left {
    margin: 0 0px 8px 0px;
    @media (max-width: $breakpoint-xs-max) {
      align-items: start;
      padding-top: 0;
      margin: 0 8px 8px 0px;
    }
  }
}
.absolute-full {
  cursor: pointer;
  background: rgba(69, 69, 69, 0.15);
  transition: all 0.5s;
  color: transparent;
  &:hover {
    background: rgba(0, 0, 0, 0.35);
    color: $grey-4;
  }
}
</style>
