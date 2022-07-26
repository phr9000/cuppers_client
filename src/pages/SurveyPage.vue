<template>
  <q-page class="bg-grey-1 q-py-lg">
    <div class="form_survey_container constrain_sm q-px-md">
      <div class="title">
        <h4 class="text-center q-pt-xl">취향을 등록해주세요.</h4>
        <h5 class="text-center q-pt-xs text-grey">
          <span class="text-brown-4">{{ user.nickname }}</span
          >님에게 맞는 카페를 찾아드립니다~💖
        </h5>
      </div>
      <h6>
        ☕ 좋아하는 커피의 특징
        <span class="text-brown-4">(중복 선택 가능)</span>
      </h6>
      <div class="row justify-start">
        <survey-select
          class="q-ma-xs"
          v-for="keyword in coffeeKeywords"
          :key="keyword.keyword_id"
          :id="keyword.keyword_id"
          :type="keyword.keyword_type"
          :text="keyword.keyword_name"
          :icon="keyword.keyword_icon"
          :bg="keyword.reg_survey_imgurl"
          @checked="selectCoffeeKeyword"
          @unchecked="deSelectCoffeeKeyword"
        />
      </div>

      <h6>
        💧 좋아하는 추출 방식
        <span class="text-brown-4">(중복 선택 가능)</span>
      </h6>
      <div class="row justify-start">
        <survey-select
          class="q-ma-xs"
          v-for="keyword in brewingKeywords"
          :key="keyword.keyword_id"
          :id="keyword.keyword_id"
          :type="keyword.keyword_type"
          :text="keyword.keyword_name"
          :icon="keyword.keyword_icon"
          :bg="keyword.reg_survey_imgurl"
          @checked="selectBrewingKeyword"
          @unchecked="deSelectBrewingKeyword"
        />
      </div>

      <h6>
        🪑 좋아하는 카페 <span class="text-brown-4">(중복 선택 가능)</span>
      </h6>
      <div class="row justify-start">
        <survey-select
          class="q-ma-xs"
          v-for="keyword in cafeKeywords"
          :key="keyword.keyword_id"
          :id="keyword.keyword_id"
          :type="keyword.keyword_type"
          :text="keyword.keyword_name"
          :icon="keyword.keyword_icon"
          :bg="keyword.reg_survey_imgurl"
          @checked="selectCafeKeyword"
          @unchecked="deSelectCafeKeyword"
        />
      </div>
      <!-- <div>선택한 키워드 : {{ selectedCoffeeKeywords }}</div>
      <div>선택한 추출 방식 : {{ selectedBrewingKeywords }}</div>
      <div>선택한 카페 취향 : {{ selectedCafeKeywords }}</div>
      <div>선택한 모든 취향 : {{ selectedAll }}</div> -->

      <div class="flex flex-center q-py-xl">
        <btn-basic-right
          @click="submitSurvey"
          color="brown"
          label="가입 완료 !"
          icon="account_circle"
          size="lg"
          padding="2px 15px 2px 20px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SurveySelect from 'src/components/Etc/SurveySelect.vue'
import BtnBasicRight from 'src/components/Button/BtnBasicRight.vue'

export default {
  name: 'SurveyPage',
  components: { SurveySelect, BtnBasicRight },
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user,
      set: (val) => {
        $store.commit('auth/setUser', val)
      }
    })

    return {
      user
    }
  },
  data() {
    return {
      coffeeKeywords: [],
      brewingKeywords: [],
      cafeKeywords: [],
      selectedCoffeeKeywords: [],
      selectedBrewingKeywords: [],
      selectedCafeKeywords: []
      // selectedAll: []
    }
  },
  created() {
    // let apiUrl = `${process.env.API_LOCAL}/serveyKeywords` // json-/server
    let apiUrl = `${process.env.API}/keyword/survey` // real-server
    this.$axios
      .get(apiUrl)
      .then((result) => {
        // console.log(result.data)
        this.coffeeKeywords = result.data.filter((item) => {
          return item.keyword_type === 'coffee'
        })
        this.brewingKeywords = result.data.filter((item) => {
          return item.keyword_type === 'brewing'
        })
        // console.log(this.brewingKeywords)
        this.cafeKeywords = result.data.filter((item) => {
          return item.keyword_type === 'cafe'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    selectCoffeeKeyword(id) {
      this.selectedCoffeeKeywords.push(id)
    },
    deSelectCoffeeKeyword(id) {
      this.selectedCoffeeKeywords = this.selectedCoffeeKeywords.filter(
        (item) => {
          console.log(item)
          return item !== id
        }
      )
    },
    selectBrewingKeyword(id) {
      this.selectedBrewingKeywords.push(id)
    },
    deSelectBrewingKeyword(id) {
      this.selectedBrewingKeywords = this.selectedBrewingKeywords.filter(
        (item) => {
          console.log(item)
          return item !== id
        }
      )
    },
    selectCafeKeyword(id) {
      this.selectedCafeKeywords.push(id)
    },
    deSelectCafeKeyword(id) {
      this.selectedCafeKeywords = this.selectedCafeKeywords.filter((item) => {
        console.log(item)
        return item !== id
      })
    },
    submitSurvey() {
      const selectedAll = this.selectedCoffeeKeywords
        .concat(this.selectedBrewingKeywords)
        .concat(this.selectedCafeKeywords)
      console.log('submit: ', selectedAll)

      // 가입 서베이 등록
      // request 시 body 내용
      // {
      //     "param":[1, 2, 3], // user가 선택한 keywords 배열
      //     "user_id": 2 // uid
      // }
      let apiUrl = `${process.env.API}/user/register/survey`
      this.$axios
        .post(apiUrl, {
          param: selectedAll,
          user_id: this.user.uid
        })
        .then((result) => {
          if (result.statusText === 'OK') {
            console.log(result)

            if (result.data.insertId > 0) {
              this.$q.notify({
                position: 'top',
                timeout: 5000,
                message: `🎆😺 ${this.user.nickname}님의 가입을 환영합니다! 😺🎉`,
                color: 'primary'
              })
              this.$router.push('/')
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form_survey_container {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 5px 3px 7px -3px;
  border-radius: 23px;
  @media (max-width: 962px) {
    box-shadow: none;
    border-radius: none;
  }

  h4,
  h5 {
    margin: 0;
  }
  h6 {
    margin: 15px 4px;
  }
}
</style>
