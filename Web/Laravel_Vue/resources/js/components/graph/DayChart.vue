<template>
    <div >
        <chart-header></chart-header>
        <v-container 
        fluid grid-list-lg 
        class="my-1">
        <v-layout 
            justify-center 
            fill-height 
            wrap class="pa-5"
            >
            <!-- <v-toolbar flat color="white">
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                Today
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                <template v-slot:activator="{ on }">
                    <v-btn
                    outlined
                    color="grey darken-2"
                    v-on="on"
                    >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </v-toolbar> -->
            <v-flex>
            <bar-chart
                :width="300"
                :height="100"
                :labels="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
                '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']"
                :datasets="displayedDatasets"
                :options="$options.options"
                v-if="loaded"
            ></bar-chart>
            </v-flex>
            <v-flex xs12 sm12 md12 xl11 class="center_card">
            <v-layout row wrap justify-center>
                <div class="col-md-12 verify">
                    <form>
                        <fieldset>
                            <input type="checkbox" :value="1" v-model="selectAyo" name="chkbox"/>
                            <label>칼로리&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="2" v-model="selectAyo" name="chkbox"/>
                            <label>탄수화물&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="3" v-model="selectAyo" name="chkbox"/>
                            <label>단백질&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="4" v-model="selectAyo" name="chkbox"/>
                            <label>지방&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="5" v-model="selectAyo " name="chkbox"/>
                            <label>콜레스테롤&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="6" v-model="selectAyo" name="chkbox"/>
                            <label>칼륨&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="7" v-model="selectAyo" name="chkbox"/>
                            <label>나트륨&nbsp;&nbsp;&nbsp;</label>
                            <!-- <input type="checkbox" :value="8" v-model="selectAyo" name="chkbox"/>
                            <label>식이섬유&nbsp;&nbsp;&nbsp;</label> -->
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
import BarChart from './BarChart.vue'
import ChartHeader from './ChartHeader.vue'
import axios from 'axios'

const datasets = {
        1: {
            label: '칼로리(kcal)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)', // blue
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'blue',
            // data: [2000, 2300, 2130, 2220, 1800, 1800, 1800, 1780, 2000, 2300, 1600, 2140],
            data: [0],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
        2: {
            label: '탄수화물(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)', // red
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            // data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            data: [0],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        3: {
            label: '단백질(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)', // orange
            pointBackgroundColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            // data: [1, 3, 2, 12, 34, 22, 33, 12, 21, 34, 47, 34],
            data: [0],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
        },
        4: {
            label: '지방(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)', // green
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            // data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
            data: [0],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        5: {
            label: '콜레스트롤(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)', // yellow
            pointBackgroundColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            // data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
            data: [0],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
        },
        6: {
            label: '칼륨(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(108, 63, 61, 1)', // brown
            pointBackgroundColor: 'rgba(108, 63, 61, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            // data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            data: [0],
            backgroundColor: 'rgba(108, 63, 61, 0.2)',
        },
        7: {
            label: '나트륨(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(113, 113, 123, 1)', // grey
            pointBackgroundColor: 'rgba(113, 113, 123, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            // data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            data: [0],
            backgroundColor: 'rgba(113, 113, 123, 0.2)',
        },
        // 8: {
        //     label: '식이섬유(g)',
        //     // backgroundColor:'rgba(255, 0, 0, 0.2)',
        //     borderColor: 'rgba(153, 102, 255, 1)', // purple
        //     pointBackgroundColor: 'rgba(153, 102, 255, 1)',
        //     borderWidth: 1,
        //     // pointedBorderColor: 'green',
        //     data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
        //     backgroundColor: 'rgba(153, 102, 255, 0.2)',
        // },
};


export default {
    name: 'day-chart',
    datasets,
    components:{
        ChartHeader,
        BarChart
    },
    data() {
        return {
        // Select both years by default.
        selectAyo: [1],
        loaded: false,
        // focus: '',
        // type: 'month'
        // typeToLabel: {
        //   month: 'Month',
        //   week: 'Week',
        //   day: 'Day',
        //   '4day': '4 Days',
        // },
        // start: null,
        // end: null,
        // selectedEvent: {},
        // selectedElement: null,
        // selectedOpen: false,
        // events: [],
        // colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        // names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        };
    },
    computed: {
        // The datasets to display.
        displayedDatasets() {
            return this.selectAyo.map(ayo => datasets[ayo]);
        }
    },
    mounted() {
        this.daysData();

    },
    /* created() {
        this.daysData();
    }, */
    methods: {
        daysData() {
            axios.get('/graph_days').then(res=> {
                // console.log(res);
                // console.log(res.data.calorie); 
                // console.log('----------');
                // console.log(datasets[1].data);
                // console.log('----------');
                datasets[1].data = res.data.calorie;
                datasets[2].data = res.data.carbohydrate;
                datasets[3].data = res.data.protein;
                datasets[4].data = res.data.fat;
                datasets[5].data = res.data.cholesterol;
                datasets[6].data = res.data.kamium;
                datasets[7].data = res.data.salt;
                // console.log(datasets);
                this.loaded = true
            })
            .catch(err=>console.error(err));
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

