<template>
  <div class="">
    <!-- library selector -->
    <h4>Library</h4>
    <div>
      <input type="radio" id="pluralize" v-model="library" value="pluralize" />
      <label for="pluralize">pluralize</label>
    </div>
    <div>
      <input type="radio" id="inflected" v-model="library" value="inflected" />
      <label for="inflected">inflected</label>
    </div>

    <!-- locale selector -->
    <h4>Locale</h4>
    <div v-for="item in localeKeys" :key="item">
      <input type="radio" :id="item" v-model="locale" :value="item" />
      <label :for="item">{{ item }}</label>
    </div>

    <button v-show="state === 'ready'" @click="processInput">
      Process {{ locale }} with {{ library }}
    </button>

    <button v-show="state === 'processed'" @click="reset">Reset</button>
    <!-- output -->
    <table>
      <tr>
        <th>Singular</th>
        <th>Plural</th>
      </tr>
      <tr v-for="item in output" :key="item.singular">
        <td style="padding-right: 20px">{{ item.singular }}</td>
        <td>{{ item.plural }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import pluralize from 'pluralize'
import * as Inflector from 'inflected'
import rules from '../rules'

import testData from '../assets/test-data'

function addPluraliseRules(locale, language, country) {
  // Apply rules for locale base language
  rules[language].plural.map(rule => pluralize.addPluralRule(rule[0], rule[1]))
  rules[language].irregular.map(rule => pluralize.addIrregularRule(rule[0], rule[1]))
  rules[language].uncountable.map(rule => pluralize.addUncountableRule(rule))

  // Apply rules for locale if country present
  if (country) {
    rules[locale].plural.map(rule => pluralize.addPluralRule(rule[0], rule[1]))
    rules[locale].irregular.map(rule => pluralize.addIrregularRule(rule[0], rule[1]))
    rules[locale].uncountable.map(rule => pluralize.addUncountableRule(rule))
  }
}

function addInflectorRules(locale, language, country) {
  // Apply rules for locale base language
  Inflector.inflections(language, function(inflect) {
    rules[language].plural.map(rule => inflect.plural(rule[0], rule[1]))
    rules[language].irregular.map(rule => inflect.irregular(rule[0], rule[1]))
    rules[language].uncountable.map(rule => inflect.uncountable(rule))
  })

  // Apply rules for locale if country present
  if (country) {
    Inflector.inflections(language, function(inflect) {
      rules[locale].plural.map(rule => inflect.plural(rule[0], rule[1]))
      rules[locale].irregular.map(rule => inflect.irregular(rule[0], rule[1]))
      rules[locale].uncountable.map(rule => inflect.uncountable(rule))
    })
  }
}

export default {
  name: 'PluralChecker',
  data: () => ({
    state: 'ready',
    input: [],
    output: [],
    locale: null,
    library: 'pluralize'
  }),
  created() {
    this.input = testData
    this.localeKeys = Object.keys(rules)

    // Set initial locale
    this.locale = this.localeKeys[0]
  },
  methods: {
    async processInput() {
      const locale = this.locale
      const localeParts = this.locale.split('-')
      const language = localeParts[0]
      const country = localeParts[1]

      // Process with pluralize
      if (this.library === 'pluralize') {
        addPluraliseRules(language, locale, country)

        // Go through input and call pluralizer, returning the singular and plural strings
        this.output = this.input.map(singular => ({
          singular,
          plural: pluralize(singular)
        }))
      } else {
        addInflectorRules(locale, language, country)

        // Go through input and call pluralizer, returning the singular and plural strings
        this.output = this.input.map(singular => ({
          singular,
          plural: Inflector.pluralize(singular, language)
        }))
      }

      this.state = 'processed'
    },

    reset() {
      window.location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
