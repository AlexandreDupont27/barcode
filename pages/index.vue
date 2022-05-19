<template>
  <div class="pa-4">
    <div class="container w-100">
      <div :class="['codeSettings', { showGenerateSolo: showGenerateCustom }]">
        <h3 class="codeTitle">
          Code info:
          <span class="btn generateCustom" v-if="!showGenerateCustom" @click="showGenerateCustom = true">
            Generate customs</span
          >
          <span class="btn generateCustom" v-if="showGenerateCustom" @click="showGenerateCustom = false">
            Generate Multiples</span
          >
        </h3>
        <div class="codeSetting">
          <label class="w-100 d-flex">
            <!-- Generer : -->
            <div class="d-flex w-100">
              <span style="margin-right: 16px">
                DMX:
                <input v-model="type" type="radio" value="DMX" />
              </span>
              <span>
                barcode:
                <input v-model="type" type="radio" value="barcode" />
              </span>
            </div>
          </label>
          <label class="w-100">
            Type de barcode :
            <select v-model="barcodeType">
              <option v-for="code in barcodeTypes" :key="code.name" :value="code">{{ code.name }}</option>
            </select>
            <span>({{ barcodeType.numberNeeded }}) number</span>
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

        <div class="codeSolo">
          <div style="display: flex; flex-wrap: wrap">
            <label class="w-100">
              Code à générer
              <input v-model="existingCode" type="text" />
              <span class="w-100 d-flex">
                {{ `${existingCode.length}/${barcodeType.numberNeeded}` }}
              </span>
            </label>
            <span class="w-100">
              <span class="btn" @click="generateSolo"> Generate </span>
              <span class="btn" v-if="showSolo" @click="resetSolo"> reset </span>
            </span>
          </div>
          <Barcode v-if="showSolo" :code="existingCode.toString()" :link-suffix="barcodeType.suffix">
            <template #control>
              <div class="control">
                <div @click="savedDMX(existingCode)" class="btn">Save</div>
              </div>
            </template>
          </Barcode>
        </div>
      </div>
      <div :class="['w-100 settingControl', , { showGenerateSolo: showGenerateCustom }]">
        <span>
          <span class="btn" @click="generate"> Generate </span>
          <span class="btn" @click="reset"> Reset </span>
        </span>
        <div>
          <span class="btn" v-if="onlyOne && codeToShow !== 0" @click="prev"> Prev </span>
          <span v-if="onlyOne" style="margin-right: 4px">{{ codeToShow + 1 }}</span>
          <span class="btn" v-if="onlyOne" @click="next"> Next </span>
        </div>
      </div>
      <div class="margin-top:10px">
        <span class="btn" @click="openSavedCode = true"> Open saved code </span>
        <span class="btn" @click="openLastUsedCode = true"> Open last used code </span>
      </div>
    </div>

    <div v-if="codes.length > 0" :class="['listBarcode', , { showGenerateSolo: showGenerateCustom }]">
      <Barcode
        v-for="(code, index) in codes"
        :class="{ hide: selectedCode && selectedCode !== code }"
        v-show="!onlyOne || (onlyOne && index === codeToShow)"
        :key="type + code"
        :code="code.toString()"
        :link-suffix="barcodeType.suffix"
      >
        <template #control>
          <div class="control">
            <div @click="savedDMX(code)" class="btn">Save</div>
            <div v-if="!selectedCode" @click="showMe(code)" class="btn blue">Show only me</div>
            <div v-if="selectedCode === code" @click="showAll()" class="btn blue">Show All</div>
          </div>
        </template>
      </Barcode>
    </div>
    <SavedCode v-model="openconfirmation" :type="type" :code="selectedSavedCode" :barcode-suffix="barcodeType.suffix" />
    <ShowSavedCode v-model="openSavedCode" :type="type" />
    <ShowLastUsedCode v-model="openLastUsedCode" :type="type" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeNumber: 20,
      from: 0,
      to: 0,
      type: 'barcode',
      barcodeType: {
        name: 'UPC-A',
        suffix: 'UPCA',
        numberNeeded: 11,
      },
      barcodeTypes: [
        {
          name: 'UPC-A',
          suffix: 'UPCA',
          numberNeeded: 11,
        },
        {
          name: 'UPC-E',
          suffix: 'UPCE',
          numberNeeded: 7,
        },
        {
          name: 'EAN-8',
          suffix: 'EAN8',
          numberNeeded: 7,
        },
        {
          name: 'EAN-13',
          suffix: 'EAN13',
          numberNeeded: 12,
        },
      ],
      codes: [],
      onlyOne: false,
      showSolo: false,
      codeToShow: 0,
      existingCode: '',
      savedCodes: [],
      selectedSavedCode: '',
      openSavedCode: false,
      openconfirmation: false,
      openLastUsedCode: false,
      showGenerateCustom: false,
      selectedCode: '',
    }
  },
  computed: {
    linkSufix() {
      if (this.barcodeType === 'barcode') {
        return '&code=UPCA'
      }
    },
  },
  watch: {
    type(val) {
      if (val === 'DMX') {
        this.$router.push('/dmx')
      }
    },
    existingCode(value) {
      if (value?.length > 7) {
        if (value.length > 11) {
          this.barcodeType = this.barcodeTypes[3]
        } else {
          this.barcodeType = this.barcodeTypes[0]
        }
      } else {
        this.barcodeType = this.barcodeTypes[1]
      }
    },
  },
  methods: {
    generate() {
      this.codes = []
      this.codeToShow = 0
      let array = new Uint32Array(parseInt(this.codeNumber))
      let randomArray = window.crypto.getRandomValues(array)

      randomArray.forEach((t) => {
        const randomNumber = Math.floor(Math.random(t) * t)
        const finalNumber = `${randomNumber}${t}`
        this.codes.push(finalNumber.toString().substring(0, this.barcodeType.numberNeeded))
      })

      this.saveLastGeneratedCode()
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
      if (this.codeToShow < parseInt(this.codeNumber)) {
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
      let lastGeneratedCode = this.codes.map((t) => {
        return {
          code: t,
          suffix: this.barcodeType.suffix,
        }
      })

      localStorage.setItem(`save_last_${this.type}`, JSON.stringify(lastGeneratedCode))
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
    savedDMX(dmx) {
      this.selectedSavedCode = dmx
      this.openconfirmation = true
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
.codeSettings {
  display: flex;
  align-items: baseline;
}
.codeSetting {
  display: flex;
  flex-wrap: wrap;
}

.generateCustom {
  display: none;
}

.settingControl {
  display: flex;
  justify-content: space-between;
  &.showGenerateSolo {
    display: none;
  }
}

.codeTitle {
  display: none;
  margin-top: 0;
  width: 100%;
}

@media screen and (max-width: 767px) {
  .generateCustom {
    display: block;
  }
  .codeSettings {
    flex-wrap: wrap;
    .codeSetting {
      width: 100%;
    }

    .codeSolo {
      width: 100%;
      display: none;
      flex-wrap: wrap;

      .dmxStyleImg {
        width: 100%;
      }
    }

    &.showGenerateSolo {
      .codeSetting {
        display: none;
      }

      .codeSolo {
        display: flex;
      }
    }
  }

  .codeTitle {
    display: block;
  }

  .listBarcode {
    &.showGenerateSolo {
      display: none;
    }
  }
}
</style>
