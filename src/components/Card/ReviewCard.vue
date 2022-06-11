<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="user-info">
          <q-avatar>
            <img :src="user.profile" />
          </q-avatar>
          <span class="text-overline user-name">{{ user.name }}</span>
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ cafe.name }}</div>
        <div class="q-pa q-gutter-md b">
          <q-badge v-for="coffee in cafe.coffee" :key="coffee">{{
            coffee
          }}</q-badge>
        </div>
        <div class="q-pa q-gutter-md">
          <q-badge
            v-for="tag in cafe.tags"
            :key="tag"
            outline
            color="primary"
            >{{ tag }}</q-badge
          >
        </div>

        <div class="text-caption text-grey">
          {{ cafe.review }}
        </div>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <q-img
          class="rounded-borders"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'catcat',
        profile:
          'https://tgzzmmgvheix1905536.cdn.ntruss.com/2020/10/07ee24b4b87f4313b71fe376feb2895c'
      },
      cafe: {
        name: '유의미로스터즈',
        coffee: ['게이샤', '네츄럴'],
        tags: ['맛있음', '맛있음', '맛있음'],
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.my-card {
  width: 600px;
  height: 400px;
  .user-info {
    width: 30px;
    display: flex;
    align-items: center;
    margin: 10px;
  }
  .user-name {
    font-size: 20px;
    margin: 10px;
  }
}
</style>
