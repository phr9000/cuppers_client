<template>
  <q-page class="page">
    <!-- 정렬 -->
    <div class="constrain_md">
      <div class="q-mt-sm q-px-md">
        <div class="page_title">커핑노트</div>
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
      class="cnote_main constrain_md row justify-between align-start q-pa-md"
    >
      <div class="main_list" style="margin: 0">
        <cnote-list :cnotes="cnotes" />
        <inf-scroll @entry="loadCnotes" ref="infScroll" />
      </div>
      <div class="main_aside">
        <aside v-if="recWriters" class="aside bg-white">
          <div class="title_writers">추천작가</div>
          <ul class="rec_user_wrap">
            <writer-li
              v-for="writer in recWriters"
              :key="writer.user_id"
              :writer="writer"
            />
          </ul>
        </aside>
      </div>
    </main>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import CnoteList from 'src/components/List/CnoteList.vue'
import WriterLi from 'src/components/ListItem/WriterLi.vue'
import TabSort from 'src/components/Tab/TabSort.vue'
import SearchToggle from 'src/components/Input/SearchToggle.vue'
import InfScroll from 'src/components/Scroll/InfScroll.vue'

export default defineComponent({
  name: 'CnoteMainPage',
  components: {
    CnoteList,
    WriterLi,
    TabSort,
    SearchToggle,
    InfScroll
  },
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
      recWriters: null,
      cnotes: [],
      sort: null,
      page: 0,
      limit: 10,
      order: 'recent', // 'recent' or 'like'
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
        }
      ]
    }
  },
  mounted() {
    this.loadCnotes()
    this.loadRecWriters()
  },
  methods: {
    loadCnotes() {
      this.page++

      let apiUrl = `${process.env.API}/cnote?page=${this.page}&limit=${this.limit}&order=${this.order}&search=${this.search}`
      if (this.user) {
        apiUrl = `${apiUrl}&user_id=${this.user.uid}`
      }
      this.$axios
        .get(apiUrl)
        .then((result) => {
          if (result.data.length < 1) {
            this.$refs.infScroll.stop()
            return
          }
          result.data.forEach((item) => {
            this.cnotes.push(item)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleSearch(search) {
      // initList
      this.cnotes = []
      this.page = 0
      this.search = search

      this.loadCnotes()
    },
    changeSort(val) {
      console.log('chagne sort to: ', val)
      this.order = val

      this.cnotes = []
      this.page = 0
      this.end = false
      this.loadCnotes()
    },
    loadRecWriters() {
      // let apiUrl = `${process.env.API_LOCAL}/recUsers` // json-server
      let apiUrl = `${process.env.API}/cnote/writer/liked` // real-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log(result)
          if (result.statusText === 'OK') {
            this.recWriters = result.data
          }
          console.log(this.recWriters)
        })
        .catch((err) => {
          console.log(err)
        })
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
  .cnote_main {
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 216px;
    align-content: start;
    // padding: 0 12px;
    @media (max-width: $breakpoint-sm-max) {
      display: block;
      margin: 0;
      padding-right: 16px;
    }
  }
  .main_list {
    padding-left: 16px;
  }

  .main_aside {
    justify-self: end;
    width: 204px;
    padding-right: 16px;
    @media (max-width: $breakpoint-sm-max) {
      margin: 0 auto;
      // text-align: center;
      // width: 500px;
    }
    .aside {
      border-radius: $border-radius;
      box-shadow: 0 1px 5px rgb(0 0 0 / 8%), 0 2px 2px rgb(0 0 0 / 14%),
        0 3px 1px -2px rgb(0 0 0 / 12%) !important;

      @media (max-width: $breakpoint-sm-max) {
        margin-bottom: 50px;
        // text-align: center;
        // width: 500px;
      }

      // @media (max-width: $breakpoint-sm-max) {
      //   margin: 0;
      //   width: 500px;
      // }
      // height: 100%;
      padding-bottom: 8px;
      .title_writers {
        font-size: 12px;
        padding: 10px 10px 2px 10px;
        color: $grey-7;
      }
    }
  }
}
</style>
