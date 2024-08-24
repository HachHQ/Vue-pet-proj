<template>
  <NavDrawer></NavDrawer>
  <PageHeader :pageTitle="title"></PageHeader>
  <div class="home-page-content">
    <div class="selects-container">
      <CustomSelect
        :allowInput="true"
        :arrayData="leagues"
        @selectedOption="handleLeagueSelected"
        class="league-select"
      />
      <CustomSelect
        :allowInput="true"
        :arrayData="availableTeamsForSelectedLeague" 
        @selectedOption="handleSelectedTeamName" 
        
        class="team-select"
      />
      <VueDatePicker :locale="locale"
        v-model="selectedDateObject"
        :format="formatVuePickerDate"
        :enable-time-picker="false"
        :action-row="{ showNow: true }"
        now-button-label="Сегодня"
        auto-apply="true"
        select-text="Выбрать"
        cancel-text="Закрыть"
        class="vue-picker-style"
      />
    </div>
    <GamesTable :isDetailed="true"
    :games="filteredGames"
    :selectedLeague="selectedLeague"
    :selectedTeam="selectedTeamName"
    />
    
  </div>
</template>

<script>
import CustomSelect from "@/components/DemoCustomSelect.vue";
import NavDrawer from "@/components/NavDrawer.vue";
import PageHeader from "@/components/PageHeader.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import GamesTable from "@/components/GamesTable.vue";
import { ru } from "date-fns/locale";

export default {
  name: "GamesCalendarPage",
  components: {
    NavDrawer,
    PageHeader,
    CustomSelect,
    VueDatePicker,
    GamesTable,
  },
  data() {
    return {
      selectedDateObject: new Date(), 
      title: "КАЛЕНДАРЬ ИГР",
      standingsData: [],
      gamesCalendarData: [],
      leagues: [],
      selectedLeague: "",
      selectedTeamName: "",
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
    
    selectedDateString() {
      return this.formatVuePickerDate(this.selectedDateObject);
    },
    filteredGames() {
      let games = this.gamesCalendarData;
      if(this.selectedLeague) {
        games = games.filter(game => {
          const homeTeam = this.standingsData.find(team => team.teamName === game.homeTeam);
          const guestTeam = this.standingsData.find(team => team.teamName === game.guestTeam);
          return (homeTeam && homeTeam.league === this.selectedLeague) || (guestTeam && guestTeam.league === this.selectedLeague);
        });
      }
      if(this.selectedTeamName) {
        games = games.filter(game => game.homeTeam === this.selectedTeamName || game.guestTeam === this.selectedTeamName);
      }
      if(this.selectedDateString) {
        const selectedDateString = this.formatVuePickerDate(this.selectedDateObject);
        games = games.filter(game => game.date.split(" ")[0].toString() === selectedDateString);
      } else if (this.selectedDateString === null) {return games;}
      return games;
    }
  },
  mounted() {
    this.loadData();
    this.sortGamesByLeagueAndTeamWithCheckByTeamName();
  },
  methods: {
    async loadData() {
      this.standingsData = this.$store.state.standings.allStandings;
      this.leagues = this.$store.state.standings.allLeagues;
      this.gamesCalendarData = this.$store.state.games.allGames;

   
      if (!this.standingsData.length || !this.gamesCalendarData.length) {
        await Promise.all([
         this.$store.dispatch('standings/fetchLeagues'),
         this.$store.dispatch('games/fetchGames')
        ]);
        console.log("данные подгружаются")
        this.loadData();
      }
    },
    sortGamesByLeagueAndTeamWithCheckByTeamName() {
      if (this.selectedLeague !== "") {
        let games = this.gamesCalendarData;
        games = games.filter(game => {
          const homeTeam = this.standingsData.find(team => team.teamName === game.homeTeam);
          const guestTeam = this.standingsData.find(team => team.teamName === game.guestTeam);
          return (homeTeam && homeTeam.league === this.selectedLeague) || (guestTeam && guestTeam.league === this.selectedLeague);
        });
        if (this.selectedTeamName !== "") {
          games = games.filter(game => game.homeTeam === this.selectedTeamName || game.guestTeam === this.selectedTeamName);
        }
        return games;
      }
    },
    formatVuePickerDate(date) {
      
      if (!date) return null;
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
    handleLeagueSelected(league) {
      this.selectedLeague = league;
      this.selectedTeamName = "";
      this.sortGamesByLeagueAndTeamWithCheckByTeamName();  
      
    },
    handleSelectedTeamName(team) {
      this.selectedTeamName = team;
      this.sortGamesByLeagueAndTeamWithCheckByTeamName();
    }
  },
};
</script>

<style scoped>
.home-page-content { 
  border-radius: 11px;
  padding: 25px;
  padding-bottom: 120px;
  margin: 20px 0px 0px 10px;
  background: #ffffff;
  margin-left: 70px;
  margin-right: 30px;
  height: 100vh;
}

.vue-picker-style { 
  width: 150px;
  height: 28px;
}

.selects-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.league-select {
  width: 30%;
}
.team-select {
  width: 30%;
}
</style>

<style> 


.dp__input {
  display: flex !important;
  height: 28px !important;
  align-items: center !important;
  font-size: 14px !important;
  border: 1px solid rgba(0,0,0,0.4) !important;
}
</style>


// filterGamesByDate() {
  //   if (this.selectedDateString != "") {
  //     console.log('ghj');
  //     let games = this.filteredGames;
  //     this.games = this.gamesCalendarData.filter((game) => {return game.date.split(" ")[0].toString() === this.selectedDateString;});
  //     return games;
  //   }
  // },
  // formatDateObjToStr (date) {
  //   this.selectedDateString = format(date, "dd.MM.yyyy");  
  // },