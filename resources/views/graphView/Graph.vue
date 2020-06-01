<template>
  <div id="graph">
    <div>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MonthChart from '../../js/components/graph/MonthChart'
import ChartHeader from '../../js/components/graph/ChartHeader.vue'

export default {
  name: 'graph',
  components:{
    ChartHeader,
    MonthChart
  }
}
</script>
