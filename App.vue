<template class="main-frame">
    <div id="app">
      <loading-screen v-if="isLoading" />
      <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
import LoadingScreen from './components/LoadingScreen.vue';

export default {
  name: 'App',
  components: {
    LoadingScreen,
  },
  computed: {
    ...mapState(["isLoading"]), 
  },
  created() {
    this.$store.dispatch("setLoading", true);

    Promise.all([
      this.$store.dispatch('standings/fetchLeagues'),
      this.$store.dispatch('games/fetchGames')
      ]).then(() => {
        this.$store.dispatch("setLoading", false);
      }).catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        this.$store.dispatch("setLoading", false);
    });
    //this.$store.dispatch('standings/fetchLeagues');
    //this.$store.dispatch('games/fetchGames');
  },
  data() {
    return {

    };
  }
}
</script>

<script setup>
document.title = 'laptalk';
</script>

<style>
.v-application, .fill-height, .v-container, .main-frame {
  height: auto;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}

#app {
  background: #eee;
}

::-webkit-scrollbar {
  width: 0px;
}

.v-application__wrap {
  min-height: auto !important;
  height: auto !important;
}

</style>
