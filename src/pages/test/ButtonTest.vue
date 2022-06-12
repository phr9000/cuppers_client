<template>
  <q-page class="q-pa-sm">
    버튼 테스트
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-basic</p>
      <btn-basic @click="testMethod" />
      <btn-basic to="/cafedetail/1" label="앰비언스 상세" />
      <btn-basic to="/test/card" color="secondary" label="카드 테스트" />
      <btn-basic to="/test/icon" color="dark" label="아이콘 테스트" />
      <btn-basic to="/test/modal" color="warning" label="모달 테스트" />
      <btn-basic to="/test/like" color="warning" label="좋아요 테스트" />
      <btn-basic to="/test/some" color="info" label="기타등등 테스트" />
      <btn-basic
        @click="testMethod"
        color="primary"
        label="인포 윈도우 표시/닫기"
      />
    </div>
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-icon</p>
      <btn-icon />
      <btn-icon color="warning" />
      <btn-icon color="grey-5" />
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
import BtnIcon from 'src/components/Button/BtnIcon.vue'
import BtnLogo from 'src/components/Button/BtnLogo.vue'
import BtnMyAvatar from 'src/components/Button/BtnMyAvatar.vue'
import BtnReqNewCafe from 'src/components/Button/BtnReqNewCafe.vue'

export default defineComponent({
  components: {
    BtnBasic,
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
