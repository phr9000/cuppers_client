<template>
  <!-- Card, 카페 추천리스트 -->
  <div v-for="list in 4" :key="list">
    <q-card class="my-card">
      <q-img
        src="http://designcoffee.com/web/images/TAG/Round7/coffee%20libre_interview%20(3).jpg"
      />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">커피리브레</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            <q-icon name="place" />
            250m
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">연남점</div>
        <div class="text-caption text-grey">
          커피리브레는 커피를 매개로 만나는 사람들의 미각적 행복과 기술적 진보를
          위해 노력합니다.
        </div>
      </q-card-section>
      <q-separator />
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      stars: ref(4)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  float: left;
  margin: 30px;
}
</style>
