<template>
  <div>
    <q-item-label header class="create_new_mylist row items-center">
      <q-icon color="primary" size="sm" name="add_circle_outline" />
      <div class="text">새 리스트</div>
    </q-item-label>

    <!-- 마이 리스트 아이템 만큼 li 표시 -->
    <q-list bordered separator>
      <q-item @click="clickLike" clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="favorite" />
        </q-item-section>

        <q-item-section>좋아요한 카페</q-item-section>
      </q-item>
      <q-item @click="clickBeenthere" clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="beenhere" />
        </q-item-section>

        <q-item-section>가본 카페</q-item-section>
      </q-item>

      <q-item
        @click="clickMylistItem(item)"
        v-for="item in mylist_items"
        :key="item.mylist_id"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon color="primary" name="storefront" />
        </q-item-section>

        <q-item-section>{{ item.mylist_name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'MapMyList',
  components: {},
  props: {
    mylist_items: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  methods: {
    clickLike() {
      this.$emit('click_like')
    },
    clickBeenthere() {
      this.$emit('click_beenthere')
    },
    clickMylistItem(item) {
      console.log(item)
      this.$emit('click_item', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.create_new_mylist {
  cursor: pointer;
  border-bottom: 1px solid $grey-4;
  &:hover {
    background-color: $cyan-1;
  }

  .text {
    font-size: 0.9rem;
    padding-left: 10px;
    // top: 1px;
  }
}
</style>
