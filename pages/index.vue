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
              <span>
                DMX:
                <input v-model="type" type="radio" value="DMX" />
              </span>
              <!-- <span style="margin-left: 15px">
                Barcode:
                <input v-model="type" type="radio" value="barcode" />
                (12 characteres)
              </span> -->
            </div>
          </label>
          <label class="w-100">
            Prefix :
            <input v-model="prefix" type="text" :disabled="type === 'barcode'" />
          </label>
          <!-- <label class="w-100">
            Sufix :
            <input v-model="prefix" type="text" :disabled="type === 'barcode'" />
          </label> -->
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
            <!-- <label class="w-100">
              <select v-model="selectedSavedCode">
                <option value="">Sélectionner un code enregistrer</option>
                <option v-for="code in savedCodes" :key="code" :value="code">{{ code }}</option>
              </select>
            </label> -->
            <label class="w-100">
              Code à générer
              <input v-model="existingCode" type="text" :disabled="type === 'barcode'" />
            </label>
            <span class="w-100">
              <span class="btn" @click="generateSolo"> Generate </span>
              <span class="btn" v-if="showSolo" @click="resetSolo"> reset </span>
            </span>
          </div>
          <DMX v-if="showSolo" :code="existingCode">
            <template #control>
              <div class="control">
                <div @click="savedDMX(existingCode)" class="btn">Save</div>
              </div>
            </template>
          </DMX>
          <!-- <img
            v-if="showSolo"
            style="margin-top: 20px"
            :src="`https://barcode.tec-it.com/barcode.ashx?data=${existingCode}${linkSufix}`"
          /> -->
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
      <div :class="['w-100 settingControl', , { showGenerateSolo: showGenerateCustom }]">
        <span>
          <span class="btn" @click="generate"> Generate </span>
          <span class="btn" @click="reset"> Reset </span>
        </span>
        <div>
          <span class="btn" v-if="onlyOne && codeToShow !== 0" @click="prev"> Prev </span>
          <span class="btn" v-if="onlyOne" @click="next"> Next </span>
        </div>
      </div>
      <div class="margin-top:10px">
        <span class="btn" @click="openSavedCode = true"> Open saved code </span>
        <span class="btn" @click="openLastUsedCode = true"> Open last used code </span>
      </div>
    </div>

    <div v-if="codes.length > 0" :class="['listBarcode', , { showGenerateSolo: showGenerateCustom }]">
      <!-- <div class="container"> -->
      <DMX
        v-for="(code, index) in codes"
        v-show="!onlyOne || (onlyOne && index === codeToShow)"
        :key="type + code"
        :code="code.toString()"
      >
        <template #control>
          <div class="control">
            <div @click="savedDMX(code)" class="btn">Save</div>
          </div>
        </template>
      </DMX>
      <!-- <ejs-datamatrixgenerator
          class="barcodeStyle"
          id="barcode"
          ref="barcodeControl"
          :value="`${prefix}${code}`"
          width="100px"
          height="100px"
        >

        </ejs-datamatrixgenerator> -->
      <!-- <img
          :src="`https://barcode.tec-it.com/barcode.ashx?data=${prefix}${code}${linkSufix}`"
        /> -->
      <!-- </div> -->
    </div>
    <SavedCode v-model="openconfirmation" :type="type" :code="selectedSavedCode" />
    <ShowSavedCode v-model="openSavedCode" :type="type" />
    <ShowLastUsedCode v-model="openLastUsedCode" :type="type" />
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
      openSavedCode: false,
      openconfirmation: false,
      openLastUsedCode: false,
      showGenerateCustom: false,
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
      let array = new Uint32Array(this.codeNumber + 1)
      console.log('getRandomValues ; ', window.crypto.getRandomValues(array))
      const newArray = array.map((t) => `${this.prefix}${t}`)
      console.log('newArray : ', this.prefix)
      if (this.type === 'DMX') {
        let gg = window.crypto.getRandomValues(array)
        console.log('gg :', gg)
        gg.forEach((t) => {
          this.codes.push(this.prefix + t)
        })
      } else {
        for (let i = 0; i <= this.codeNumber; i++) {
          this.codes.push(`01${array[i].toString().slice(0, 9)}2`)
        }
      }

      console.log('this.codes', this.codes)
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
    savedDMX(dmx) {
      this.selectedSavedCode = dmx
      this.openconfirmation = true
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

      .barcodeStyleImg {
        width:100%;
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
