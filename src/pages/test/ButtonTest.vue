<template>
  <q-page class="q-pa-sm">
    버튼 테스트
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-basic</p>
      <btn-basic @click="testMethod" />
      <btn-basic to="/cafedetail/1" label="앰비언스 상세" />
      <btn-basic to="/test/card" color="secondary" label="카드 테스트" />
      <btn-basic to="/test/icon" color="dark" label="아이콘 테스트" />
      <btn-basic
        to="/test/modal"
        color="warning"
        label="모달 테스트"
        icon="flight"
      />
      <btn-basic
        to="/test/some"
        color="info"
        label="기타등등 테스트"
        size="lg"
      />
      <btn-basic
        @click="testMethod"
        color="primary"
        label="메일보내기"
        icon="mail"
      />
      <btn-basic label="사이즈 sm" size="sm" />
      <btn-basic label="리뷰 쓰기" size="md" />
      <btn-basic label="링크 공유" size="md" />
      <btn-basic label="dense false" size="md" :dense="false" />
      <btn-basic label="커스텀패딩" size="md" padding="2px 10px 2px 15px" />
      <btn-basic
        :dense="false"
        size="md"
        to="map"
        color="primary"
        label="지도 표시하기"
        icon="map"
        padding="4px 15px 4px 15px"
      />
    </div>
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-basic-icon</p>
      <btn-basic-right color="primary" label="리뷰 쓰기" icon="mail" />
      <btn-basic-right color="secondary" label="리뷰 쓰기" icon="edit" />
      <btn-basic-right color="secondary" label="공유" icon="share" />
    </div>
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-icon</p>
      <btn-icon />
      <btn-icon color="warning" />
      <btn-icon color="grey-5" />
      <btn-icon :flat="true" />
      <btn-icon :flat="true" color="warning" />
      <btn-icon :flat="true" color="grey-5" />
      <btn-icon color="grey-7" icon="menu" />
    </div>
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-logo, btn-my-avatar, btn-req-new-cafe</p>
      <btn-logo to="/" />
      <btn-req-new-cafe to="reqnewcafe" />
      <btn-my-avatar to="profile" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import BtnBasicRight from 'src/components/Button/BtnBasicRight.vue'
import BtnIcon from 'src/components/Button/BtnIcon.vue'
import BtnLogo from 'src/components/Button/BtnLogo.vue'
import BtnMyAvatar from 'src/components/Button/BtnMyAvatar.vue'
import BtnReqNewCafe from 'src/components/Button/BtnReqNewCafe.vue'

export default defineComponent({
  components: {
    BtnBasic,
    BtnBasicRight,
    BtnIcon,
    BtnLogo,
    BtnReqNewCafe,
    BtnMyAvatar
  },
  data() {
    return {}
  },
  methods: {
    testMethod() {
      console.log('testMethod')
    }
  }
})
</script>
