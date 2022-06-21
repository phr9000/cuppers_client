<template>
  <div class="q-px-xl q-mx-lg q-my-lg q-py-md bg-white addcard">
    <div class="row flex justify-end">
      <btn-icon @click="deleteCard" size="xs" icon="close" color="red" />
    </div>
    <div class="row flex justify-between">
      <q-input type="text" label="메뉴이름" class="col-8" />
      <div class="col-2 row justify-evenly align-center">
        <q-checkbox checked-icon="swipe_right" size="20px"
          ><span class="q-px-md">Signature</span></q-checkbox
        >
      </div>
    </div>
    <div class="row flex justify-between align-item">
      <q-input label="Hot" class="col-5" />
      <q-input label="Ice" class="col-5" />
    </div>
  </div>
</template>
<script>
import BtnIcon from '../Button/BtnIcon.vue'
export default {
  name: 'CardAddVariation',
  components: {
    BtnIcon
  },
  methods: {
    deleteCard() {
      this.$emit('deleteCard')
    }
  }
}
</script>
<style lang="scss" scoped>
.addcard {
  border: 1px solid #ccc;
  box-sizing: content-box;
  border-radius: 10px;
  .clear {
    border: 1px solid $red;
    box-sizing: content-box;
    border-radius: 50%;
  }
  .clear:hover {
    cursor: pointer;
  }
}
</style>
