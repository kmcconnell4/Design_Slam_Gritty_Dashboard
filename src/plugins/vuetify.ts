import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const grittyTheme = {
  dark: true,
  colors: {
    primary: '#F47B20',
    surface: '#1A1A2E',
    background: '#1A1A2E',
    secondary: '#16213E',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },
}

export const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VCard: {
      elevation: 0,
    },
    VList: {
      density: 'compact',
    },
  },
  theme: {
    defaultTheme: 'grittyTheme',
    themes: {
      grittyTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
