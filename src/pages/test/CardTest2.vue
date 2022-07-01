<template>
  <q-page class="q-pa-sm">
    <!-- CardCafe 카페카드(small) -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cafe 카페카드samll (검색결과리스트)</p>
      <div class="row">
        <div style="width: 382px"><card-cafe-small :today="today" /></div>
      </div>
    </div>

    <!-- CardCafe 카페카드(block) -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cafe 카페카드(block)</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 100%">
          <card-cafe :cafe="cafe" />
        </div>
        <div class="q-mr-sm" style="width: 700px">
          <card-cafe :cafe="cafe" />
        </div>
      </div>
    </div>

    <!-- CardCafeMap 카페카드(지도화면) -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cafe-map 카페카드(지도화면)</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 400px">
          <card-cafe-map :cafe="cafe" :today="today" @close="handleClose" />
        </div>
        <div style="width: 300px">
          <card-cafe-map :cafe="cafe" :today="today" @close="handleClose" />
        </div>
      </div>
    </div>

    <!-- card-cafe-main 카페카드-메인 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cafe-main 카페카드-메인</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px"><card-cafe-main /></div>
        <div class="q-mr-sm" style="width: 400px">
          <card-cafe-main
            title="커피 앰비언스"
            caption="‘커피를 커피답게’ 10년차 큐그레이더가 운영하는 호주식 로스터리 카페. 한적한 주택가에 위치해 있으며, 카펜터, 아이리스, 헬로다크니스 등 3종의 자체 블렌딩을 비롯해 다양한 싱글오리진 원두 라인업을 갖추고 있다. 핸드드립 커피를 즐기는 이들에게 좋은 평을 받고 있다."
            imgUrl="https://blog.kakaocdn.net/dn/TRtov/btqviGyD7Xs/4YJRM8qw366Wr5TpVofhRk/img.png"
            distance="3"
          />
        </div>
        <div style="width: 300px"><card-cafe-main /></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CardCafeMap from 'src/components/Card/CardCafeMap.vue'
import CardCafe from 'src/components/Card/CardCafe.vue'
import CardCafeSmall from 'src/components/Card/CardCafeSmall.vue'
import CardCafeMain from 'src/components/Card/CardCafeMain.vue'

export default defineComponent({
  components: {
    CardCafeMap,
    CardCafe,
    CardCafeSmall,
    CardCafeMain
  },
  data() {
    return {
      cafe: {
        cafe_id: 4,
        cafe_name_pr: '이월로스터스 송파2호점 (송파구)',
        cafe_address: '서울 송파구 송이로17길 51',
        cafe_region: '송파',
        cafe_address_dong: '(가락동)',
        cafe_type: 'r',
        cafe_latitude: 37.5015764,
        cafe_longitude: 127.124833,
        cafe_description:
          '‘커피를 커피답게’ 10년차 큐그레이더가 운영하는 호주식 로스터리 카페#한적한 주택가에 위치해 있으며, 카펜터, 아이리스, 헬로다크니스 등 3종의 자체 블렌딩을 비롯해 다양한 싱글오리진 원두 라인업을 갖추고 있다. 핸드드립 커피를 즐기는 이들에게 좋은 평을 받고 있다.',
        cafe_img:
          'http://bwissue.com/files/attach/images/243/259/163/5f5e0b133235349e19e997c5bf5f9440.jpg',
        like_cnt: 114,
        user_liked: 1,
        review_cnt: 32,
        user_beenthere: 0,
        keywords: [
          {
            keyword_id: 1,
            keyword_name: '앰비언스',
            icon: null
          },
          {
            keyword_id: 4,
            keyword_name: '내추럴 커피',
            icon: null
          },
          {
            keyword_id: 5,
            keyword_name: '추출도구 선택 가능',
            icon: null
          },
          {
            keyword_id: 21,
            keyword_name: 'COE 취급',
            icon: null
          }
        ],
        opTime: [
          {
            day: '월',
            time: '정기휴무'
          },
          {
            day: '화~토',
            time: '11:30 - 21:30 (21:00 라스트오더)'
          },
          {
            day: '일',
            time: '정기휴무'
          }
        ]
      },
      today: {
        day: '월',
        time: '정기휴무'
      }
    }
  },
  methods: {
    handleClose() {}
  }
})
</script>
