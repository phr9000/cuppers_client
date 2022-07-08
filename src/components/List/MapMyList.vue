<template>
  <div>
    <q-item-label header> 마이리스트 </q-item-label>
    <q-list bordered>
      <q-item
        @click="clickItem(item)"
        v-for="item in items"
        :key="item.mylist_id"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>

        <q-item-section>{{ item.mylist_name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'MapMyList',
  components: {
    // BtnBasic
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  methods: {
    clickItem(item) {
      // console.log(mylist_id)
      this.$emit('click_item', item)
    }
  }
}
</script>

<style></style>
