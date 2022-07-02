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
            <q-tab
              v-if="tab === 'review'"
              class="btn_sort"
              name="distance"
              label="거리순"
            />
          </q-tabs>
        </div>
      </div>
    </div>
    <!-- 커핑 노트 -->
    <div class="page_title text-h4 text-center q-mb-md">커핑노트</div>
    <p></p>
    <section class="cnote_section row justify-between align-start q-pa-md">
      <div class="cards_container">
        <div class="cards_wrap" v-for="cnote in cnotes" :key="cnote.cnote_id">
          <card-cnote-li :cnote="cnote" />
        </div>
      </div>
      <div class="side_wrap bg-white">
        <div>추천작가</div>
        <ul class="rec_user_wrap">
          <li>Marilyn</li>
          <li>뚱땅</li>
          <li>무</li>
        </ul>
      </div>

      <!-- <infinite-scroll /> -->
    </section>
    <!-- /커핑 노트 -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ModalSearch from 'src/components/Modal/ModalSearch.vue'
import CardCnoteLi from 'src/components/Card/CardCnoteLi.vue'

export default defineComponent({
  name: 'CnoteList',
  components: { ModalSearch, CardCnoteLi },
  data() {
    return {
      sort: null,
      cnotes: []
    }
  },
  created() {
    this.loadCnotes(1)
  },
  methods: {
    loadCnotes(page) {
      console.log('loadCnotes')
      let apiUrl = `${process.env.API_LOCAL}/cnote?_page=${page}&_limit=4` // json-server
      // let apiUrl = `${process.env.API}/cnote` // real-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cnotes = result.data
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
.cards_wrap {
  width: 700px;
}
.side_wrap {
  width: 200px;
  height: 100%;
}
</style>
