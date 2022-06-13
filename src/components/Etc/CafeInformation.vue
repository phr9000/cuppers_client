<template>
  <div container>
    <div class="row">
      <div view="lhh LpR lff" class="q-mt-xl col-6">
        <div class="q-pl-md info">
          <h6 class="title" style="font-weight: 600">기본정보</h6>
          <div class="body">
            <badge-cafe-tag :cafeKeywordsData="cafeKeywordsData" />
            <!-- 카페 주소 -->
            <div>
              <p>
                <q-icon size="xs" name="room" class="q-pr-xs" />
                {{ cafeData[0].cafe_address }}
              </p>
            </div>
            <!-- 카페 영업시간 -->
            <div>
              <span>
                <q-icon size="xs" name="alarm" class="q-pr-sm" />
                {{ cafeData[0].cafe_weekday }} |
                {{ cafeData[0].cafe_weekend }} |
                {{ cafeData[0].cafe_dayoff }}
              </span>
            </div>
            <!-- 카페 연락처(전화번호, 홈페이지, 인스타그램) -->
            <div>
              <div class="q-mt-sm">
                <q-icon size="xs" name="call" class="q-pr-sm" />{{
                  cafeData[0].cafe_phone
                }}
              </div>
              <div class="q-mt-sm">
                <q-icon size="xs" name="language" class="q-pr-sm" /><a
                  href=""
                  >{{ cafeData[0].cafe_web }}</a
                >
              </div>
              <div class="q-mt-sm">
                <q-icon size="xs" name="instagram" class="q-pr-sm" /><a
                  href=""
                  >{{ cafeData[0].cafe_insta }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div view="lhh LpR lff" class="q-mt-xl col-6 wow">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-sm">
              <q-avatar>
                <img :src="userData[0]['user_thumbnail_url']" alt="" />
              </q-avatar>
              <div class="text-overline">{{ reviewData[0].user_name }}</div>
              <div class="text q-mt-sm q-mb-xs">
                {{ reviewData[0].review_drink }}
              </div>
              <div class="text-caption text-grey">
                {{ reviewData[0].review_description }}
              </div>
            </q-card-section>
            <q-card-section class="col-5 flex flex-center">
              <q-img :src="reviewData[0].review_thumbnail" />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import { defineComponent } from 'vue'
import BadgeCafeTag from '../Badge/BadgeCafeTag.vue'

export default defineComponent({
  name: 'CafeInformation',
  props: {
    cafeId: {
      type: Number,
      default: -1
    },
    cafe_address: {
      type: String,
      default: '서울 송파구 송이로17길 51'
    },
    cafe_weekday: {
      type: String,
      default: '08:00 ~ 22:00'
    },
    cafe_weekend: {
      type: String,
      default: '토,일요일 12:00 ~ 22:00'
    },
    cafe_dayoff: {
      type: String,
      default: '명절 당일 휴무'
    },
    cafe_phone: {
      type: String,
      default: '02-449-9967'
    },
    cafe_web: {
      type: String,
      default: 'https://www.cafeabcd.com'
    },
    cafe_insta: {
      type: String,
      default: 'https://www.instagram.com/userid/'
    },
    cafe_menu_image: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOQ_VynXr2kDkkFhIOvherUBTWBujQs9PhA&usqp=CAU'
    },
    user_thumbnail_url: {
      type: String,
      default:
        'https://i.pinimg.com/564x/8d/ef/74/8def742e13e30690bed31ad7634839c3.jpg'
    },
    user_name: {
      type: String,
      default: 'Weme'
    },
    review_drink: {
      type: String,
      default: '에스프레소'
    },
    review_description: {
      type: String,
      default:
        '동네커피숍처럼 아기자기했던 까페 ^^ 이곳저곳 모두 비슷한매장컨셉에 질렸던터라, 이곳은 저에겐 좀 색다르게느껴졌어요 ㅎㅎㅎ까페치고는 매우 간략한메뉴판이 있는 곳입니다 ㅎㅎ'
    },
    review_thumbnail: {
      type: String,
      default:
        'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Fmystore%2F8B933339DC3E4BF2B9033A30ADBCA5F4'
    },
    cafeData: Array,
    cafeKeywordsData: Array,
    reviewData: Array,
    userData: Array
  },
  components: {
    BadgeCafeTag
  }
})
</script>
<style lang="scss" scoped>
a:link {
  color: #000;
  text-decoration: none;
}
.info {
  padding-left: 10px;
  .title {
    margin: 0;
  }
  .body {
    padding-left: 20px;
  }
}
</style>
