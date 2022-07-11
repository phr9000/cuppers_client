<template>
  <div>
    <q-btn @click="addInput" label="add Input" />
    <child-input
      v-for="item in inputs"
      :key="item.id"
      :id="item.id"
      :type="item.type"
      ref="childOfInputs"
      @delVal="delVal"
    />
    <q-btn @click="getAllInputValues" label="get all Input Values" />
  </div>
</template>
<script>
import ChildInput from 'src/pages/test/child/ChildInput.vue'
export default {
  name: 'InputRefTest',
  components: {
    ChildInput
  },
  data() {
    return {
      inputs: [
        {
          id: 1,
          type: 1
        }
      ]
    }
  },
  methods: {
    addInput() {
      const id = this.inputs.length + 1
      const type = this.inputs.length + 1
      this.inputs.push({
        id: id,
        type: type
      })
      console.log(this.inputs)
    },
    getAllInputValues() {
      let all = []
      for (let i = 0; i < this.inputs.length; i++) {
        all.push(this.$refs.childOfInputs[i].getVal())
      }
      console.log('all: ', all)
    },
    delVal(id) {
      this.inputs = this.inputs.filter((input) => input.id !== id)
      console.log(this.inputs)
    }
  }
}
</script>
<style lang="scss" scoped></style>
