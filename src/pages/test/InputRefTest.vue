<template>
  <div>
    <q-btn @click="addInput" label="add Input" />
    <child-input
      v-for="item in inputs"
      :key="item.id"
      :id="item.id"
      ref="childOfInputs"
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
          id: 1
        }
      ]
    }
  },
  methods: {
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
      console.log('all: ', all)
    }
  }
}
</script>
<style lang="scss" scoped></style>
