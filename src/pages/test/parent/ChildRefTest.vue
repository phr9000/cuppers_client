<template>
  <div>
    <q-btn @click="changeVal" label="change Value" />
    <child :menu_id="1" :menu_type="1" ref="child" />

    <q-separator class="q-my-xl"></q-separator>

    <q-btn @click="changeArrayVal" label="change Array Value" />
    <child v-for="arr in array" :key="arr.id" ref="childOfArray" />
  </div>

  <q-btn @click="changeData" label="Add Array Value" />
  <child-input v-for="(arr, index) in array" :key="index.id" ref="ChildInput" />
</template>
<script>
import Child from 'src/pages/test/child/ChildComp.vue'
import ChildInput from 'src/pages/test/child/ChildInput.vue'
export default {
  name: 'ChildRefTest',
  components: {
    Child,
    ChildInput
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
    },
    changeData() {
      for (let i = 0; i < this.array.length; i++) {
        let value = (this.$refs.ChildInput[this.array.length - 1].$data.val =
          'Hi')
        console.log(value)
      }
    }
    // addInput() {
    //   for (let i = 1; i < this.array.length; i++) {
    //     let newEl = this.$refs.ChildInput[this.array.length - 1].getVal()
    //     return this.array.push(newEl)
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped></style>
