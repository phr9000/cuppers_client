<template>
  <q-page class="constrain">
    <section class="q-py-md section">
      <div class="text-center" style="font-size: 30px">
        <span>카페정보</span>
      </div>
    </section>
    <section class="q-mx-xl">
      <div class="text-right q-mr-xl q-mt-xl">
        <q-icon
          size="xs"
          name="emergency"
          style="color: #ff8a00"
          class="q-mr-xs"
        /><span>는 필수항목 입니다</span>
      </div>
      <!-- 카페 이름 -->
      <div class="q-mx-xl q-pl-xl q-mt-xl row">
        <div class="col-2 text-left q-my-auto">
          <span style="font-size: 1.5rem">카페이름</span>
          <q-icon size="12px" name="emergency" style="color: #ff8a00" />
        </div>
        <div class="col-10">
          <q-input
            label="카페이름"
            v-model="cafe_name_pr"
            type="text"
            :dense="dense"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
      </div>
      <div class="q-mx-xl q-pl-xl q-mt-xl row">
        <div class="col-2 text-left q-my-auto">
          <span class="q-pr-xl" style="font-size: 1.5rem">주</span>
          <span style="font-size: 1.5rem">소</span>
          <q-icon size="12px" name="emergency" style="color: #ff8a00" />
        </div>
        <PostNumber
          ref="PostNumber"
          @sendPostData="getPostData"
          class="col-10"
        />
      </div>
      <!-- 카페 전화번호-->
      <div class="q-mx-xl q-pl-xl q-mt-xl row">
        <div class="col-2 text-left q-my-auto">
          <span style="font-size: 1.5rem">대표전화</span>
          <q-icon size="12px" name="emergency" style="color: #ff8a00" />
        </div>
        <div class="col-10">
          <q-input
            label="대표전화"
            v-model="cafe_phone"
            type="tel"
            :dense="dense"
            mask="### -  #### - ####"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
      </div>
      <div class="q-mx-xl q-pl-xl q-mt-xl row">
        <div class="col-2 text-left q-my-auto">
          <span style="font-size: 1.5rem">영업시간</span>
        </div>
        <div class="col-10">
          <q-input
            label="영업시간"
            v-model="cafe_operation_time"
            :dense="dense"
          />
        </div>
      </div>
      <div class="q-mx-xl q-pl-xl q-mt-xl row">
        <div class="col-2 text-left q-mt-auto">
          <span style="font-size: 1.5rem">홈페이지</span>
        </div>
        <div class="col-10">
          <q-input v-model="cafe_website" :dense="dense" />
        </div>
      </div>
    </section>
    <section>
      <div class="text-center">
        <BtnBasic
          @click="show"
          color="primary"
          size="md"
          label="카페 등록하기"
          icon="note"
          padding="10px 30px 10px 30px"
        />
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import PostNumber from 'src/components/Etc/PostNumber.vue'
export default defineComponent({
  name: 'AddNewCafePage',
  components: {
    BtnBasic,
    PostNumber
  },
  data() {
    return {
      cafe_name_pr: this.cafe_name_pr,
      cafe_phone: this.cafe_phone,
      cafe_operation_time: this.cafe_operation_time,
      cafe_website: this.cafe_website
    }
  },
  methods: {
    show() {
      console.log('카페이름: ', this.cafe_name_pr)
      console.log('전화번호: ', this.cafe_phone)
      console.log('운영시간: ', this.cafe_operation_time)
      console.log('홈페이지: ', this.cafe_website)
      this.$refs.PostNumber.sendData()
    },
    getPostData(address, detailAddress, extraAddress, postcode) {
      console.log('카페주소: ', address)
      console.log('상세주소: ', detailAddress)
      console.log('참고사항: ', extraAddress)
      console.log('우편번호: ', postcode)
    }
  },
  mounted() {}
})
</script>
<style lang="scss" scoped>
.section {
  border-bottom: 3px solid #333;
}
</style>
