<template>
  <Modal v-model="open">
    <template>
      <h3>Saved Dmx:</h3>

      <div class="listBarcode flex-start">
        <div class="container">
          <DMX v-for="code in codeList" :key="type + code.code" :code="code.code" :title="code.title">
            <template #control>
              <div class="control">
                <div @click="DeleteDMX(code.code)" class="btn red">Delete</div>
              </div>
            </template>
          </DMX>
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
      this.codeList = JSON.parse(localStorage.getItem(`save_${this.type}`))
      console.log('localStorage.getItem(`saved_${this.type}`) : ', localStorage.getItem(`save_${this.type}`))
      console.log('this.type : ', this.type)
      console.log('codeList : ', this.codeList)
    },
  },
  methods: {
    DeleteDMX(code) {
      this.codeList = this.codeList.filter((t) => t.code !== code)
      localStorage.setItem(`save_${this.type}`, JSON.stringify(this.codeList))
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-start {
  justify-content: flex-start;
}

.red {
  background-color: rgb(180, 41, 41) !important;
  color:white;
}
</style>
