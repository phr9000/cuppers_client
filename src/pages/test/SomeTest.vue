<template>
  <q-page class="q-pa-sm">
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>기타등등 테스트</p>
    </div>

    <!-- btn_group -->
    <div class="q-mt-sm q-mt-md">
      <div class="row justify-end items-center">
        <btn-basic
          outline
          dense
          class="btn_sort"
          :class="{ active: sort === 'like' }"
          @click="handleClickSort('like')"
          color="grey-6"
          label="추천순"
          size="sm"
          padding="4px 9px"
        />
        <btn-basic
          class="btn_sort"
          :class="{ active: sort === 'distance' }"
          @click="handleClickSort('distance')"
          color="grey-6"
          label="거리순"
          size="sm"
          padding="4px 9px"
        />
        <q-btn-toggle
          flat
          size="sm"
          v-model="sort"
          text-color="grey"
          toggle-color="secondary"
          toggle-text-color="secondary"
          padding="5px 12px"
          :options="[
            { label: '추천순', value: 'like' },
            { label: '거리순', value: 'distance' }
          ]"
        />
        <q-tabs
          active-color="secondary"
          v-model="sort"
          dense
          class="text-grey-6"
        >
          <q-tab class="btn_sort" name="like" label="추천순" />
          <q-tab class="btn_sort" name="distance" label="거리순" />
        </q-tabs>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
export default defineComponent({
  components: { BtnBasic },
  data() {
    return {
      sort: ''
    }
  },
  mounted() {
    // this.axiosTest()
    this.backEndCallTest()
  },
  methods: {
    backEndCallTest() {
      // console.log(process.env.API)
      let apiUrl = `${process.env.API}/api/cafe/1`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    axiosTest() {
      // 이렇게 하는건 테스트 실패
      // console.log(this.$api.baseURL)
      // let apiUrl = `${this.$api}/cnote`

      // 아래와 같은 방법으로 해결
      console.log(process.env.API)
      let apiUrl = `${process.env.API}/cnote`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
</script>
