<template>
  <div>
    <ul>
      <li v-for="method in preparedParts.legend" class="legend-item">
        <div class="legend-key" :style="`border-color: ${method.color}`">
          <div class="legend-key-bg" :style="`background: ${method.color}`"></div>
          {{ method.key }}
        </div>
        <span class="legend-label">{{ method.label }}</span>
      </li>
    </ul>
    <ul>
      <li v-for="part in preparedParts.list" class="edible-part">
        <span class="part-name">{{ part.name }}</span>
        <span class="legend-key" v-for="method in part.methods">{{ method }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    edibleParts: ['young flowers', 'leaves^R', 'roots^RCP', 'tubers^C']
  }),
  computed: {
    preparedParts() {
      let prepMethods = []

      const legend = {
        C: { label: 'cooked', color: '#FF7E6B' },
        R: { label: 'raw', color: '#87B38D' },
        P: { label: 'processed', color: '#474973' }
      }

      const upcasefirst = str => str.charAt(0).toUpperCase() + str.slice(1)

      const list = this.edibleParts.map(part => {
        // Split out parts
        const parts = part.split('^')

        // Isolate part name
        const name = upcasefirst(parts[0].trim())

        // Split out part prep methods
        const methods = parts.length > 1 ? parts[1].split('') : []

        // Add methods to included methods list
        prepMethods.push(methods)

        return {
          name,
          methods
        }
      })

      // Remove duplicates from prep methods
      const includedPrepMethods = [...new Set(prepMethods.flat())]

      // Build legend
      const listLegend = includedPrepMethods.map(key => {
        return {
          key,
          label: legend[key].label,
          color: legend[key].color
        }
      })

      return { list, legend: listLegend }
    }
  }
}
</script>

<style scoped>
.edible-part {
  display: inline-block;
  //text-transform: capitalize;
}
.legend-item {
  position: relative;
}

.legend-key {
  display: inline-block;
  position: relative;
  border-radius: 3px;
  font-weight: bold;
  border: 1px solid black;
  padding: 0 4px;
  font-size: 11px;
}
.legend-key-bg {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.15;
}
.legend-label {
  font-size: 11px;
  margin-left: 4px;
  text-transform: uppercase;
}
</style>
