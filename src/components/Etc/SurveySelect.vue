<template>
  <q-img class="card" :src="bgUrl">
    <div
      @click="handleClick"
      class="absolute-full text-subtitle2 flex flex-center"
    >
      <div class="content column items-center q-pt-sm">
        <div v-if="icon" class="q-mb-sm">
          <q-avatar size="md" square>
            <img :src="iconUrl" />
          </q-avatar>
        </div>
        <div v-else class="q-mb-sm">
          <q-icon v-if="type === 'coffee'" size="md" name="img:/icons/br.png" />
          <q-icon
            v-else-if="type === 'brewing'"
            size="md"
            name="img:/icons/gr.png"
          />
          <q-icon v-else size="md" name="img:/icons/cafe.png" />
        </div>

        <div class="text-center">{{ text }}</div>
        <q-icon
          v-if="checked"
          class="icon_checked"
          size="xl"
          color="positive"
          name="check_circle_outline"
        />
      </div>
    </div>
  </q-img>
</template>

<script>
export default {
  name: 'SurveySelect',
  props: {
    id: { type: Number, required: true },
    type: { type: String, required: true }, // 'coffee' or 'cafe' or 'brewing'
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    bg: {
      type: String,
      default: 'https://t1.daumcdn.net/cfile/blog/2362A136560CB9B501'
    }
  },
  data() {
    return {
      checked: false
    }
  },
  computed: {
    bgUrl() {
      if (!this.bg || this.bg == '') {
        if (this.type === 'coffee') {
          return 'https://t1.daumcdn.net/cfile/blog/2362A136560CB9B501'
        } else return 'https://t1.daumcdn.net/cfile/blog/2362A136560CB9B501'
      } else {
        if (this.bg.startsWith('images/')) {
          return `${process.env.STATIC}/${this.bg}`
        }
        return this.bg
      }
    },
    iconUrl() {
      if (this.icon.startsWith('images/')) {
        return `${process.env.STATIC}/${this.icon}`
      }
      return this.icon
    }
  },
  methods: {
    handleClick() {
      if (!this.checked) {
        this.checked = true
        // console.log(`keword id ${this.id} checked`)
        this.$emit('checked', this.id)
      } else {
        this.checked = false
        // console.log(`keword id ${this.id} unchecked`)
        this.$emit('unchecked', this.id)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  background: $grey-2;
  border-radius: $border-radius;
  width: 175px;
  height: 175px;
  word-break: keep-all;
}
.absolute-full {
  cursor: pointer;
  background: rgba(206, 206, 206, 0.75);
  transition: all 0.4s;
  color: $grey-10;
  &:hover {
    background: rgba(206, 206, 206, 0.55);
  }
}
.icon_checked {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
