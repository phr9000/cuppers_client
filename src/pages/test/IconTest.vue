<template>
  <q-page class="q-pa-sm">
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>아이콘 테스트</p>
      <!-- 구글 마테리얼 아이콘 : m_붙일 필요 없음 -->
      <q-icon size="md" name="close" />
      <q-icon size="md" name="storefront" />
      <q-icon size="md" name="coffee_maker" />
      <q-icon size="md" name="photo_camera" />
      <q-icon size="md" name="add_a_photo" />
      <br />
      <!-- eva icons : quasar.config 에서 extras 주석 해제 -->
      <q-icon size="md" name="eva-close" />
      <q-icon size="md" name="eva-camera-outline" />
      <q-icon size="md" name="eva-camera" />
      <q-icon size="md" name="eva-bell" />

      <!-- 아이콘 있는 버튼 예제 -->
      <q-btn
        align="between"
        class="btn-fixed-width"
        color="accent"
        label="Align between"
        icon="flight_takeoff"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  }
})
</script>
