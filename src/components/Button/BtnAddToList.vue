<template>
  <q-btn
    @click="handleCLick"
    flat
    dense
    rounded
    color="primary"
    class="btn row no-wrap items-center"
  >
    <q-icon size="xs" class="icon_fav" name="playlist_add" />
    <span class="text q-ml-xs">저장</span>

    <q-menu>
      <q-list style="min-width: 100px">
        <q-item
          v-for="item in mylist"
          :key="item.mylist_id"
          clickable
          dense
          v-close-popup
          @click="addCafeToList(item.mylist_id)"
        >
          <q-item-section>{{ item.mylist_name }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'BtnAddToList',
  components: {},
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user
    })

    return {
      user
    }
  },
  props: {
    cafe_id: { type: Number, required: true }
  },
  data() {
    return {
      mylist: []
    }
  },
  mounted() {},
  methods: {
    // 해당 카페를 내 마이리스트에 추가
    handleCLick(event) {
      event.stopPropagation() // 버튼 클릭시 상위 컴포넌트 클릭이벤트 호출 방지

      console.log('click', this.cafe_id)
      let apiUrl = `${process.env.API}/cafe/mylist/all/${this.user.uid}` // real-server
      console.log(apiUrl)
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.mylist = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 마이리스트에 카페 추가
    addCafeToList(mylist_id) {
      console.log(this.cafe_id + ' -> ' + mylist_id)

      // -> db에 title 전달하여 마이리스트에 새 리스트 만드는 라우트
      let apiUrl = `${process.env.API}/cafe/mylist/add`
      this.$axios
        .post(apiUrl, {
          param: {
            mylist_id: mylist_id,
            cafe_id: this.cafe_id
          }
        })
        .then((result) => {
          if (result.data.insertId > 0) {
            this.$q.notify({
              position: 'top',
              timeout: 1000,
              message: '마이리스트에 저장했습니다',
              color: 'info'
            })
          }
        })
        .catch((err) => {
          console.log('마이리스트에 저장 실패')
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  line-height: 18px;
  border-radius: 16px;
  padding: 2px 10px;
  color: $grey-5 !important;
}
</style>
