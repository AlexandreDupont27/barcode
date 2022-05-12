<template>
  <Modal v-model="open">
    <template>
      <h3>Last used {{ type }}:</h3>

      <div class="listBarcode flex-start">
        <div class="container">
          <template v-if="type === 'DMX'">
            <DMX v-for="code in codeList" :key="type + code" :code="code"> </DMX>
          </template>
          <template v-else>
            <Barcode v-for="code in codeList" :key="type + code.code" :code="code.code" :link-suffix="code.suffix">
            </Barcode>
          </template>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'DMX',
    },
  },
  computed: {
    open: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  data() {
    return {
      codeList: [],
    }
  },
  watch: {
    value() {
      if (localStorage.getItem(`save_last_${this.type}`)) {
        if (this.type === 'DMX') {
          this.codeList = localStorage.getItem(`save_last_${this.type}`).split(',')
        } else {
          this.codeList = JSON.parse(localStorage.getItem(`save_last_${this.type}`))
        }
      }
    },
  },
  methods: {
    DeleteDMX(code) {
      this.codeList = this.codeList.filter((t) => t.code !== code)
      localStorage.setItem(`save_${this.type}`, JSON.stringify(this.codeList))
    },
  },
}
</script>

<style lang="scss" scoped>
.flex-start {
  justify-content: flex-start;
}

.red {
  background-color: rgb(180, 41, 41) !important;
  color: white;
}

.listBarcode {
  max-height: 500px;
  overflow: auto;

  @media screen and (max-width: 767px) {
    max-height: 95%;
  }
}
</style>
