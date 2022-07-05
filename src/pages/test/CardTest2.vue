<template>
  <q-page class="q-pa-sm">
    <!-- CardCafe 카페카드(small) -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cafe 카페카드samll (검색결과리스트)</p>
      <div class="row">
        <div style="width: 382px"><card-cafe-li :today="today" /></div>
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
          <card-cafe-map
            :cafe="cafe"
            :today="today"
            :cafeFacility="cafeFacility"
            @close="handleClose"
          />
        </div>
        <div style="width: 300px">
          <card-cafe-map
            :cafe="cafe"
            :today="today"
            :cafeFacility="cafeFacility"
            :menuBrewing="menuBrewing"
            :menuVariation="menuVariation"
            @close="handleClose"
          />
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
import CardCafeLi from 'src/components/Card/CardCafeLi.vue'
import CardCafeMain from 'src/components/Card/CardCafeMain.vue'

export default defineComponent({
  components: {
    CardCafeMap,
    CardCafe,
    CardCafeLi,
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
      },
      cafeFacility: [
        {
          name: '내부 화장실',
          icon: null,
          type: null
        },
        {
          name: '와이파이',
          icon: 'eva-wifi',
          type: null
        },
        {
          name: '주차장',
          icon: 'eva-car',
          type: null
        }
      ],
      menuBrewing: [
        {
          menu_id: 3,
          cafe_id: 1,
          menu_name: '파나마 잰슨 게이샤 워시드',
          menu_price_hot: 6000,
          menu_price_ice: null,
          menu_type: 'br',
          menu_aromanote:
            '플로럴,레몬그라스,오렌지,샤인머스캣,백도,쥬시하고 긴 여운',
          is_signature: 1
        },
        {
          menu_id: 4,
          cafe_id: 1,
          menu_name: '브라질 아이피 옐로우버본 내추럴',
          menu_price_hot: 5500,
          menu_price_ice: null,
          menu_type: 'br',
          menu_aromanote: '감귤,모과,볶은 땅콩,캐러멜',
          is_signature: 0
        }
      ],
      menuVariation: [
        {
          menu_id: 5,
          cafe_id: 1,
          menu_name: '아메리카노',
          menu_price_hot: 3800,
          menu_price_ice: 3800,
          menu_type: 'va',
          menu_aromanote: null,
          is_signature: 0
        },
        {
          menu_id: 6,
          cafe_id: 1,
          menu_name: '카페라떼',
          menu_price_hot: 4400,
          menu_price_ice: 4400,
          menu_type: 'va',
          menu_aromanote: null,
          is_signature: 0
        },
        {
          menu_id: 7,
          cafe_id: 1,
          menu_name: '플랫화이트',
          menu_price_hot: null,
          menu_price_ice: 4900,
          menu_type: 'va',
          menu_aromanote: null,
          is_signature: 1
        }
      ]
    }
  },
  methods: {
    handleClose() {}
  }
})
</script>
