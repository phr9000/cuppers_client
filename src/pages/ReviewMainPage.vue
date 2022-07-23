<template>
  <q-page class="page">
    <div class="constrain_md">
      <div class="q-mt-sm q-px-md">
        <div class="page_title">리뷰</div>
        <div class="row justify-between items-center q-py-sm">
          <div></div>

          <q-tabs
            active-color="secondary"
            v-model="sort"
            dense
            class="text-grey-6"
          >
            <modal-search />
            <q-tab class="btn_sort" name="like" label="추천순" />
            <q-tab class="btn_sort" name="recent" label="최신순" />
          </q-tabs>
        </div>
      </div>
    </div>

    <main
      class="review_main q-gutter-md constrain_md row justify-between align-start q-pa-md"
    >
      <div style="margin: 0">
        <review-list />
      </div>
    </main>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import ModalSearch from 'src/components/Modal/ModalSearch.vue'
import ReviewList from 'src/components/List/ReviewList.vue'

export default defineComponent({
  name: 'ReviewMainPage',
  components: { ModalSearch, ReviewList },
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user
    })

    return {
      user
    }
  },
  data() {
    return {
      sort: null,
      page: 0,
      limit: 10,
      order: 'recent', // 'recent' or 'like'
      search: '커'
    }
  },
  mounted() {},
  methods: {}
})
</script>
<style lang="scss" scoped>
.page {
  min-height: calc(100vh - 51px);
  .page_title {
    color: $grey-9;
    font-size: 1.5rem;
    @media (max-width: $breakpoint-sm-max) {
      position: absolute;
      font-size: 1.2rem;
      left: 16px;
    }
  }
  .review_main {
    display: grid;
    grid-template-columns: 1fr 224px;
    // padding: 0 12px;
    @media (max-width: $breakpoint-sm-max) {
      display: block;
      margin: 0;
      padding: 0 16px;
    }
  }
}
</style>
