<template>
  <NavDrawer></NavDrawer>
  <PageHeader :page-title="title"></PageHeader>
  <div class="home_page_content">
    <text
      style="
        font-weight: 600;
        font-size: 20px;
        color: #1e606b;
        line-height: 38px;
        font-family: Inter, sans-serif;
      "
      >Календарь игр</text
    >    
    <div class="selects-titles">
      <text class="league-title">Лига</text>
      <text class="team-title">Команда</text>
    </div>

    <div class="calendar_selects">
      <custom-select :arrayData="leagues" :allowInput="false" @selectedOption="handleSelectedLeague" v-if="standingsData.length > 0"/>
      <custom-select :arrayData="availableTeamsForSelectedLeague" :allowInput="false" @selectedOption="handleSelectedTeamName" v-if="gamesCalendarData.length > 0"/>
      <VueDatePicker v-if="detailed"/>
    </div>

    <div class="calendar_buttons">
      <div v-for="button in calendarButtons" :key="button.dayNumber">
        <button
          class="custom_btn"
          @click="toggleDate(button.fullDate)"
          :class="{ 'custom-btn-down': selectedDate === button.fullDate }"
        >
          <div class="btn_data">
            <span>{{ button.dayLabel }}</span>
            <br />
            <span>{{ button.shortDate }}</span>
          </div>
        </button>
      </div>
      <router-link :to="'/games_calendar'" style="display: flex">
        <button class="custom_btn">Смотреть календарь</button>
      </router-link>

      <router-link :to="'/standings'" style="display: flex">
        <button class="custom_btn">Смотреть турнирную таблицу</button>
      </router-link>
    </div>

    <div class="calendar-data-table">
      <table class="calendar-table">
        <thead class="calendar-table-header" v-if="detailed">
          <tr>
            <th class="calendar-table-date-th">Дата начала</th>
            <th class="calendar-table-team-one-th">Домашняя команда</th>
            <th class="calendar-table-score-total-th">Счет</th>
            <th class="calendar-table-team-two-th">Гостевая команда</th>
            <th class="calendar-table-place-th">Место проведения</th>
            <th class="calendar-table-tour-th">Тур</th>
            <th class="calendar-table-scheme-th">Схема турнира</th>
            <th class="calendar-table-status-th">Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredGames.length === 0">
            Нет запланированных игр на этот период
          </tr>
          <tr
            v-for="(item, index) in filteredGames"
            :key="item.matchId"
            class="calendar-row"
            :class="{
              'calendar-row-white': index % 2 === 0,
              'calendar-row-transparent': index % 2 !== 0,
            }"
          >
            <td class="calendar-table-date-td">{{ item.date }}</td>
            <td class="calendar-table-team-one-td">{{ item.homeTeam }}</td>
            <td class="calendar-table-score-total-td">{{ item.check }}</td>
            <td class="calendar-table-team-two-td">{{ item.guestTeam }}</td>
            <td class="calendar-table-place-td">{{ item.location }}</td>
            <td class="calendar-table-tour-td" v-if="detailed">
              {{ item.tour }}
            </td>
            <td class="calendar-table-scheme-td" v-if="detailed">
              {{ item.tournamentScheme }}
            </td>
            <td class="calendar-table-status-td" v-if="detailed">
              {{ item.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <StandingsTable :isDetailed="false"></StandingsTable>
  </div>
</template>

<script>
import { subDays, addDays } from "date-fns";
// import { format } from 'date-fns';
import CustomSelect from "@/components/DemoCustomSelect.vue";

import StandingsTable from "@/components/StandingsTable.vue";
import NavDrawer from "@/components/NavDrawer.vue";
import PageHeader from "@/components/PageHeader.vue";

import VueDatePicker from "@vuepic/vue-datepicker";

import { ru } from "date-fns/locale";

export default {
  name: "HomePage",
  components: {
    StandingsTable,
    NavDrawer,
    PageHeader,
    CustomSelect,
    VueDatePicker,
  },
  data() {
    return {
      detailed: false,
      title: "ГЛАВНАЯ",

      standingsData: [],
      gamesCalendarData: [],
      filteredGames: [],

      selectedLeague: '',
      selectedTeamName: '',
      selectedDate: "",
      currentDate: new Date(),
      

      calendarButtons: [],
      locale: ru,
    };
  },
  computed: {
    availableTeamsForSelectedLeague() {
      if (this.selectedLeague === "") return [];
      return this.standingsData
        .filter((team) => team.league === this.selectedLeague)
        .map((team) => team.teamName);
    },
    leagues() {
      return [...new Set(this.standingsData.map((team) => team.league))];
    },
    teamNames() {
      let teams = [];
      this.filteredGames.forEach(game => {
        teams.push(game.homeTeam, game.guestTeam);
      })
      return [...new Set(teams)];
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const standingsResponse = await fetch("/data/modifyStandingData.json");
      const standingsData = await standingsResponse.json();
      const standingsJSONData = standingsData.tournamentSchemeArray.flatMap((scheme) => scheme.standingArray);
      this.standingsData = standingsJSONData;

      const gamesCalendarResponse = await fetch("/data/gamesCalendarData.json");
      const gamesCalendarData = await gamesCalendarResponse.json();
      this.gamesCalendarData = gamesCalendarData;

      this.generateCalendarButtons();
      this.filterGames();
      this.applyFilters();
    },
    filterGames() {
      if (this.selectedDate != "") {
        this.filteredGames = this.gamesCalendarData.filter((game) => {return game.date.split(" ")[0].toString() === this.selectedDate;});
        this.applyFilters();
      } else {
        this.sortGamesPerWeek();
        this.applyFilters();
      }
    },

    applyFilters() {
      let games = this.filteredGames;

      if (this.selectedLeague !== "") {
        games = games.filter(game => {
          const homeTeam = this.standingsData.find(team => team.teamName === game.homeTeam);
          const guestTeam = this.standingsData.find(team => team.teamName === game.guestTeam);
          return (homeTeam && homeTeam.league === this.selectedLeague) || (guestTeam && guestTeam.league === this.selectedLeague);
        });
      }

      if (this.selectedTeamName !== "") {
        games = games.filter(game => game.homeTeam === this.selectedTeamName || game.guestTeam === this.selectedTeamName);
      }

      this.filteredGames = games;
    },
    sortGamesPerWeek() {
      const startDate = this.parseToDataObject(this.calendarButtons[0].fullDate);
      const endDate = this.parseToDataObject(this.calendarButtons[this.calendarButtons.length - 1].fullDate);
      this.filteredGames = this.gamesCalendarData.filter((game) => {
        const gameDate = this.parseToDataObject(game.date.split(" ")[0].toString());
        return gameDate >= startDate && gameDate <= endDate;
        });
    },
    parseToDataObject(notDateObj) {
      const [day, month, year] = notDateObj.split(".").map(Number);
      return new Date(year, month - 1, day);
    },
    handleSelectedLeague(league) {
      this.selectedLeague = league;
      this.selectedTeamName = "";
      this.filterGames();
      this.applyFilters();
    },
    handleSelectedTeamName(teamName) {
      this.selectedTeamName = teamName;
      this.filterGames();
      this.applyFilters();
    },
    toggleDate(date) {
      if (this.selectedDate === date) {
        this.selectedDate = "";
      } else {
        this.selectedDate = date;
      }
      this.filterGames();
    },
    generateCalendarButtons() {
      const today = new Date();
      this.calendarButtons = [
        ...Array.from({ length: 3 }, (_, i) =>
          this.createButtonObject(subDays(today, i + 1), i - 3)
        ).reverse(),
        this.createButtonObject(today, 0),
        ...Array.from({ length: 3 }, (_, i) =>
          this.createButtonObject(addDays(today, i + 1), i + 1)
        ),
      ];
    },
    createButtonObject(date, offset) {
      const dayNumber = date.getDay();
      const shortDayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
      const fullDayNames = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ];
      const isToday = offset === 0;
      const formattedDate = this.formatDateButton(date);
      const formattedShortDate = this.formatShortDate(date);
      const dayLabel =
        offset === -3
          ? "Вчера"
          : offset === 0
          ? "Сегодня"
          : offset === 1
          ? "Завтра"
          : shortDayNames[dayNumber];

      return {
        dayNumber,
        dayLabel,
        shortDayName: shortDayNames[dayNumber],
        fullDayName: fullDayNames[dayNumber],
        shortDate: formattedShortDate,
        fullDate: formattedDate,
        isToday,
      };
    },
    formatDateButton(date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },

    formatShortDate(date) {
      const day = date.getDate();
      const monthNames = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];
      const month = monthNames[date.getMonth()];
      return `${day} ${month}`;
    },
  }
};
</script>

<style scoped>
/*Scrollbar */
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

.home_page_content {
  border-radius: 11px;
  padding: 25px;
  padding-bottom: 120px;
  margin: 20px 0px 0px 10px;
  background: #ffffff;
  margin-left: 70px;
  margin-right: 30px;
}

/* Calendar table */
.calendar-data-table {
  overflow-x: auto;
  overflow-y: scroll;
  height: 300px;
  width: auto;
}

.header-table {
  width: 100%;
  display: flex;
}

.calendar-table {
  border-collapse: separate;
  border-spacing: 0;
}

.calendar-row-transparent {
  background: #eee;
}

.calendar-row-white {
  background: white;
}

/*Button */
.calendar_buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 22px 0px;
}
.custom_btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #1e606b;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  font-family: Roboto, sans-serif;
  border-radius: 10px;
  height: 40px;
}

.custom-btn-down {
  border: 1px solid #1e606b;
  background-color: #eee;
  color: #1e606b;
}

.selects-titles {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.league-title {
  width: 50%;
  font-family: Inter, sans-serif;
  font-size: 10px;
  font-weight: 600;
}
.team-title {
  width: 50%;
  font-family: Inter, sans-serif;
  font-size: 10px;
  font-weight: 600;
}

.calendar_selects {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.calendar-row {
  max-height: 50px;
}
.calendar-table-score-total-td {
  text-align: center;
  width: 10%;
  padding: 5px;
}
.calendar-table-date-td,
.calendar-table-team-one-td,
.calendar-table-team-two-td,
.calendar-table-place-td,
.calendar-table-tour-td,
.calendar-table-scheme-td,
.calendar-table-status-td {
  width: 10%;
  padding: 5px;
}


</style>
