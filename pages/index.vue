<template>
  <div class="pa-4">
    <!-- <div style="height: 500px;">
      <ejs-barcodegenerator
          id="barcode"
          ref="barcodeControl"
          value="123456789"
          mode="svg"
        ></ejs-barcodegenerator>
        <ejs-datamatrixgenerator
          class="barcodeStyle"
          id="barcode"
          ref="barcodeControl"
          value="123456789"
          width="48px"
          height="48px"
          mode="svg"
        ></ejs-datamatrixgenerator>
    </div> -->
    <div class="container w-100">
      <div style="display: flex">
        <div style="display: flex; flex-wrap: wrap">
          <h3 style="margin-top: 0">Code info:</h3>
          <label class="w-100 d-flex">
            <!-- Generer : -->
            <div class="d-flex w-100">
              <span>
                DMX:
                <input v-model="type" type="radio" value="DMX" />
              </span>
              <span style="margin-left: 15px">
                Barcode:
                <input v-model="type" type="radio" value="barcode" />
                (12 characteres)
              </span>
            </div>
          </label>
          <label class="w-100">
            Prefix :
            <input v-model="prefix" type="text" :disabled="type === 'barcode'" />
          </label>
          <label class="w-100">
            Sufix :
            <input v-model="prefix" type="text" :disabled="type === 'barcode'" />
          </label>
          <label class="w-100">
            Nombre de code:
            <input v-model="codeNumber" type="text" />
          </label>
          <label class="w-100">
            Only one at the time:
            <span>
              <input v-model="onlyOne" type="checkbox" value="DMX" />
            </span>
          </label>
        </div>

        <div>
          <div style="display: flex; flex-wrap: wrap">
            <label class="w-100">
              <select v-model="selectedSavedCode">
                <option value="">Sélectionner un code enregistrer</option>
                <option v-for="code in savedCodes" :key="code" :value="code">{{ code }}</option>
              </select>
            </label>
            <label class="w-100">
              Code à générer
              <input v-model="existingCode" type="text" :disabled="type === 'barcode'" />
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
        <div>
          <span class="btn" v-if="onlyOne" @click="next"> Next </span>
          <span class="btn" v-if="onlyOne && codeToShow !== 0" @click="prev"> Prev </span>
        </div>
      </div>
      <span class="btn" @click="openSavedCode = true"> Open saved code </span>
    </div>

    <div v-if="codes.length > 0" class="listBarcode">
      <div class="container">
        <ejs-datamatrixgenerator
          v-for="(code, index) in codes"
          v-show="!onlyOne || (onlyOne && index === codeToShow)"
          :key="type + code"
          class="barcodeStyle"
          id="barcode"
          ref="barcodeControl"
          :value="`${prefix}${code}`"
          width="100px"
          height="100px"
        >
          <div class="control">
            <div @click="savedSelectedCode(`${prefix}${code}`)" class="btn">Save</div>
          </div>
        </ejs-datamatrixgenerator>
        <!-- <img
          :src="`https://barcode.tec-it.com/barcode.ashx?data=${prefix}${code}${linkSufix}`"
        /> -->
      </div>
    </div>
    <SavedCode v-model="openSavedCode" :type="type" />
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
      existingCode: '',
      savedCodes: [],
      selectedSavedCode: '',
      openSavedCode: false
    }
  },
  computed: {
    linkSufix() {
      if (this.type === 'barcode') {
        return '&code=UPCA'
      } else {
        return '&code=DataMatrix&translate-esc=on'
      }
    },
  },
  watch: {
    type(val) {
      if (val === 'DMX') {
        this.prefix = 'A'
      } else {
        this.prefix = ''
      }
    },
  },
  methods: {
    generate() {
      this.codes = []
      this.codeToShow = 0
      const array = new Uint32Array(this.codeNumber + 1)
      console.log('getRandomValues ; ', window.crypto.getRandomValues(array))

      if (this.type === 'DMX') {
        for (let i = 0; i <= this.codeNumber; i++) {
          this.codes = window.crypto.getRandomValues(array)
        }
      } else {
        for (let i = 0; i <= this.codeNumber; i++) {
          this.codes.push(`01${array[i].toString().slice(0, 9)}2`)
        }
        // for (let i = 0; i <= this.codeNumber; i++) {
        //   this.codes.push(
        //     `01${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}${this.randomN()}2`
        //   )
        // }
      }
      this.saveLastGeneratedCode()
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
    },
    prev() {
      if (this.codeToShow !== 0) {
        this.codeToShow -= 1
      }
    },
    saveLastGeneratedCode() {
      localStorage.setItem(`save_last_${this.type}`, this.codes)
    },
    getLastSavedGeneratedCode() {
      this.code = localStorage.getItem(`save_last_${this.type}`).split(',')
    },
    savedSelectedCode(code) {
      this.savedCodes.push(code)
      localStorage.setItem(`save_${this.type}`, this.savedCodes)
    },
    getLastSavedCode() {
      this.savedCodes = localStorage.getItem(`save_last_${this.type}`).split(',')
    },
  },
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
  background-color: lightgrey;
  border-radius: 5px;
  margin: 4px 4px 0 0;
  display: inline-flex;
  width: auto;
  cursor: pointer;
}
</style>
