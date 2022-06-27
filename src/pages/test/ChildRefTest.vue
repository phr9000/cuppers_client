<template>
  <div>
    <q-btn @click="changeVal" label="change Value" />
    <child :menu_id="1" :menu_type="1" ref="child" />

    <q-separator class="q-my-xl"></q-separator>

    <q-btn @click="changeArrayVal" label="change Array Value" />
    <child v-for="arr in array" :key="arr.id" ref="childOfArray" />
  </div>
</template>
<script>
import Child from 'src/pages/test/child/ChildComp.vue'
export default {
  name: 'ChildRefTest',
  components: {
    Child
  },
  data() {
    return {
      array: [
        {
          id: 0
        },
        {
          id: 1
        }
      ]
    }
  },
  methods: {
    changeVal() {
      this.$refs.child.changeVal()
    },
    changeArrayVal() {
      for (let i = 0; i < this.array.length; i++) {
        this.$refs.childOfArray[i].changeVal()
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
