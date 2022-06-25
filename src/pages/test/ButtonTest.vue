<template>
  <q-page class="q-pa-sm">
    버튼 테스트
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-basic</p>
      <btn-basic to="/cafe/4" label="앰비언스 상세" />
      <btn-basic to="/test/card" color="secondary" label="카드 테스트" />
      <btn-basic to="/test/card2" label="카드 테스트2" />
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
      <btn-basic :rounded="false" label="사각" size="md" />
      <btn-basic label="dense false" size="lg" :dense="false" />
      <btn-basic label="dense" size="lg" />
      <btn-basic label="커스텀패딩" size="md" padding="2px 10px 2px 15px" />
      <btn-basic
        size="md"
        to="map"
        color="primary"
        label="지도 표시하기"
        icon="map"
        padding="4px 15px 4px 15px"
      />
      <btn-basic to="/test/cnotedetail2" label="커핑노트 디테일" size="md" />
      <btn-basic to="/test/carduserinfo" label="carduserinfo" size="md" />

      <!-- 사진 모두 보기 -->
      <btn-basic
        class="btn_show_all bg-grey-2"
        :rounded="false"
        icon="dashboard"
        color="grey-9"
        label="사진 모두 보기"
        padding="3px 8px "
      />
      <btn-basic
        to="/test/imageupload"
        label="이미지 업로드"
        icon="image"
        padding="5px 10px"
      />
    </div>
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-basic-right</p>
      <btn-basic-right
        color="primary"
        label="가입서베이"
        icon="account_circle"
        to="/signup"
      />
      <btn-basic-right color="primary" label="리뷰 쓰기" icon="mail" />
      <btn-basic-right color="secondary" label="리뷰 쓰기" icon="edit" />
      <btn-basic-right color="secondary" label="공유" icon="share" />
      <btn-basic-right size="sm" color="primary" label="리뷰" icon="mail" />
      <btn-basic-right
        size="sm"
        color="secondary"
        label="리뷰 쓰기"
        icon="edit"
      />
      <btn-basic-right size="sm" color="secondary" label="공유" icon="share" />
      <btn-basic-right size="lg" color="primary" label="리뷰" icon="mail" />
      <btn-basic-right
        size="lg"
        color="secondary"
        label="리뷰 쓰기"
        icon="edit"
      />
      <btn-basic-right size="lg" color="secondary" label="공유" icon="share" />
      <btn-basic-right
        :rounded="false"
        color="secondary"
        label="공유"
        icon="share"
      />
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
      <p>btn-logo, btn-req-new-cafe, btn-my-avatar, btn-avatar</p>
      <btn-logo to="/" />
      <btn-req-new-cafe to="reqnewcafe" />
      <btn-my-avatar to="profile" />
      <btn-avatar to="profile" />
    </div>
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>btn-like, btn-been-there, btn-mark</p>
      <div class="row items-center">
        <btn-like
          :user_id="0"
          like_what="cafe"
          :id_what="0"
          :is_liked="false"
          :likeit_cnt="100"
        />
        <btn-been-there :user_id="0" :cafe_id="0" :been_there="false" />
        <btn-book-mark :user_id="0" :cnote_id="0" :is_marked="false" />
      </div>
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
import BtnAvatar from 'src/components/Button/BtnAvatar.vue'
import BtnReqNewCafe from 'src/components/Button/BtnReqNewCafe.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnBeenThere from 'src/components/Button/BtnBeenThere.vue'
import BtnBookMark from 'src/components/Button/BtnBookMark.vue'

export default defineComponent({
  components: {
    BtnBasic,
    BtnBasicRight,
    BtnIcon,
    BtnLogo,
    BtnReqNewCafe,
    BtnMyAvatar,
    BtnAvatar,
    BtnLike,
    BtnBeenThere,
    BtnBookMark
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
