<template>
  <q-page class="bg-grey-1">
    <div class="form_survey_container constrain_sm q-px-md">
      <div class="title">
        <h4 class="q-pt-xl">선호하는 커피취향</h4>
      </div>
      <h6>좋아하는 커피의 특징 (중복 선택 가능)</h6>
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

      <h6>좋아하는 추출 방식 (중복 선택 가능)</h6>
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

      <h6>좋아하는 카페 (중복 선택 가능)</h6>
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
          color="primary"
          label="sign up"
          icon="account_circle"
          size="lg"
          padding="2px 10px 2px 15px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import SurveySelect from 'src/components/Etc/SurveySelect.vue'
import BtnBasicRight from 'src/components/Button/BtnBasicRight.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
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
      selectedCafeKeywords: [],
      selectedAll: [],
      uid: 0,
      userId: '',
      thumbnail: ''
    }
  },
  created() {
    // 파라미터로 넘어온 userId
    this.userId = this.$route.params.id
    this.getUserInfo(this.userId)
    // let apiUrl = `${process.env.API_LOCAL}/serveyKeywords` // json-/server
    let apiUrl = `${process.env.API}/keyword/survey` // real-server
    this.$axios
      .get(apiUrl)
      .then((result) => {
        console.log(result.data)
        this.coffeeKeywords = result.data.filter((item) => {
          return item.keyword_type === 'coffee'
        })
        this.brewingKeywords = result.data.filter((item) => {
          return item.keyword_type === 'brewing'
        })
        console.log(this.brewingKeywords)
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
    getUserInfo(userId) {
      let apiUrl = `http://localhost:3000/api/user/detail/${this.userId}`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.thumbnail = result.data[0].user_thumbnail_url
          if (userThumbnail && userThumbnail.startsWith('images/')) {
            userThumbnail = `${process.env.STATIC}/${userThumbnail}`
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitSurvey() {
      this.selectedAll = this.selectedCoffeeKeywords
        .concat(this.selectedBrewingKeywords)
        .concat(this.selectedCafeKeywords)
      console.log('submit: ', this.selectedAll)
      // 성공 시 uid localstorage에 저장
      const uid = parseInt(this.userId)
      this.user = {
        uid: uid,
        thumbUrl: this.thumbnail
      }
      this.$router.push({
        path: `/`
      })
      this.getUserInfo(),
        this.$q.notify({
          position: 'top',
          timeout: 1000,
          message: '성공적으로 회원가입이 되었습니다',
          color: 'primary'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 0;
}
</style>
