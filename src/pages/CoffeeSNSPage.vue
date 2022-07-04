<template>
  <q-page ref="scrollTargetRef">
    <div>
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs v-model="tab" inline-label vertical class="text-teal q-py-lg">
            <q-tab name="cnote" icon="mail" label="커핑노트" class="q-my-sm" />
            <q-tab name="review" icon="alarm" label="리뷰" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels class="bg-grey-1" v-model="tab" vertical>
            <q-tab-panel name="cnote" class="constrain_md tab_panel">
              <cnote-list />
            </q-tab-panel>

            <q-tab-panel name="review" class="constrain_md">
              <review-list />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import CnoteList from 'src/components/List/CnoteList.vue'
import ReviewList from 'src/components/List/ReviewList.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoffeeSNSPage',
  components: { CnoteList, ReviewList },
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
