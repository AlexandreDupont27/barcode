<template>
  <div class="pa-4">
    <div class="container w-100">
      <div style="display: flex">
        <div style="display: flex; flex-wrap: wrap">
          <label class="w-100">
            Only one at the time:
            <span>
              <input v-model="onlyOne" type="checkbox" value="DMX" />
            </span>
          </label>
          <label class="w-100 d-flex">
            Generer :
            <div class="d-flex flex-wrap">
              <span class="w-100">
                DMX:
                <input v-model="type" type="radio" value="DMX" />
              </span>
              <span class="w-100">
                Barcode:
                <input v-model="type" type="radio" value="barcode" />
                (12 characteres)
              </span>
            </div>
          </label>
          <label class="w-100">
            Nombre de code:
            <input v-model="codeNumber" type="text" />
          </label>
          <label class="w-100">
            prefix du DMX
            <input
              v-model="prefix"
              type="text"
              :disabled="type === 'barcode'"
            />
          </label>
        </div>

        <div>
          <div style="display: flex; flex-wrap: wrap">
            <label class="w-100">
              Code à générer
              <input
                v-model="existingCode"
                type="text"
                :disabled="type === 'barcode'"
              />
            </label>
            <span class="w-100">
              <span class="btn" @click="generateSolo"> Generate </span>
              <span class="btn" v-if="showSolo" @click="resetSolo"> reset </span>
            </span>
          </div>
          <img
            v-if="showSolo"
            style="margin-top: 20px"
            :src="`https://barcode.tec-it.com/barcode.ashx?data=${existingCode}${linkSufix}`"
          />
        </div>
      </div>
      <!-- <label class="w-100">
        from
        <input v-model="from" type="number" />
      </label>
      <label class="w-100">
        to
        <input v-model="to" type="number" />
      </label> -->
      <div class="w-100" style="display: flex; justify-content: space-between">
        <span>
          <span class="btn" @click="generate"> Generate </span>
          <span class="btn" @click="reset"> Reset </span>
        </span>
        <span class="btn" v-if="onlyOne" @click="next"> Next </span>
      </div>
    </div>

    <div v-if="codes.length > 0" class="listBarcode">
      <div
        v-for="(code, index) in codes"
        v-show="!onlyOne || (onlyOne && index === codeToShow)"
        :key="type + code"
        class="container"
      >
        <img
          :src="`https://barcode.tec-it.com/barcode.ashx?data=${prefix}${code}${linkSufix}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeNumber: 20,
      prefix: 'A',
      from: 0,
      to: 0,
      type: 'DMX',
      codes: [],
      onlyOne: false,
      showSolo: false,
      codeToShow: 0,
      existingCode: ''
    }
  },
  computed: {
    linkSufix() {
      if (this.type === 'barcode') {
        return '&code=UPCA'
      } else {
        return '&code=DataMatrix&translate-esc=on'
      }
    }
  },
  watch: {
    type(val) {
      if (val === 'DMX') {
        this.prefix = 'A'
      } else {
        this.prefix = ''
      }
    }
  },
  methods: {
    generate() {
      this.codes = []
      this.codeToShow = 0
      const array = new Uint32Array(this.codeNumber + 1);
      console.log('getRandomValues ; ', window.crypto.getRandomValues(array))

      if (this.type === 'DMX') {
        for (let i = 0; i <= this.codeNumber; i++) {
          this.codes = window.crypto.getRandomValues(array)
        }
      } else {
        for (let i = 0; i <= this.codeNumber; i++) {
          this.codes.push(
            `01${array[i].toString().slice(0, 9)}2`
          )
        }
        // for (let i = 0; i <= this.codeNumber; i++) {
        //   this.codes.push(
        //     `01${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}2`
        //   )
        // }
      }
      console.log('this.codes ; ', this.codes)
    },
    generateSolo() {
      this.showSolo = true
    },
    resetSolo() {
      this.existingCode = ''
      this.showSolo = false
    },
    randomN() {
      return Math.floor(Math.random() * 10)
    },
    reset() {
      this.codes = []
    },
    next() {
      if (this.codeToShow < this.codeNumber) {
        this.codeToShow += 1
      } else {
        this.onlyOne = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  border: 1px solid black;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.listBarcode {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin:20px -10px -10px;

  .container {
    padding:10px;
    border:1px solid grey;
    margin:10px;
  }
}

.w-100 {
  width: 100%;
}

label {
  margin-bottom: 8px;
}

.d-flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.pa-4 {
  padding: 16px;
}

.btn {
  padding: 8px;
  background-color:lightgrey;
  border-radius: 5px;
  margin: 4px 4px 0 0;
  display:inline-flex;
  width:auto;
  cursor:pointer;
}
</style>
