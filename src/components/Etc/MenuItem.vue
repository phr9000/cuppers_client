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
        <div class="name" :class="{ is_review: is_review }">
          {{ name }}
        </div>
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
      <badge-aroma v-for="aroma in aromaNotes" :key="aroma" :value="aroma" />
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
    menu_aromanote: {
      type: String,
      default: null
    },
    type: { type: String, default: 'br' },
    hot: { type: Number, default: null },
    ice: { type: Number, default: null },
    is_signature: { type: Boolean, default: false },
    is_review: { type: Boolean, default: false }
  },
  data() {
    return {
      priceHot: null,
      priceIce: null
    }
  },
  computed: {
    aromaNotes() {
      // console.log(this.review.menu_aromanote)
      if (this.menu_aromanote) {
        return this.menu_aromanote.split(',')
      } else {
        return []
      }
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
  margin-right: 4px;
  font-size: 0.9rem;
  &.is_review {
    font-size: 1rem;
  }
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

.aromanote_wrap {
  max-height: 48px;
  overflow-y: hidden;
}
</style>
