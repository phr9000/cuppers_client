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
            <!-- 커핑노트 검색 -->
            <search-toggle placeholder="커핑노트 검색" @search="handleSearch" />

            <!-- 정렬 : 추천순 / 최신순 -->
            <tab-sort
              :sort_items="sortItems"
              @change="changeSort"
              style="height: 40px"
            />
          </q-tabs>
        </div>
      </div>
    </div>

    <!-- main -->
    <main
      class="review_main q-gutter-md constrain_md row justify-between align-start q-pa-md"
    >
      <div style="margin: 0">
        <!-- {{ reviews }} -->
        <review-list :reviews="reviews" />
        <inf-scroll @entry="loadReviews" ref="infScroll" />
      </div>
    </main>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import ReviewList from 'src/components/List/ReviewList.vue'
import TabSort from 'src/components/Tab/TabSort.vue'
import SearchToggle from 'src/components/Input/SearchToggle.vue'
import InfScroll from 'src/components/Scroll/InfScroll.vue'

export default defineComponent({
  name: 'ReviewMainPage',
  components: { ReviewList, TabSort, SearchToggle, InfScroll },
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user
    })

    const locState = computed({
      get: () => $store.state.map.loc
    })

    return {
      user,
      locState
    }
  },
  data() {
    return {
      reviews: [],
      sort: 'recent', // 'recent' or 'like' or 'dist'
      page: 0,
      limit: 10,
      order: 'd',
      search: '',
      end: false, // inf scroll end
      sortItems: [
        {
          label: '추천순',
          val: 'like'
        },
        {
          label: '최신순',
          val: 'recent'
        },
        { label: '거리순', val: 'dist' }
      ]
    }
  },
  mounted() {
    this.loadReviews()
  },
  methods: {
    loadReviews() {
      this.page++
      const ORDER = this.sort === 'dist' ? 'a' : 'd'

      let apiUrl = `${process.env.API}/review/?page=${this.page}&limit=${this.limit}&search=${this.search}&sort=${this.sort}&order=${ORDER}`
      if (this.user) {
        apiUrl = `${apiUrl}&user_id=${this.user.uid}`
      }
      if (this.locState) {
        apiUrl = `${apiUrl}&current_lat=${this.locState.lat}&current_long=${this.locState.lng}`
      }

      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log(apiUrl)
          console.log(result.data)
          if (result.data.arr.length < 1) {
            this.$refs.infScroll.stop()
            return
          }
          result.data.arr.forEach((item) => {
            this.reviews.push(item)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleSearch(search) {
      // initList
      this.reviews = []
      this.page = 0
      this.search = search
      this.end = false

      this.loadReviews()
    },
    changeSort(val) {
      console.log('chagne sort to: ', val)
      this.sort = val

      this.reviews = []
      this.page = 0
      this.end = false
      this.loadReviews()
    }
  }
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
    // padding: 0 12px;
    @media (max-width: $breakpoint-sm-max) {
      display: block;
      margin: 0;
      padding: 0 16px;
    }
  }
}
</style>
