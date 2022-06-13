<template>
  <div class="card_review_container">
    <div class="user_info row items-center">
      <btn-avatar />
      <div class="q-ml-sm user_name">{{ review.user_name }}</div>
    </div>
    <q-card class="card_review bg-grey-1" flat bordered>
      <q-card-section class="cafe_info row items-center justify-between">
        <div @click="cafeNameClick" class="text-h5 cafe_name q-mb-xs">
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
      <q-card-section horizontal class="coffee_info_wrap row q-pt-none q-pr-md">
        <div class="coffee_info q-py-none q-px-md">
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
        </div>
        <q-img
          class="col-5 q-pr-sm review_image"
          :initial-ratio="16 / 9"
          :src="review.review_thumbnail"
        />
      </q-card-section>
      <q-card-section
        class="review_bottom row justify-between items-center q-mb-m"
      >
        <btn-like
          :userId="1"
          :whatId="review.review_id"
          likeWhat="review"
          :likedIt="review.user_review_liked"
          :likeItCount="review.review_liked_cnt"
        />

        <div class="text-grey">{{ createDate }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { defineComponent } from 'vue'
import BtnAvatar from 'src/components/Button/BtnAvatar.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'
import BadgeAroma from 'src/components/Badge/BadgeAroma.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'

export default defineComponent({
  name: 'CardReview',
  components: { BtnAvatar, BadgeCafe, BadgeAroma, BtnLike },
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
              keyword_name: '추출도구 선택 가능',
              keyword_type: 'cafe'
            },
            {
              keyword_name: '분위기가 좋은',
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
            },
            {
              keyword_name: '캐러멜',
              keyword_type: 'coffee'
            }
          ],
          user_review_liked: true,
          review_liked_cnt: 142,
          review_thumbnail:
            'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F125294936bad131662e8b4942b738e6189e61948%3Foriginal'
        }
      }
    }
  },
  computed: {
    createDate() {
      // return format(this.review.created_at, 'yyyy/dd/MM')
      return format(new Date(), 'MMM dd. yyyy')
    },
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
  },
  methods: {
    cafeNameClick() {
      this.$router.push({ path: '/cafedetail/1' })
    }
  }
})
</script>

<style lang="scss" scoped>
.user_info {
  .user_name {
    color: $grey-9;
  }
}
.card_review {
  border: 1px solid $grey-4;
  .cafe_info {
    .cafe_name {
      transition: all 0.5s;
      color: $grey-9;
      cursor: pointer;
      &:hover {
        color: $grey-6;
      }
    }
    .cafe_keywords_wrap {
      flex-wrap: nowrap;
    }
  }
  .review_image {
    border-radius: 4px;
  }
  .review_bottom {
    padding: 0 16px 8px 16px;
  }
}
</style>
