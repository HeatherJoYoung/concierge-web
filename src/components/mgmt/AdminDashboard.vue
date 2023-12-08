<template>
  <div class="admin-dashboard">
    <CustomHeader
      subtitle="Admin"/>
    <NavBar class="nav" />
    <div class="content">
      <div class="col left">
        <BasicTable 
          id="managers"
          :columns="managerCols"
          :rowData="managers"
          title="Managers"
          @addItem="addManager"
          @deleteItem="deleteManager"/>
      </div>
      <div class="col right">
        <h2>Revenue by Service</h2>
        <BarChart
          :chartData="chartData"
          chartId="revenue"
        />
        <button @click="downloadReport">Download Report</button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '../shared/CustomHeader.vue'
import BarChart from '@/components/shared/BarChart.vue'
import BasicTable from '@/components/shared/BasicTable.vue'
import NavBar from '@/components/shared/NavBar.vue'

export default {
  components: {
    CustomHeader,
    BarChart,
    BasicTable,
    NavBar
  },
  data() {
    return {
      managers: [
        {
          name: 'Abby Wright',
          dept: 'Spa'
        },
        {
          name: 'Beau Dean',
          dept: 'Dining'
        },
        {
          name: 'Charles Host',
          dept: 'Events'
        }
      ],
      managerCols: [
        {
          id: 'name',
          label: 'Name'
        },
        {
          id: 'dept',
          label: 'Department'
        }
      ],
      services: [
        {
          dept: 'Spa'
        },
        {
          dept: 'Dining'
        },
        {
          dept: 'Events'
        }
      ],
      serviceCols: [
        {
          id: 'dept',
          label: 'Department'
        }
      ],
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [ 
          { 
            label: 'Dining',
            data: [40, 20, 50],
            backgroundColor: '#2e327d'
          },
          { 
            label: 'Events',
            data: [30, 10, 18],
            backgroundColor: 'orange'
          }, 
          { 
            label: 'Spa',
            data: [50, 40, 30],
            backgroundColor: '#ab1302'
          } 
        ]
      }
    }
  },
  methods: {
    addManager(obj) {
      console.log('manager added')
      console.log(JSON.stringify(obj))
    },
    deleteManager(mgr) {
      console.log('manager deleted')
      console.log(JSON.stringify(mgr))
    },
    convertLabelsToCSV(labels) {
      let result
      const columnDelimiter = ','
      const lineDelimiter = '\n'

      if (labels == null || !labels.length) {
        return null
      }

      result = '' + columnDelimiter
      result += labels.join(columnDelimiter)
      result += lineDelimiter

      return result
    },
    convertChartDataToCSV(dataset) {
      console.log('dataset: ', dataset)
      let result = ''
      const columnDelimiter = ','
      const lineDelimiter = '\n'

      const data = dataset.data
      if (data == null || !data.length) {
        return null
      }

      result += dataset.label.toString()

      for (let i = 0; i < data.length; i++) {
        result += columnDelimiter
        result += data[i]
      }
      
      result += lineDelimiter

      return result
    },
    downloadReport() {

      let csv = ''
      csv += this.convertLabelsToCSV(this.chartData.labels)

      for (let i = 0; i < this.chartData.datasets.length; i++) {
        csv += this.convertChartDataToCSV(this.chartData.datasets[i])
      }

      if (csv == null) return
      console.log(csv)

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      
      const data = encodeURI(csv)
      const link = document.createElement('a')
      const filename = 'chart-data.csv'
      link.setAttribute('href', data)
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style lang="scss">
.admin-dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main-header {
    background-color: #ECEBEB;
    h1 {
      color: #84A7AE;
    }
  }
  .content {
    display: flex;
    padding: 4rem;
    gap: 6rem;
    .col {
      align-items: center;
      display: flex;
      flex-basis: 50%;
      flex-direction: column;
      position: relative;
      &.right {
        button {
          all: unset;
          background-color: white;
          border: 1px solid black;
          border-radius: 6px;
          color: black;
          font-family: 'Manrope', Arial, sans-serif;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          height: 45px;
          margin-top: 2rem;
          width: 166px;
          &:hover {
            background-color: #ECEBEB;
            border: 2px solid black;
          }
        }
        h2 {
          font-family: 'Manrope', Arial, sans-serif;
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 1rem;
        }
      }
    }
    .basic-table.services {
      margin-top: 4rem;
    }
  }
  
  @media (min-width: 1024px) {
    h1,
    h3 {
      text-align: left;
    }
  }
}
</style>