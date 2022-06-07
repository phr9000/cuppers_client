<template>
  <br />
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
</template>

<script>
// import TestCard from '@/components/TestCard.vue'
// import TestCard from 'src/components/TestCard.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  // components: { TestCard },
  name: 'IndexPage',
  data() {
    return {
      val: false,
      hello: 'hello'
      // apiUrl: 'http://localhost:3000/posts'
    }
  },
  mounted() {
    // this.$axios
    //   .get(this.apiUrl)
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }
})
</script>
