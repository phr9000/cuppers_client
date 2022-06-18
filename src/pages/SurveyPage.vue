<template>
  <q-page class="bg-grey-1">
    <div class="form_survey_container constrain_sm q-px-md">
      <div class="title">
        <h4 class="q-pt-xl">선호하는 커피취향</h4>
      </div>
      <h6>좋아하는 커피의 특징 (중복 선택 가능)</h6>
      <div class="flex flex-center">
        <div class="row justify-start">
          <servey-select
            class="q-ma-xs"
            v-for="keyword in keywords"
            :key="keyword.keyword_id"
            :id="keyword.keyword_id"
            :type="keyword.keyword_type"
            :text="keyword.keyword_name"
            :icon="keyword.keyword_icon"
            :bg="keyword.bg"
            @checked="selectKeyword"
            @unchecked="deSelectKeyword"
          />
        </div>
      </div>
      <div>선택한 키워드 : {{ selectedKeywords }}</div>

      <h6>좋아하는 추출 방식 (중복 선택 가능)</h6>
      <div class="flex flex-center">
        <div class="row justify-start">
          <servey-select
            class="q-ma-xs"
            v-for="brewing in brewingOptions"
            :key="brewing.brewing_option_id"
            :id="brewing.brewing_option_id"
            type="brewingOption"
            :text="brewing.brewing_name"
            :icon="brewing.brewing_icon"
            :bg="brewing.bg"
            @checked="selectBrewing"
            @unchecked="deSelectBrewing"
          />
        </div>
      </div>
      <div>선택한 추출 방식 : {{ selectedBrewingOptions }}</div>

      <div class="flex flex-center q-py-xl">
        <btn-basic-right
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
import ServeySelect from 'src/components/Etc/ServeySelect.vue'
import BtnBasicRight from 'src/components/Button/BtnBasicRight.vue'

const keywordBackgroundList = [
  {
    keyword_name: '화사한 산미',
    bg: 'https://cdn.shopify.com/s/files/1/0563/3294/3550/files/coffee-plant-leaves-stem_480x480.jpg?v=1628695949'
  },
  {
    keyword_name: '바디감',
    bg: 'https://i2.wp.com/baristanews.co.kr/wp-content/uploads/2017/11/body2.jpg?resize=640%2C427'
  }
]
const bgDefault = 'https://t1.daumcdn.net/cfile/blog/2362A136560CB9B501'

const brewingBackgroundList = [
  {
    brewing_name: '푸어오버,드립',
    bg: 'https://i.ytimg.com/vi/wP1dMsoxIAo/maxresdefault.jpg'
  },
  {
    brewing_name: '사이폰',
    bg: 'https://i1.wp.com/baristanews.co.kr/wp-content/uploads/2017/07/gh5tbuuodilayi6kk7t1-696x333.jpg?fit=696%2C333&ssl=1'
  },
  {
    brewing_name: '케멕스',
    bg: 'https://mblogthumb-phinf.pstatic.net/20150907_208/thepearlbarn_1441599871354CK9tk_JPEG/main.jpg?type=w2'
  },
  {
    brewing_name: '모카포트',
    bg: 'https://parisjoomin.com/wp-content/uploads/2021/03/D06C2525-CEA0-4A1D-AA1B-223B7698F6A7-1024x520.jpeg'
  }
]

export default {
  components: { ServeySelect, BtnBasicRight },
  data() {
    return {
      step: 1,
      keywords: [],
      brewingOptions: [],
      selectedKeywords: [],
      selectedBrewingOptions: []
    }
  },
  created() {
    let apiUrl = 'http://localhost:3000/keywords'
    this.$axios
      .get(apiUrl)
      .then((result) => {
        const keywords = result.data
        keywords.forEach((keyword) => {
          const found = keywordBackgroundList.find(
            (el) => el.keyword_name === keyword.keyword_name
          )

          let bg = null
          try {
            bg = found.bg
          } catch {
            bg = bgDefault
          }
          this.keywords.push({ ...keyword, bg: bg })
        })
        console.log(this.keywords)
      })
      .catch((err) => {
        console.log(err)
      })

    apiUrl = 'http://localhost:3000/brewingOptions'
    this.$axios
      .get(apiUrl)
      .then((result) => {
        const brewings = result.data
        brewings.forEach((brewing) => {
          const found = brewingBackgroundList.find(
            (el) => el.brewing_name === brewing.brewing_name
          )

          let bg = null
          try {
            bg = found.bg
          } catch {
            bg = bgDefault
          }
          this.brewingOptions.push({ ...brewing, bg: bg })
        })
        console.log(this.brewingOptions)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    selectKeyword(id) {
      this.selectedKeywords.push(id)
    },
    deSelectKeyword(id) {
      this.selectedKeywords = this.selectedKeywords.filter((item) => {
        console.log(item)
        return item !== id
      })
    },
    selectBrewing(id) {
      this.selectedBrewingOptions.push(id)
    },
    deSelectBrewing(id) {
      this.selectedBrewingOptions = this.selectedBrewingOptions.filter(
        (item) => {
          console.log(item)
          return item !== id
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 0;
}
</style>
