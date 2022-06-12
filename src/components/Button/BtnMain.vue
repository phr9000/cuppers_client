<template>
  <q-btn
    @click="handleClick"
    class="keyword flex flex-center no-border-radius"
    flat
    color="primary"
  >
    <div class="text-body2 text-weight-medium" v-html="word"></div>
  </q-btn>
</template>

<script>
export default {
  name: 'BtnMain',
  props: {
    id: { type: Number, required: true },
    keyword: {
      type: String,
      default: '키워드 기본값'
    }
  },
  computed: {
    word() {
      return this.keyword.replace('\n', '<br />')
    }
  },
  methods: {
    handleClick() {
      console.log(`keword id ${this.id} clicked`)
    }
  }
}
</script>
<style lang="scss" scoped>
.keyword {
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  line-height: 18px;
  width: 114px;
  height: 114px;
  word-break: keep-all;
}
</style>
