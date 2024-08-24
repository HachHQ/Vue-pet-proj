<template>
  <div class="calendar_data_table">
      
  </div>
</template>

<script>
import {  subDays, addDays } from 'date-fns';

export default {
  name: 'GamesCalendar',
  props: {
    gamesCalendarData: {
      type: Array,
      required: true,
    },

  },
  data() {
    return {
      filteredGames: [],
      currentDate: new Date(),
      formatCurrentDate: '',
      //gamesCalendarData: [],
    };
  },
  mounted () {

  },
  methods: {

  }
}

</script>

<style scoped>
.calendar_data_table ::-webkit-scrollbar {
  width: 5px;
}
.calendar_data_table ::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}
.calendar_data_table ::-webkit-scrollbar-track {
  background: #c1c1c1;
  border-radius: 2px;
}


.calendar_selects {
  display: flex;
  flex-direction: row;
  gap: 6px;
}

.calendar_select {
  border-radius: 10px;
}

.calendar_buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 22px 0px;
}
.custom_btn {
  cursor: pointer;
  background-color: #1e606b;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  font-family: Roboto, sans-serif;
  border-radius: 10px;
}

.calendar_data_table {
  display: flex;
  margin-top: 10px;
  overflow-x: unset;
  max-height: 200px;
  
} 


</style>
