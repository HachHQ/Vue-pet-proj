<template>
  <v-app>
    <v-navigation-drawer
      class="custom-nav-draw-side-bar"
      app
      expand-on-hover
      rail
      touchless
      permanent
    >
      <div class="custom-list-bg">
        <v-list
        class="list-container"
        density="compact"
        nav
      >
        <v-list-item
          class="list-item"
          :to="'/'"
          @click="setActive('/')"
          :class="{ 'v-list-item--active': isActive('/') }"
        >
          <template v-slot:prepend>
            <img :src="getIconSource('/')" class="custom-icon">
          </template>
          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>

        <v-list-item
          class="list-item"
          :to="'/games_calendar'"
          @click="setActive('/games_calendar')"
          :class="{ 'v-list-item--active': isActive('/games_calendar') }"
        >
          <template v-slot:prepend>
            <img :src="getIconSource('/games_calendar')" class="custom-icon">
          </template>
          <v-list-item-title>Календарь игр</v-list-item-title>
        </v-list-item>

        <v-list-item
          class="list-item"
          :to="'/standings'"
          @click="setActive('/standings')"
          :class="{ 'v-list-item--active': isActive('/standings') }"
        >
          <template v-slot:prepend>
            <img :src="getIconSource('/standings')" class="custom-icon">
          </template>
          <v-list-item-title>Турнирная таблица</v-list-item-title>
        </v-list-item>
      </v-list>
      </div>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      activeItem: null,
      icons: {
        '/': {
          normal: require('@/assets/ND_Profile.svg'),
          dark: require('@/assets/ND_Profile-dark.svg')
        },
        '/games_calendar': {
          normal: require('@/assets/ND_Calendar.svg'),
          dark: require('@/assets/ND_Calendar-dark.svg')
        },
        '/standings': {
          normal: require('@/assets/ND_Trophy.svg'),
          dark: require('@/assets/ND_Trophy-dark.svg')
        }
      }
    };
  },
  methods: {
    setActive(item) {
      console.log('Setting active item:', item);
      this.activeItem = item;
    },
    isActive(item) {
      return this.activeItem === item;
    },
    getIconSource(item) {
      if (this.isActive(item)) {
        
        return this.icons[item].dark;
      } else {
        
        return this.icons[item].normal;
      }
    }
  }
};
</script>

<style scoped>
.custom-nav-draw-side-bar {
  background-color: #1e606b;
  border-radius: 0px 11px 11px 0px;
  height: 100%;
}

.custom-list-bg {
  background-color: white;
  border-radius: 0px 11px 11px 0px;
  margin: 8px 8px 0px 0px;
}

.list-container {
  margin: 0px;
}

.list-item {
  display: flex;
  align-items: center;
  margin-left: -3px;
}

.custom-icon {
  width: 21px;
  height: 21px;
  margin-right: 20px;
  margin-left: 0;
  flex-shrink: 0;
}
.v-list-item--active .v-list-item-title {
  color: #333 !important; 
  font-weight: bold !important; 
}
.v-theme--light {
  --v-activated-opacity: 0.0;
}
</style>

<!-- <style scoped>
.custom-nav-draw-side-bar {
  background-color: #1e606b;
  border-radius: 0px 11px 11px 0px;
  height: 100%;
  
}

.custom-list-bg {
  background-color: white;
  border-radius: 0px 11px 11px 0px;
  margin: 8px 8px 0px 0px;
}

.custom-list-item {
    background-color: white;
    color: black;
    padding: 5px;
    white-space: nowrap;
}

.item-list-title {
    white-space: nowrap;
}

.custom-icon {
    width: 21px;
    height: 21px;
}
</style> -->

<!-- <v-list-item class="custom-list-item"
            prepend-icon="mdi-folder" 
            title="Главная" 
            :to="'/'" 
            rounded="xl"></v-list-item>
            
            
            <v-list-item class="custom-list-item"
            prepend-icon="mdi-folder" 
            title="Календарь игр" 
            :to="'/games_calendar'" 
            rounded="xl"></v-list-item>
            
            
            <v-list-item class="custom-list-item" 
            prepend-icon="mdi-folder" 
            title="Турнирная таблица" 
            :to="'/standings'" 
            rounded="xl"></v-list-item> -->
