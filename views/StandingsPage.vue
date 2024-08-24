<template>
  <NavDrawer></NavDrawer>
  <PageHeader :pageTitle="title"></PageHeader>
  <div class="standings_page_content">
    <StandingsTable :isDetailed="true" ></StandingsTable>
  </div>
</template>
  
  <script>
import NavDrawer from '@/components/NavDrawer.vue';
import PageHeader from '@/components/PageHeader.vue';

import StandingsTable from '@/components/StandingsTable.vue';

  export default {
    name: 'StandingsPage',
    components: {
      NavDrawer,
      PageHeader,
      // CalendarTable,
      StandingsTable,
    },
    data () {
      return {
        title: 'ТУРНИРНАЯ ТАБЛИЦА',
      }
    }
  }
  </script>
  
<style scoped>

.standings_page_content {
  border-radius: 11px;
  padding: 25px;
  padding-bottom: 120px;
  margin: 20px 0px 0px 10px;
  background: #FFFFFF;
  margin-left: 70px;
  margin-right: 30px;
}
</style>