<template>
    <div class="calendar-data-table">
      <table class="calendar-table">
        <thead class="calendar-table-header" v-if="isDetailed">
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
        <tbody class="calendar-table-body">
          <tr v-if="filteredGames.lenght === 0">
            Нет запланированных игр на этот период
          </tr>
          <tr
            v-for="(item, index) in games"
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
            <td class="calendar-table-tour-td" v-if="isDetailed">{{ item.tour }}</td>
            <td class="calendar-table-scheme-td" v-if="isDetailed">{{ item.tournamentScheme }}</td>
            <td class="calendar-table-status-td" v-if="isDetailed">{{ item.status ? "Проведена" : "Запланирована"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
    name: 'GamesTable',
    props: {
        isDetailed: {
            type: Boolean,
            required: true,
        },
        games: {
            type: Array,
            required: true,
        },
        selectedLeague: {
            type: String,
        },
        selectedTeam: {
            type: String,
        }
    },
    data() {
        return {

        }
    },
    computed: {
        filteredGames() {
            let games = this.games;
            if(this.selectedLeague) {
                games = games.filter(game => game.league === this.selectedLeague)
            }
            if(this.selectedTeam) {
                games = games.filter(game => game.homeTeam === this.selectedTeamName || game.guestTeam === this.selectedTeamName);
            }
            return games;
        },
        
    },
}
</script>

//first<!--<style scoped>
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

.calendar-data-table {
    margin-top: 20px;
    height: 90vh;
    overflow-y: scroll;
}

.calendar-table { 
    border-collapse: separate;
    border-spacing: 0;
    background-color: #eee;
    
}
.calendar-table th{
    position: sticky;
}

.calendar-table-header {
    background-color: #7e453b;
    color: white;
    font-family: "Lato", sans-serif;
    padding-bottom: 10px;
    
}

.calendar-table-date-th,
.calendar-table-team-one-th,
.calendar-table-score-total-th,
.calendar-table-team-two-th,
.calendar-table-place-th,
.calendar-table-tour-th,
.calendar-table-scheme-th,
.calendar-table-status-th {
    font-family: Lato, sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    padding: 6px 6px;
    text-align: left;
}

.calendar-row {
    height: 63px;
    background-color: white;
    
}

.calendar-table-date-td,
.calendar-table-team-one-td,
.calendar-table-score-total-td,
.calendar-table-team-two-td,
.calendar-table-place-td,
.calendar-table-tour-td,
.calendar-table-scheme-td,
.calendar-table-status-td {
    padding: 5px 10px;
    font-family: "Inter", sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: rgba(0, 0, 0, .79);

}
</style> -->

//with spaces between rows<style scoped>
.calendar-data-table {
    margin-top: 20px;
  max-height: 90vh; 
  overflow-y: auto;  
}

.calendar-table {
  padding: 0px 6px;
  width: 100%;
  /* border-collapse: separate; */
  border-spacing: 0 3px;
  background-color: rgba(214, 229, 229, .85);
}

.calendar-table-header {
    background: red;
    color: white
}

.calendar-table-header th {
  position: sticky;
  top: 0;
  background-color: #7e453b;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  font-weight: 700;
  z-index: 10; 
  border-bottom: 2px solid #ddd; 
  padding: 10px; 
  text-align: left; 
}

.calendar-row {
  background-color: white;
  border-radius: 10px; 
  overflow: hidden; 
  padding: 0 20px;
  box-sizing: border-box;
}

.calendar-table-date-td,
.calendar-table-team-one-td,
.calendar-table-score-total-td,
.calendar-table-team-two-td,
.calendar-table-place-td,
.calendar-table-tour-td,
.calendar-table-scheme-td,
.calendar-table-status-td {
  padding: 8px;
}

.calendar-table-date-td:first-child,
.calendar-table-status-td:last-child {
  border-radius: 10px 0 0 10px; 
}

.calendar-table-status-td:last-child {
  border-radius: 0 10px 10px 0; 
}
</style>

//something<!-- <style scoped>
.calendar-data-table {
  max-height: 90vh; /* Устанавливаем максимальную высоту для таблицы */
  overflow-y: auto;  /* Включаем вертикальную прокрутку, если контент превышает высоту */
}

.calendar-table {
  width: 100%;
  border-collapse: collapse; /* Убираем отступы между ячейками */
  background-color: #fff; /* Устанавливаем фон для всей таблицы */
}

.calendar-table-header th {
  position: sticky;
  top: 0;
  background-color: #fff; /* Устанавливаем фон для заголовков */
  z-index: 10; /* Устанавливаем z-index, чтобы заголовки отображались поверх контента */
  border-bottom: 2px solid #ddd; /* Добавляем нижнюю границу для визуального отделения */
  padding: 10px; /* Внутренний отступ для удобства чтения */
  text-align: left; /* Выравнивание текста по левому краю */
}

.calendar-row {
  background-color: white; /* Устанавливаем фон для всех строк-игр */
  border-radius: 10px; /* Скругляем углы строк */
  overflow: hidden; /* Обрезаем контент, выходящий за границы скругленных углов */
  padding-left: 10px; /* Отступы внутри строки слева */
  padding-right: 10px; /* Отступы внутри строки справа */
  border: 1px solid black;
}

.calendar-table-date-td,
.calendar-table-team-one-td,
.calendar-table-score-total-td,
.calendar-table-team-two-td,
.calendar-table-place-td,
.calendar-table-tour-td,
.calendar-table-scheme-td,
.calendar-table-status-td {
  padding: 8px;
}

</style> -->

<!-- <style scoped>
.calendar-data-table {
    max-height: 400px; /* Устанавливаем максимальную высоту для таблицы */
    overflow-y: auto;  /* Включаем вертикальную прокрутку, если контент превышает высоту */
  }
  
  .calendar-table {
    width: 100%;
    border-collapse: collapse; /* Убираем отступы между ячейками */
    background-color: #fff; /* Устанавливаем фон для всей таблицы */
  }
  
  .calendar-table-header th {
    position: sticky;
    top: 0;
    background-color: #fff; /* Устанавливаем фон для заголовков */
    z-index: 10; /* Устанавливаем z-index, чтобы заголовки отображались поверх контента */
    border-bottom: 2px solid #ddd; /* Добавляем нижнюю границу для визуального отделения */
    padding: 10px; /* Внутренний отступ для удобства чтения */
    text-align: left; /* Выравнивание текста по левому краю */
  }
  
  .calendar-row {
    margin: 10px 15px;
    height: 64px;
    background-color: #eee; /* Устанавливаем фон для всех строк-игр */
    border-radius: 10px; /* Скругляем углы строк */
    overflow: hidden; /* Обрезаем контент, выходящий за границы скругленных углов */
    padding-left: 10px; /* Отступы внутри строки слева */
    padding-right: 10px; /* Отступы внутри строки справа */
    box-shadow: inset 0 0 0 10px #585252; /* Добавляем внутреннюю тень для создания отступов */
    
  }
  
  .calendar-table-date-td,
  .calendar-table-team-one-td,
  .calendar-table-score-total-td,
  .calendar-table-team-two-td,
  .calendar-table-place-td,
  .calendar-table-tour-td,
  .calendar-table-scheme-td,
  .calendar-table-status-td {
    padding: 8px;
    overflow: hidden;
  }
  
</style> -->
