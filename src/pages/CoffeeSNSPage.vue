<template>
  <q-page>
    <div>
      <q-splitter v-model="splitterModel" style="">
        <template v-slot:before>
          <q-tabs v-model="tab" inline-label vertical class="text-teal q-py-lg">
            <q-tab name="cnote" icon="mail" label="커핑노트" class="q-my-sm" />
            <q-tab name="review" icon="alarm" label="리뷰" />
          </q-tabs>
        </template>

        <template v-slot:after>
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

          <q-tab-panels v-model="tab" vertical>
            <q-tab-panel name="cnote" class="constrain_md">
              <div class="page_title text-h4 text-center q-mb-md">커핑노트</div>
              <p></p>

              <!-- 커핑 노트 -->
              <section
                class="cnote_section row justify-between align-start q-pa-md bg-grey-2"
              >
                <div class="cards_container">
                  <div
                    class="cards_wrap"
                    v-for="cnote in cnotes"
                    :key="cnote.cnote_id"
                  >
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
            </q-tab-panel>

            <q-tab-panel name="review" class="constrain_md">
              <div class="text-h4 text-center q-mb-md">리뷰</div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import CardCnoteLi from 'src/components/Card/CardCnoteLi.vue'
import ModalSearch from 'src/components/Modal/ModalSearch.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoffeeSNSPage',
  components: { ModalSearch, CardCnoteLi },
  data() {
    return {
      title: 'coffee sns page',
      tab: 'cnote',
      splitterModel: 20,
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
