<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h2 class="card-title">{{ "% Alumni" }}</h2>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons"
                >
                  <label
                    v-for="(option, index) in bigLineChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{ active: bigLineChart.activeIndex === index }"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index)"
                      name="options"
                      autocomplete="off"
                      :checked="bigLineChart.activeIndex === index"
                    />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h2 class="card-title">{{ "Maior grau obtido" }}</h2>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h2 class="card-title">{{ "Empregabilidade dos Licenciados" }}</h2>
            <h5 class="card-category">{{ "Em até 1 ano após a conclusão da Licenciatura em Tecnologias e Sistemas de Informação para a Web" }}</h5>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart2.chartData"
              :gradient-stops="blueBarChart2.gradientStops"
              :extra-options="blueBarChart2.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import { useUserStore } from '../stores/users';

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
  },
  data() {
    return {
      userStore: useUserStore(),
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 75, 90, 80, 110],
          [48, 49, 3],
          [75, 35],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
        },
        extraOptions: chartConfigs.barChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      /* blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["Licenciado", "Mestre", "Especialista", "Doutor"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      }, */
      /* blueBarChart2: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["Com Emprego", 'Sem Emprego'],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [0, 0],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      }, */
      bigLabels: [
      [
          "Vila do Conde",
          "Póvoa de Varzim",
          "Porto",
          "Maia",
          "Matosinhos",
          "Penafiel",
          "Santo Tirso",
          "Gondomar",
          "Santa Maria da Feira",
        ],
        [
          "Masculino",
          "Feminino",
          "Outro"
        ],
        [
          "Português",
          "Estrangeiro"
        ],
      ],

      numOfEmployed: 0,
      numOfUnemployed: 0,

      numOfUndergraduated: 0,
      numOfMaster: 0,
      numOfSpecialist: 0,
      numOfDoctor: 0,

      numOfPortuguese: 0,
      numOfForeigners: 0,

      trueFlag: false,
      biggestTitleType: -1,
    }

  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return ['Cidade', 'Gênero', 'Nacionalidade'];
    },
    alumniEmployability(){
      return {
        employed: this.numOfEmployed,
        unemployed: this.numOfUnemployed
      }
    },
    biggestTitleObtained(){
      return {
        undergraduate: this.numOfUndergraduated,
        master: this.numOfMaster,
        specialist: this.numOfSpecialist,
        theDoctor: this.numOfDoctor
      }
    },



    blueBarChart2(){
      return {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["Com Emprego", 'Sem Emprego'],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [this.alumniEmployability.employed, this.alumniEmployability.unemployed],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      }
    },
    blueBarChart(){
      return {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["Licenciado", "Mestre", "Especialista", "Doutor"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [this.numOfUndergraduated, this.numOfMaster, this.numOfSpecialist, this.numOfDoctor],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      }
    },
  },
  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: this.bigLabels[index]
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
      this.bigLineChart.allData[2][0] = Math.floor(this.numOfPortuguese / (this.numOfPortuguese + this.numOfForeigners)*100)
      this.bigLineChart.allData[2][1] = Math.floor(this.numOfForeigners / (this.numOfPortuguese + this.numOfForeigners)*100)
    },
    async calculateEmployability(){
      await this.userStore.fetchAllUsers()
      this.userStore.getAll.forEach(async (user) => {
        this.trueFlag = false
        try {
          await this.userStore.searchUserById(user.id)
        let searchedUser = this.userStore.getSearchUser
        console.log(searchedUser);
        for(job of searchedUser.jobs){
          if (job.lastYear == null || job.lastYear == undefined || job.lastYear == '') {
            this.trueFlag = true
          }
        }
        if (this.trueFlag){
          this.numOfEmployed += 1
        } else {
          this.numOfUnemployed += 1
        }
        } catch (error) {
          
        }
      });
    },
    async countBiggestTitle(){
      await this.userStore.fetchAllUsers()
      this.userStore.getAll.forEach(async (user, index) => {
        this.biggestTitleType = -1
        try {
          await this.userStore.searchUserById(user.id)
        let searchedUser = this.userStore.getSearchUser
        console.log(searchedUser);
        for(degree of searchedUser.degrees){
          if (degree.degreeType > this.biggestTitleType) {
            this.biggestTitleType = degree.degreeType
          }
        }
        if (this.biggestTitleType == 2){
          this.numOfUndergraduated += 1
        } else if (this.biggestTitleType == 3) {
          this.numOfSpecialist += 1
        } else if (this.biggestTitleType == 4) {
          this.numOfMaster += 1
        } else if (this.biggestTitleType == 5) {
          this.numOfDoctor += 1
        } 
        } catch (error) {
          console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
          //console.log(searchedUser);
        }
      });
    },
    async countNationalities(){
      await this.userStore.fetchAllUsers()
      this.userStore.getAll.forEach(async (user, index) => {
        this.biggestTitleType = -1
        try {
          
        //alert(user.nationality)
        if (user.nationality == 'PT'){
          this.numOfPortuguese ++
        } else {
          this.numOfForeigners ++
        }
        } catch (error) {
        }
      });
    }
  },
  mounted() {
    this.userStore.fetchAllUsers()
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.countNationalities()
    this.initBigChart(0);
    this.calculateEmployability()
    this.countBiggestTitle()
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style></style>
