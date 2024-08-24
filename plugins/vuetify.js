// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'


export default createVuetify({  
    theme: {
        themes: {
            light: {
                // Здесь ты можешь добавить настройки для светлой темы
                primary: '#1976D2',
                // Удаляем фон для активного элемента списка
                '--v-activated-opacity': {
                  backgroundColor: 'transparent',
                },
                // Настраиваем цвета текста и иконок для активного элемента
                'v-list-item--active *': {
                  color: '#000000',
                }
              }
        }
    }
})
