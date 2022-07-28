<template>
  <q-page class="q-pa-sm">
    <!-- card-review 커핑노트카드 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cnote 커핑노트카드 리스트</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 700px">
          <CardCnoteLi :cnote="cnote" />
        </div>
      </div>
    </div>

    <!-- card-review 커핑노트카드 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cnote 커핑노트카드</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px">
          <card-cnote :cnote="cnote" />
        </div>
        <div class="q-mr-sm" style="width: 400px">
          <card-cnote :cnote="cnote" />
        </div>
        <div style="width: 100%"><card-cnote :cnote="cnote" /></div>
      </div>
    </div>

    <!-- card-review 리뷰카드 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-review 리뷰카드</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px">
          <card-review :review="review" />
        </div>
        <div class="q-mr-sm" style="width: 400px">
          <card-review :review="review" />
        </div>
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
import CardCnote from 'src/components/Card/CardCupNote.vue'
import CardReview from 'src/components/Card/CardReview.vue'
import CardSample from 'src/components/Card/CardSample.vue'
import CardCnoteLi from 'src/components/Card/CardCnoteLi.vue'

export default defineComponent({
  components: {
    CardCnoteLi,
    CardCnote,
    CardReview,
    CardSample
  },
  data() {
    return {
      review: null,
      // {
      //   cafe_name_pr: '커피앰비언스',
      //   review_id: 1,
      //   cafe_id: 1,
      //   user_id: 1,
      //   user_thumbnail_url: '/images/avatar/1/avatar.jpg', // '/api/file/marilyn.jpg', //'/images/avatar/1/marilyn.jpg',
      //   review_drink: '브라질 아이피 옐로우버본 내추럴',
      //   drink_type: 'br, sg',
      //   user_nickname: '동글동글동글이',
      //   review_content:
      //     '커피 퀄리티와 바리스타의 역량(전문성), 분위기 3박자를 모두 갖춘 곳. 원두 라인업이 바뀔 때 마다 호기심 반 기대 반으로 들르게 된다. 너무 골목이라 가끔 헤메기도 하고 자주 못 가지만, 갈 때 마다 마음이 편안해지는 곳. ',
      //   created_at: '2022-06-11 12:24:55',
      //   review_img: 'https://picsum.photos/200',
      //   user_liked: 1,
      //   like_cnt: 142,
      //   keywords: [
      //     {
      //       keyword_name: '커피에 대한 설명'
      //     },
      //     {
      //       keyword_name: '내추럴 커피'
      //     },
      //     {
      //       keyword_name: '추출도구 선택 가능'
      //     },
      //     {
      //       keyword_name: '분위기가 좋은'
      //     },
      //     {
      //       keyword_name: '추출도구 선택 가능'
      //     },
      //     {
      //       keyword_name: '분위기가 좋은'
      //     },
      //     {
      //       keyword_name: '분위기가 좋은'
      //     }
      //   ],
      //   images: [
      //     {
      //       image_review_type: 'g',
      //       image_review_url: 'url',
      //       thumbnail:
      //         'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F125294936bad131662e8b4942b738e6189e61948%3Foriginal'
      //     },
      //     {
      //       image_review_type: 'g',
      //       image_review_url: 'url',
      //       thumbnail: 'url'
      //     },
      //     {
      //       image_review_type: 'g',
      //       image_review_url: 'url',
      //       thumbnail: 'url'
      //     },
      //     {
      //       image_review_type: 'm',
      //       image_review_url: 'url',
      //       thumbnail: 'url'
      //     }
      //   ]
      // }
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
    this.loadCnote()
    //this.loadReview()
  },
  methods: {
    loadReview() {
      let apiUrl = `${process.env.API_LOCAL}/review/1` // json-server
      // let apiUrl = `${process.env.API}/review/1?sort=recent&page=1&limit=1`

      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.review = result.data
          // this.review = result.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    loadCnote() {
      let apiUrl = `${process.env.API}/cnote?page=1&limit=10&sort=recent&order=d&search=&user_id=` // json-server

      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cnote = result.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
</script>
