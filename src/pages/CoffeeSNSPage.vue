<template>
  <q-page>
    <div>
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            inline-label
            vertical
            active-color="red-4"
            class="text-grey q-py-lg"
          >
            <div class="text-center">
              <btn-basic
                size="md"
                to="/cnote/write"
                color="grey"
                label="커핑노트 쓰기"
                icon="note_alt"
                padding="4px 15px 4px 15px"
              />
            </div>
            <q-tab
              name="cnote"
              icon="rate_review"
              label="커핑노트"
              class="q-my-sm"
            />
            <q-tab name="review" icon="reviews" label="리뷰" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels class="bg-grey-1" v-model="tab" vertical>
            <q-tab-panel name="cnote" class="constrain_md tab_panel">
              <cnote-list />
            </q-tab-panel>

            <q-tab-panel name="review" class="constrain_md tab_panel">
              <review-list />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>

    <btn-scroll-top />
  </q-page>
</template>

<script>
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import CnoteList from 'src/components/List/CnoteList.vue'
import ReviewList from 'src/components/List/ReviewList.vue'
import BtnScrollTop from 'src/components/Scroll/BtnScrollTop.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoffeeSNSPage',
  components: { BtnBasic, CnoteList, ReviewList, BtnScrollTop },
  data() {
    return {
      tab: 'cnote', // current tab
      splitterModel: 20 // before % of splitter
    }
  },
  created() {},
  methods: {}
})
</script>
<style lang="scss" scoped>
.tab_panel {
  min-height: calc(100vh - 51px);
}
</style>
