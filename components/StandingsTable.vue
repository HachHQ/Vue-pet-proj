<template>
  <div class="standing-area">
    <text class="table-title">Турнирная таблица</text>

    <CustomSelect
      :allowInput="isDetailed"
      :standingsData="standings"
      @leagueSelected="handleLeagueSelected"
      v-if="standings.length"
    />

    <div
      style="font-family: Inter, sans-serif; font-size: 10px; font-weight: 600"
    >
      Категория
    </div>

    <div class="standing-btns">
      <div v-for="category in filteredCategories" :key="category">
        <button
          class="custom-btn"
          @click="filterByCategory(category)"
          :class="{ 'custom-btn-down': selectedCategory === category }"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div
      class="standing-data-table"
      :style="{ height: isDetailed ? '600px' : '300px' }"
    >
      <table class="standings-table">
        <thead class="standings-table-header">
          <tr>
            <th class="standings-table-number-th"></th>
            <th class="standings-table-team-th">Команда</th>
            <th class="standings-table-games-th">Игры</th>
            <th class="standings-table-wins-th">В</th>
            <th class="standings-table-draws-th">Н</th>
            <th class="standings-table-losses-th">П</th>
            <th class="standings-table-score-in-game-th">Очки в игре</th>
            <th class="standings-table-score-total-th">Очки</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in filteredStandings"
            :key="item.teamName"
            class="standings-row"
            :class="{
              'standings-row-white': index % 2 === 0,
              'standings-row-transparent': index % 2 !== 0,
            }"
          >
            <td class="standings-table-number-td">{{ index + 1 }}</td>
            <td class="standings-table-team-td">{{ item.teamName }}</td>
            <td class="standings-table-game-td">{{ item.gamesPlayed }}</td>
            <td class="standings-table-W-td">{{ item.wins }}</td>
            <td class="standings-table-N-td">{{ item.draws }}</td>
            <td class="standings-table-P-td">{{ item.losses }}</td>
            <td class="standings-table-score-td">
              {{ String(item.pointsFor) + " - " + String(item.pointsAgainst) }}
            </td>
            <td class="standings-table-score-out-td">{{ item.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/CustomSelect.vue";

export default {
  name: "StandingsTable",
  components: {
    CustomSelect,
  },
  props: {
    isDetailed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedLeague: "",
      selectedCategory: "",
      filteredCategories: [],
      standings: [],
      filteredStandings: [],
    };
  },
  mounted() {
    this.loadStandingsData();
  },
  methods: {
    async loadStandingsData() {
      const response = await fetch("/data/modifyStandingData.json");
      const data = await response.json();
      const standings = data.tournamentSchemeArray.flatMap(
        (scheme) => scheme.standingArray
      );
      this.standings = standings;
      this.filteredStandings = standings;

      if (standings.length > 0) {
        this.selectedLeague = standings[0].league;
        this.extractCategories();
        this.filterStandings();
        this.sortStandingsByPoints();
      }
    },
    extractCategories() {
      if (this.selectedLeague) {
        const categories = this.standings
          .filter((team) => team.league === this.selectedLeague)
          .map((team) => team.teamCategory)
          .filter((teamCategory) => teamCategory);

        this.filteredCategories = [...new Set(categories)];
      } else {
        this.filteredCategories = [];
      }
    },
    filterByCategory(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = "";
      } else {
        this.selectedCategory = category;
      }
      this.filterStandings();
      this.sortStandingsByPoints();
    },
    filterStandings() {
      this.filteredStandings = this.standings.filter(
        (team) => team.league === this.selectedLeague
      );
      if (this.selectedCategory) {
        this.filteredStandings = this.filteredStandings.filter(
          (team) => team.teamCategory === this.selectedCategory
        );
      }
      this.sortStandingsByPoints();
    },
    sortStandingsByPoints() {
      this.filteredStandings.sort((a, b) => b.points - a.points);
    },
    handleLeagueSelected(league) {
      this.selectedLeague = league;
      this.selectedCategory = "";
      this.extractCategories();
      this.filterStandings();
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}
::-webkit-scrollbar-track {
  background: #c1c1c1;
  border-radius: 2px;
}
.standing-area {
  width: auto;
}

.table-title {
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1e606b;
}

/* Buttons */
.standing-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  font-family: Inter, sans-serif;
}

.custom-btn {
  background-color: #1e606b;
  color: white;
  font-size: 12px;
  font-weight: 600;
  font-family: Inter, sans-serif;
  border-radius: 10px;
  width: auto;
  height: 29px;
  padding: 5px 10px;
}
.custom-btn-down {
  background: #eee;
  color: #1e606b;
  font-family: Inter, sans-serif;
  border: 1px solid #1e606b;
  border-radius: 10px;
  transition: 150ms;
}

.standing-data-table {
  margin-top: 25px;
  overflow-x: auto;
  overflow-y: scroll;
  width: auto;
}
.standings-table {
  background: #eee;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.standings-table-header {
  width: 100%;
}
.standings-table th {
  padding: 8px;
  background: white;
  border-bottom: 2px solid #1e606b;
  position: sticky;
  top: 0;
}
.standings-table-team-th {
  text-align: left;
}

/*Table rows */
.standings-table-number-td {
  width: 2%;
  padding: 0px 10px;
}
.standings-table-team-td {
  width: 30%;
  text-align: left;
}
.standings-table-game-td,
.standings-table-W-td,
.standings-table-N-td,
.standings-table-P-td,
.standings-table-score-td,
.standings-table-score-out-td {
  padding: 10px 0px;
  text-align: center;
  width: 10%;
}

/* Zebra rows */
.standings-row {
  border: none;
}
.standings-row-white {
  background: white;
}
.standings-row-transparent {
  background: none;
}
</style>
