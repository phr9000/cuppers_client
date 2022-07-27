<template>
  <div>
    <q-item-label
      @click="openNewMylistInput = !openNewMylistInput"
      header
      class="create_new_mylist row items-center"
    >
      <q-icon color="primary" size="sm" name="add_circle_outline" />
      <div class="text">새 리스트</div>
    </q-item-label>
    <q-item v-if="openNewMylistInput" header class="row items-center">
      <q-input
        @keyup.enter="createMylist"
        class="create_new_mylist_input"
        outlined
        bottom-slots
        v-model="newMylistTitle"
        counter
        maxlength="20"
        dense
        color="secondary"
        placeholder="생성할 리스트명을 입력해주세요"
      >
        <template v-slot:append>
          <q-btn
            @click="createMylist"
            color="secondary"
            round
            dense
            flat
            icon="add_circle_outline"
          />
        </template>
      </q-input>
    </q-item>

    <!-- 마이 리스트 아이템 만큼 li 표시 -->
    <q-list bordered separator>
      <!-- 좋아요한 카페 -->
      <q-item
        @click="clickLike"
        clickable
        v-ripple
        style="background-color: #fff9f9"
      >
        <q-item-section avatar>
          <q-icon color="red-4" name="favorite" />
        </q-item-section>

        <q-item-section class="text-primary">좋아요한 카페</q-item-section>
      </q-item>

      <!-- 가본곳 -->
      <q-item
        @click="clickBeenthere"
        clickable
        v-ripple
        style="background-color: #faffff"
      >
        <q-item-section avatar>
          <q-icon color="teal-4" name="beenhere" />
        </q-item-section>

        <q-item-section class="text-primary">가본곳</q-item-section>
      </q-item>

      <q-item
        @click="clickMylistItem(item)"
        v-for="item in mylist_items"
        :key="item.mylist_id"
        clickable
        v-ripple
        style="background-color: #f9f9f9"
      >
        <q-item-section avatar>
          <q-icon color="primary" name="storefront" />
        </q-item-section>

        <q-item-section class="text-primary">{{
          item.mylist_name
        }}</q-item-section>
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
  data() {
    return {
      openNewMylistInput: false,
      newMylistTitle: ''
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
    },
    createMylist() {
      const title = this.newMylistTitle
      this.newMylistTitle = ''
      this.$emit('create_mylist', title)
      this.openNewMylistInput = false
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
.create_new_mylist_input {
  width: 100%;
}
</style>
