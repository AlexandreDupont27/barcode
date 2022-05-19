<template>
  <Modal v-model="open">
    <template>
      <h3>Last used {{ type }}:</h3>

      <div class="listBarcode flex-start">
        <div class="container">
          <template v-if="type === 'DMX'">
            <DMX
              v-for="code in codeList"
              :class="{ hide: selectedCode && selectedCode !== code.code }"
              :key="type + code"
              :code="code"
            >
              <template #control>
                <div class="control">
                  <div v-if="!selectedCode" @click="showMe(code.code)" class="btn blue">Show only me</div>
                  <div v-if="selectedCode === code.code" @click="showAll()" class="btn blue">Show All</div>
                </div>
              </template>
            </DMX>
          </template>
          <template v-else>
            <Barcode
              v-for="code in codeList"
              :class="{ hide: selectedCode && selectedCode !== code.code }"
              :key="type + code.code"
              :code="code.code"
              :link-suffix="code.suffix"
            >
              <template #control>
                <div class="control">
                  <div v-if="!selectedCode" @click="showMe(code.code)" class="btn blue">Show only me</div>
                  <div v-if="selectedCode === code.code" @click="showAll()" class="btn blue">Show All</div>
                </div>
              </template>
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
      selectedCode: '',
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
    showMe(code) {
      this.selectedCode = code
    },
    showAll() {
      this.selectedCode = ''
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
