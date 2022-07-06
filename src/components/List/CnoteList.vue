<template>
  <div class="cnote_list">
    <!-- 정렬 -->
    <div class="constrain_md">
      <div class="q-mt-sm q-mt-md">
        <div class="row justify-end items-center">
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
    <!-- 커핑 노트 -->
    <div class="page_title text-h4 text-center q-mb-md">커핑노트</div>
    <p></p>
    <section class="cnote_section row justify-between align-start q-pa-md">
      <!-- style="max-height: 248px; overflow: auto" -->
      <div class="cards_container">
        <div
          class="cards_wrap q-mb-sm"
          v-for="cnote in cnotes"
          :key="cnote.cnote_id"
        >
          <card-cnote-li :cnote="cnote" class="card" />
        </div>
        <inf-scroll @entry="loadCnotes" ref="infScroll" />
      </div>
      <div class="side_wrap bg-white">
        <div>추천작가</div>
        <ul class="rec_user_wrap">
          <li>Marilyn</li>
          <li>뚱땅</li>
          <li>무</li>
        </ul>
      </div>
    </section>
    <!-- /커핑 노트 -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ModalSearch from 'src/components/Modal/ModalSearch.vue'
import CardCnoteLi from 'src/components/Card/CardCnoteLi.vue'
import InfScroll from '../Scroll/InfScroll.vue'

export default defineComponent({
  name: 'CnoteList',
  components: {
    ModalSearch,
    CardCnoteLi,
    InfScroll
  },
  data() {
    return {
      sort: null,
      cnotes: [],
      page: 0,
      limit: 10,
      end: false
    }
  },
  created() {
    this.loadCnotes()
  },
  methods: {
    loadCnotes() {
      console.log('loadCnotes')
      this.page++

      let apiUrl = `${process.env.API_LOCAL}/cnote?_page=${this.page}&_limit=${this.limit}` // json-server
      // let apiUrl = `${process.env.API}/cnote` // real-server
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
    }
  }
})
</script>
<style lang="scss" scoped>
.page_title {
  width: 700px;
}
.cards_container {
  width: 700px;
  .card_wrap {
    border-radius: $border-radius;
  }
}
.side_wrap {
  border-radius: $border-radius;
  box-shadow: 0 1px 5px rgb(0 0 0 / 8%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%) !important;
  width: 200px;
  height: 100%;
}
</style>
