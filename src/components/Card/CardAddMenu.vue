<template>
  <div class="q-px-xl q-mx-lg q-my-lg q-py-md bg-white addcard">
    <q-section class="row flex justify-between">
      <q-icon size="sm" name="clear" />
    </q-section>
    <q-section class="row flex justify-between">
      <q-input type="text" label="메뉴이름" class="col-8" />
      <div class="col-2 row justify-evenly align-center">
        <q-checkbox size="20px"
          ><span class="q-px-md">Signature</span></q-checkbox
        >
      </div>
    </q-section>
    <q-section class="row flex justify-between align-item">
      <q-input v-model="model" :options="options" label="Hot" class="col-5" />
      <q-input :options="options" label="Ice" class="col-5" />
    </q-section>
    <q-section>
      <div>
        <q-input type="text" label="Aromanote" />
      </div>
    </q-section>
  </div>
</template>
<script>
export default {
  name: 'CardAddMenu',

  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.addcard {
  border: 1px solid #ccc;
  box-sizing: content-box;
  border-radius: 10px;
}
</style>
