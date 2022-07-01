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
              <div class="text-h4 text-center q-mb-md">커핑노트</div>
              <p></p>

              <!-- 커핑 노트 -->
              <section class="cnote_section q-pa-md">
                <div class="cards_container row justify-between">
                  <div
                    class="cards_wrap"
                    v-for="cnote in cnotes"
                    :key="cnote.cnote_id"
                  >
                    <card-cup-note :cnote="cnote" />
                  </div>
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
import CardCupNote from 'src/components/Card/CardCupNote.vue'
import ModalSearch from 'src/components/Modal/ModalSearch.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoffeeSNSPage',
  components: { ModalSearch, CardCupNote },
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
