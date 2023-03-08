import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/cookies'

// element-ui built-in lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'

// User defined lang
import enLocale from './en'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    SetLanguageDirection(cookieLanguage)
    return cookieLanguage
  }

  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'en'
}

export const SetLanguageDirection = (language: string = '') => {
  const body = document.querySelector('body')
  if (body) {
    if (language === 'ar') {
      if (!body.classList.contains('rtl')) {
        body.classList.add('rtl')
      }
    } else {
      body.classList.remove('rtl')
    }
  }
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages
})

export default i18n
