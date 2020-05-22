<template>
    <div>
        <chart-header></chart-header>
        <v-container 
        fluid grid-list-lg 
        class="my-1">
        <v-layout 
            justify-center 
            fill-height 
            wrap class="pa-5"
            >
            <v-flex>
            <line-chart
                :width="300"
                :height="100"
                :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                :datasets="displayedDatasets"
                :options="$options.options"
            ></line-chart>
            </v-flex>
            <v-flex xs12 sm12 md12 xl11 class="center_card">
            <v-layout row wrap justify-center>
                <div class="col-md-12 verify">
                    <form>
                        <fieldset>
                            <input type="checkbox" :value="1" v-model="selectAyo"/>
                            <label>칼로리&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="2" v-model="selectAyo"/>
                            <label>탄수화물&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="3" v-model="selectAyo"/>
                            <label>단백질&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="4" v-model="selectAyo"/>
                            <label>지방&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="5" v-model="selectAyo"/>
                            <label>콜레스테롤&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="6" v-model="selectAyo"/>
                            <label>식이섬유&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="7" v-model="selectAyo"/>
                            <label>칼륨&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="8" v-model="selectAyo"/>
                            <label>나트륨&nbsp;&nbsp;&nbsp;</label>
                        </fieldset>
                    </form>
                </div>
            </v-layout>
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>

<script>
import LineChart from '@/components/graph/LineChart.vue'
import ChartHeader from '@/components/graph/ChartHeader.vue'

const datasets = {
        1: {
            label: '칼로리(kcal)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)', // blue
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'blue',
            data: [2000, 2300, 2130, 2220, 1890, 1500, 1800, 1780, 2000, 2300, 1200, 2140],
            backgroundColor: 'transparent',
        },
        2: {
            label: '탄수화물(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)', // red
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            backgroundColor: 'transparent',
        },
        3: {
            label: '단백질(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)', // orange
            pointBackgroundColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            data: [1, 3, 2, 12, 34, 22, 33, 12, 21, 34, 47, 34],
            backgroundColor: 'transparent',
        },
        4: {
            label: '지방(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)', // green
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
            backgroundColor: 'transparent',
        },
        5: {
            label: '콜레스트롤(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)', // yellow
            pointBackgroundColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
            backgroundColor: 'transparent',
        },
        6: {
            label: '식이섬유(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)', // purple
            pointBackgroundColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
            backgroundColor: 'transparent',
        },
        7: {
            label: '칼륨(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(108, 63, 61, 1)', // brown
            pointBackgroundColor: 'rgba(108, 63, 61, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            backgroundColor: 'transparent',
        },
        8: {
            label: '나트륨(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(113, 113, 123, 1)', // grey
            pointBackgroundColor: 'rgba(113, 113, 123, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            backgroundColor: 'transparent',
        },

};

export default {
    name: 'month-chart',
    datasets,
    components:{
        ChartHeader,
        LineChart
    },
    data() {
    return {
      // Select both years by default.
      selectAyo: [1]
    };
  },
  computed: {
    // The datasets to display.
    displayedDatasets() {
      return this.selectAyo.map(ayo => datasets[ayo]);
    }
  }
} 

</script>

<style scoped>
fieldset {
  display: block;
  margin-left: 2px;
  margin-right: 2px;
  padding-top: 0.35em;
  padding-bottom: 0.625em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  border: 2px groove (internal value);
}
</style>

