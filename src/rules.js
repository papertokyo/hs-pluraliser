// Singular words which match a pattern for pluralization
const pluralExample = [/^(ox)$/i, '$1$2en']
// 1st item is singular regex pattern (no quote marks)
// 2nd item is plural string (can include regex variables)

// Singular/plural Words which don't match a pattern
const irregularExample = ['die', 'dice']
// 1st item is singular string
// 2nd item is plural string

// Words where singular and plural are the same
const uncountableExample = 'snow'
// item is singular/plural string

export default {
  en: {
    plural: [
      [/([^aeiou]ese)$/i, '$1'],
      [/(ax|test)is$/i, '$1es'],
      [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
      [/(e[mn]u)s?$/i, '$1s'],
      [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
      [
        /(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
        '$1i'
      ],
      [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
      [/(seraph|cherub)(?:im)?$/i, '$1im'],
      [/(her|at|gr)o$/i, '$1oes'],
      [
        /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,
        '$1a'
      ],
      [
        /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,
        '$1a'
      ],
      [/sis$/i, 'ses'],
      [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
      [/([^aeiouy]|qu)y$/i, '$1ies'],
      [/([^ch][ieo][ln])ey$/i, '$1ies'],
      [/(x|ch|ss|sh|zz)$/i, '$1es'],
      [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
      [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
      [/(pe)(?:rson|ople)$/i, '$1ople'],
      [/(child)(?:ren)?$/i, '$1ren'],
      [/eaux$/i, '$0'],
      [/m[ae]n$/i, 'men']
    ],
    irregular: [['goose', 'geese']],
    uncountable: ['squid']
  },
  'en-AU': {
    plural: [],
    irregular: [],
    uncountable: []
  }
}
