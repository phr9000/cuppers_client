<template>
  <q-page class="q-pa-sm">
    <!-- card-review 리뷰카드 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cnote 커핑노트카드</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px">
          <card-cnote :cnote="cnote" />
        </div>
        <div class="q-mr-sm" style="width: 400px">
          <card-cnote :cnote="cnote" />
        </div>
        <div style="width: 300px"><card-cnote :cnote="cnote" /></div>
      </div>
    </div>

    <!-- card-review 리뷰카드 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-review 리뷰카드</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px"><card-review /></div>
        <div class="q-mr-sm" style="width: 400px">
          <card-review />
        </div>
        <div style="width: 300px"><card-review /></div>
      </div>
    </div>

    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-sample</p>

      <div style="width: 500px"><card-sample /></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CardSample from 'src/components/Card/CardSample.vue'
import CardReview from 'src/components/Card/CardReview.vue'
import CardCnote from 'src/components/Card/CardCupNote.vue'

export default defineComponent({
  components: {
    CardSample,
    CardReview,
    CardCnote
  },
  data() {
    return {
      cnote: null
      // {
      //   cnote_id: 1,
      //   user_id: 1,
      //   cnote_title: '한 잔의 커피는 나의 아낭케',
      //   user_name: '동글동글동글이',
      //   user_thumbnail:
      //     'https://lh3.googleusercontent.com/a-/AOh14GggDZ_vzX_GCd3BjndXJiua3NszhmGTdr-CK82pLcU=s83',
      //   cnote_content:
      //     '오늘도 정량을 비운 커피잔엔 내일 마실 한 잔의 커피를 그리워하는 마음이 말라버린 거품으로 남았다.오늘도 정량을 비운 커피잔엔 내일 마실 한 잔의 커피를 그리워하는 마음이 말라버린 거품으로 남았다.',
      //   cnote_thumbnail:
      //     'https://cdn.mhns.co.kr/news/photo/202103/502451_604128_1858.jpg',
      //   created_at: '2022-06-10T10:58:54.000Z',
      //   user_liked: 1,
      //   like_cnt: 1142,
      //   user_marked: 0
      // }
    }
  },
  mounted() {
    let apiUrl = `${process.env.API_LOCAL}/cnote/1` // json-server

    this.$axios
      .get(apiUrl)
      .then((result) => {
        this.cnote = result.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
</script>
