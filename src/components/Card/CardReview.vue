<template>
  <div class="card_review_container">
    <div class="row items-center">
      <btn-avatar />
      <div class="q-ml-sm">{{ review.user_name }}</div>
    </div>
    <q-card class="card_review" flat bordered>
      <q-card-section class="row items-center">
        <div class="text-h5 cafe_name q-mr-md">
          {{ review.cafe_name }}
        </div>
        <div class="cafe_keywords_wrap">
          <badge-cafe
            v-for="keyword in cafeKeywords"
            :key="keyword.keyword_name"
            :value="keyword.keyword_name"
          />
        </div>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="q-py-none bg-grey-1">
          <div class="q-mb-xs">
            {{ review.review_drink }}
          </div>

          <div class="aromanote_wrap">
            <badge-aroma
              v-for="aroma in aromaNotes"
              :key="aroma.keyword_name"
              :value="aroma.keyword_name"
            />
          </div>

          <div class="caption text-caption text-grey q-my-sm">
            {{ review.review_description }}
          </div>
        </q-card-section>
        <q-card-section class="col-5 flex flex-center bg-grey-1">
          <q-img :ratio="3 / 4" :src="review.review_thumbnail" />
        </q-card-section>
      </q-card-section>
      <q-card-section class="review_bottom row items-center">
        <q-icon size="sm" color="red-5" name="favorite" />
        <span class="q-ml-xs text-red-4 text-h6">512</span>
        <div>2022.22.22</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAvatar from 'src/components/Button/BtnAvatar.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'
import BadgeAroma from 'src/components/Badge/BadgeAroma.vue'
export default defineComponent({
  name: 'CardReview',
  components: { BtnAvatar, BadgeCafe, BadgeAroma },
  props: {
    review: {
      type: Object,
      default: () => {
        return {
          review_id: 1,
          cafe_id: 1,
          user_id: 1,
          user_name: '동글동글동글이',
          user_thumbnail:
            'https://lh3.googleusercontent.com/a-/AOh14GggDZ_vzX_GCd3BjndXJiua3NszhmGTdr-CK82pLcU=s83',
          review_drink: '브라질 아이피 옐로우버본 내추럴',
          review_description:
            '커피 퀄리티와 바리스타의 역량(전문성), 분위기 3박자를 모두 갖춘 곳. 원두 라인업이 바뀔 때 마다 호기심 반 기대 반으로 들르게 된다. 너무 골목이라 가끔 헤메기도 하고 자주 못 가지만, 갈 때 마다 마음이 편안해지는 곳',
          created_at: '2022-06-11 12:24:55',
          cafe_name: '커피앰비언스',
          review_keyword: [
            {
              keyword_name: '커피에 대한 설명',
              keyword_type: 'cafe'
            },
            {
              keyword_name: '내추럴 커피',
              keyword_type: 'cafe'
            },
            {
              keyword_name: '추출도구 선택 가능',
              keyword_type: 'cafe'
            },
            {
              keyword_name: '분위기가 좋은',
              keyword_type: 'cafe'
            },
            {
              keyword_name: '감귤',
              keyword_type: 'coffee'
            },
            {
              keyword_name: '모과',
              keyword_type: 'coffee'
            },
            {
              keyword_name: '볶은 땅콩',
              keyword_type: 'coffee'
            },
            {
              keyword_name: '캐러멜',
              keyword_type: 'coffee'
            }
          ],
          user_cafe_likeit: true,
          review_thumbnail:
            'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F125294936bad131662e8b4942b738e6189e61948%3Foriginal'
        }
      }
    }
  },
  computed: {
    cafeKeywords() {
      return this.review.review_keyword.filter((key) => {
        return key.keyword_type === 'cafe'
      })
    },
    aromaNotes() {
      return this.review.review_keyword.filter((key) => {
        return key.keyword_type === 'coffee'
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.card_review {
  border: 1px solid $primary;
  // height: 250px;
  .user_info {
    width: 30px;
    display: flex;
    align-items: center;
    margin: 10px;
  }
  .user_name {
    font-size: 20px;
    margin: 10px;
  }
  .caption {
    height: 80px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .review_bottom {
    padding: 0 16px 8px 16px;
  }
}
</style>
