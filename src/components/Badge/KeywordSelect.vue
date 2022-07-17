<template>
  <q-img class="card" :class="{ checked: checked }" :src="bgUrl">
    <div
      @click="handleClick"
      class="absolute-full text-subtitle2 flex flex-center"
    >
      <div class="content column items-center q-pt-sm">
        <div class="caption text-center" :class="{ by_user: by_user }">
          {{ text }}
        </div>
      </div>
    </div>
  </q-img>
</template>

<script>
export default {
  name: 'KeywordSelect',
  props: {
    id: { type: Number, required: true },
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
      default: ''
    },
    by_user: {
      type: Boolean,
      default: false
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
        return `${process.env.STATIC}/images/keyword/0/cafe_bg_defualt.jpg`
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
  border: 1px solid $grey-6;
  width: 100%;
  height: 75px;
  word-break: keep-all;
  &.checked {
    border: 2px solid $secondary;
    .caption {
      color: $grey-9;
      &.by_user {
        color: $primary;
      }
    }
  }
  .caption {
    font-size: 0.9rem;
    &.by_user {
      color: $grey-9;
    }
  }
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
// .icon_checked {
//   position: absolute;
//   top: 5px;
//   right: 5px;
// }
</style>
