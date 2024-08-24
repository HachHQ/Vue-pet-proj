<template>
  <div class="select-container">
    <div class="input-container" v-if="allowInput">
      <input
        v-model="inputText"
        class="input-select"
        :style="{ backgroundColor: isInputFocused ? 'white' : 'transparent' }"
        @focus="handleFocus()"
        @blur="handleBlur()"
      />
    </div>
    <div
      class="select"
      @click="toggleDropdown"
      :style="{ pointerEvents: allowInput ? 'none' : 'auto' }"
    >
      {{ selectedLeague || "" }}
    </div>
    <img
      :src="selectArrowIcon"
      :class="{ rotated: dropdownOpen }"
      alt="Arrow Icon"
      class="select-arrow-icon"
      @click="toggleDropdown"
    />
    <ul v-if="dropdownOpen" class="options">
      <li
        v-for="league in filteredLeagues"
        :key="league"
        :class="{ 'selected-style': league === selectedLeague }"
        @click="selectLeague(league)"
      >
        {{ league }}
      </li>
    </ul>
  </div>
</template>

<script>
import selectArrowIcon from "@/assets/selectArrow.svg";

export default {
  name: "CustomSelect",
  props: {
    standingsData: {
      type: Array,
      required: true,
    },
    allowInput: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedLeague: "",
      // leagues: [],
      dropdownOpen: false,
      selectArrowIcon,
      inputText: "",
      isInputFocused: false,
    };
  },
  computed: {
    leagues() {
      return [...new Set(this.standingsData.map((team) => team.league))];
    },
    teams() {
      return [...new Set(this.standingsData.map((team) => team.teamName))];
    },
    filteredLeagues() {
      if (this.inputText) {
        return this.leagues.filter((league) =>
          league.toLowerCase().includes(this.inputText.toLowerCase())
        );
      } else {
        return this.leagues;
      }
    },
  },
  watch: {
    inputText(newValue) {
      this.dropdownOpen = newValue !== "";
    },
  },
  mounted() {
    if (this.filteredLeagues.length > 0) {
      this.selectedLeague = this.filteredLeagues[0];
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectLeague(league) {
      this.selectedLeague = league;
      this.dropdownOpen = false;
      this.$emit("leagueSelected", league);
    },
    handleFocus() {
      this.isInputFocused = true;
    },
    handleBlur() {
      this.isInputFocused = false;
    },
  },
};
</script>

<style scoped>
/*Select styles */
.select-container {
  position: relative;
  width: 100%;
}
.select-title {
  padding-left: 48%;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 600;
}
.select {
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #1e606b;
  padding: 4px 40px 4px 15px;
  border: 1px solid rgba(30, 96, 107, 0.45);
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  height: 28px;
  width: 100%;
}
.selected-style {
  background: #eee;
}

/*Input styles */
.input-container {
  width: 100%;
  position: absolute;
  top: 2px;
  padding: 0px 2px;
}
.input-select {
  width: 100%;
  padding: 0px 40px;
}

/*Select icon styles */
.select-arrow-icon {
  position: absolute;
  transition: transform 0.3s ease;
  user-select: none;
  bottom: 7px;
  right: 10px;
  cursor: pointer;
  width: 15px;
  height: 15px;
}
.select-arrow-icon.rotated {
  transform: rotate(180deg);
}

/*Options styles */
.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
  border: 1px solid rgba(30, 96, 107, 0.45);
  border-radius: 5px;
  background-color: white;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.options li {
  padding: 5px 0px;
  cursor: pointer;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  color: #1e606b;
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 6px;
  padding: 4px;
}
.options li:hover {
  background-color: #f0f0f0;
}
</style>

<!-- mounted() {
  this.extractLeagues();
},
watch: {
inputText(newValue) {
  this.searchByInput(newValue);
}
},
methods: {
toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
},
selectLeague(league) {
    this.selectedLeague = league;
    this.dropdownOpen = false;
    this.$emit('leagueSelected', league);
},
extractLeagues() {
    this.leagues = [...new Set(this.standingsData.map(team => team.league))];
    if (this.leagues.length > 0) {
      this.selectedLeague = this.leagues[0];
    } else {
      this.leagues = ['Нет данных'];
    }
},
searchByInput (input) {
  if (this.inputText != "") {
    console.log('success');
    this.leagues = this.leagues.filter(league => {
    league.toLowerCase().includes(this.inputText.toLowerCase());
    })
    this.dropdownOpen = true;
  } else {
    this.dropdownOpen = false;
  }
}
} -->
