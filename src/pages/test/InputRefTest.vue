<template>
  <div>
    <q-btn @click="changeVal" label="change Value" />
    <child :menu_id="1" :menu_type="1" ref="child" />

    <q-separator class="q-my-xl"></q-separator>

    <q-btn @click="changeArrayVal" label="change Array Value" />
    <child v-for="arr in array" :key="arr.id" ref="childOfArray" />

    <q-separator class="q-my-xl"></q-separator>

    <q-btn @click="addInput" label="add Input" />
    <child-input
      v-for="item in inputs"
      :key="item.id"
      :id="item.id"
      ref="childOfInputs"
    />

    <br />
    <q-btn @click="getAllInputValues" label="get all Input Values" />
    <q-separator class="q-my-xl"></q-separator>
  </div>
</template>
<script>
import Child from 'src/pages/test/child/ChildComp.vue'
import ChildInput from 'src/pages/test/child/ChildInput.vue'
export default {
  name: 'InputRefTest',
  components: {
    Child,
    ChildInput
  },
  data() {
    return {
      array: [
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      inputs: [
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
        // this.array.push()
      }
    },
    addInput() {
      const id = this.inputs.length + 1
      this.inputs.push({
        id: id
      })
    },
    getAllInputValues() {
      let all = []
      for (let i = 0; i < this.inputs.length; i++) {
        all.push(this.$refs.childOfInputs[i].getVal())
      }
      console.log(all)
    }
  }
}
</script>
<style lang="scss" scoped></style>
