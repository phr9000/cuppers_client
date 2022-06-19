<template>
  <q-page class="constrain_sm">
    <section class="q-py-md">
      <div class="text-center text-h5">
        <span>카페정보</span>
      </div>
    </section>
    <section class="q-mx-xl q-my-xl q-pb-xl">
      <div class="text-right q-mr-xl q-mt-xl cafe-notice">
        <q-icon size="11px" name="emergency" class="q-mr-xs asterisk" /><span
          >는 필수항목 입니다</span
        >
      </div>
      <div class="bg-amber-1 q-py-sm q-mt-md background">
        <!-- 카페 이름 -->
        <div class="col-12 q-mx-xl q-my-xl contents_block">
          <div class="row info-block">
            <q-input
              label="카페이름 *"
              v-model="cafe_info.cafe_name_pr"
              type="text"
              :rules="[(val) => !!val || 'Field is required']"
              class="col-8 input-area"
            />
            <div class="col-3 q-my-auto row-area">
              <BtnBasic
                type="button"
                label="중복 확인"
                size="md"
                color="primary"
                padding="7px 20px"
                class="button"
              />
            </div>
          </div>
        </div>
        <div class="col-12 q-mx-xl q-mt-xl contents_block">
          <div class="row info-block">
            <q-input
              type="text"
              id="address"
              label="주소 *"
              class="col-8 input-area"
              :rules="[(val) => !!val || 'Field is required']"
            />
            <div class="col-3 q-my-auto flex row-area">
              <PostNumber
                size="md"
                ref="PostNumber"
                @sendPostData="getPostData"
                padding="7px 20px"
                class="button"
              />
            </div>
          </div>
        </div>
        <div class="col-12 q-mx-xl q-mb-xl contents_block">
          <div class="row info-block">
            <div class="col-7">
              <q-input
                type="text"
                id="detailAddress"
                label="상세주소 *"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col-4 q-ml-xs">
              <q-input
                type="text"
                label="우편번호 *"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
        </div>
        <!-- 카페 전화번호-->
        <div class="q-mx-xl q-mt-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input
              label="대표전화 *"
              v-model="cafe_info.cafe_phone"
              type="tel"
              mask="### -  #### - ####"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-mx-xl q-mt-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input label="영업시간" v-model="cafe_info.cafe_operation_time" />
          </div>
        </div>
        <div class="q-mx-xl q-mt-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input label="웹사이트" v-model="cafe_info.cafe_website" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="text-center">
        <BtnBasic
          @click="show"
          color="primary"
          size="sm"
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
      cafe_info: {
        cafe_name_pr: this.cafe_name_pr,
        cafe_phone: this.cafe_phone,
        cafe_operation_time: this.cafe_operation_time,
        cafe_website: this.cafe_website
      }
    }
  },
  computed: {
    addressData(cafe_address_info) {
      return cafe_address_info.address
    }
  },
  methods: {
    show() {
      console.log('카페정보: ', this.cafe_info)
      this.$refs.PostNumber.sendData()
    },
    getPostData(cafe_address_info) {
      console.log('카페주소: ', cafe_address_info)
    }
  }
})
</script>
<style lang="scss" scoped>
.asterisk {
  color: rgb(255, 136, 0);
}

.background {
  outline: 1px solid #ccc;
  box-sizing: content-box;
  border-radius: 15px;
  .info-block {
    display: flex;
    justify-content: space-between;
  }
}

@media (max-width: 800px) {
  .cafe-notice {
    font-size: 0.8rem;
  }
  .contents_block {
    margin: 48px 15px;
    .button {
      size: 0.5rem;
    }
  }
}
</style>
