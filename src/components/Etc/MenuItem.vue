<template>
  <div class="q-mb-xs">
    <div class="q-mb-xs row justify-between items-center">
      <div class="row items-center">
        <q-icon
          v-if="type === 'br'"
          size="xs"
          name="img:/icons/br.png"
          class="q-mr-xs"
        /><q-icon v-else size="xs" name="img:/icons/va.png" class="q-mr-xs" />
        <div class="name">{{ name }}</div>
        <div v-if="is_signature" class="badge_signature">SIGNATURE</div>
      </div>
      <div class="row items-center">
        <q-icon
          v-if="priceHot"
          size="xs"
          name="img:/icons/hot.png"
          class="q-mx-xs"
        />
        <div v-if="priceHot">{{ priceHot }}</div>
        <q-icon
          v-if="priceIce"
          size="xs"
          name="img:/icons/ice.png"
          class="q-ml-xs"
        />
        <div v-if="priceIce">{{ priceIce }}</div>
      </div>
    </div>
    <div v-if="aromaNotes" class="aromanote_wrap">
      <badge-aroma
        v-for="aroma in aromaNotes"
        :key="aroma.keyword_name"
        :value="aroma.keyword_name"
      />
    </div>
  </div>
</template>

<script>
import BadgeAroma from 'src/components/Badge/BadgeAroma.vue'
import useFommatter from 'src/composables/useFommatter'
const { formatNumber } = useFommatter()

export default {
  components: { BadgeAroma },
  props: {
    name: { type: String, default: '음료 이름' },
    aromaNotes: {
      type: Array,
      default: () => {
        return null
      }
    },
    type: { type: String, default: 'br' },
    hot: { type: Number, default: null },
    ice: { type: Number, default: null },
    is_signature: { type: Boolean, default: false }
  },
  data() {
    return {
      priceHot: null,
      priceIce: null
    }
  },
  mounted() {
    if (this.hot) {
      this.priceHot = formatNumber(this.hot, '#,###')
    }
    if (this.ice) {
      this.priceIce = formatNumber(this.ice, '#,###')
    }
  }
}
</script>

<style lang="scss" scoped>
.name {
  margin-right: 3px;
}
.badge_signature {
  font-size: 0.4rem;
  font-weight: 600;
  color: $red-3;
  border: 1px solid $red-3;
  border-radius: 0.5rem;
  padding: 0 0.3rem;
  margin: 3px 0;
}
</style>
