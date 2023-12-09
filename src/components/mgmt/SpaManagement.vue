<template>
  <div class="spa-management">
    <CustomHeader
      subtitle="Admin"/>
    <NavBar class="navbar" :additionalLink="spaHomeLink" />
    <h2>Spa Management</h2>
    <div class="content">
      <div class="col left">
        <ReservationTable 
          id="spa-res"
          :columns="resCols"
          :rowData="reservations"
          title="Reservations"
          @updateItem="updateReservation"
          @deleteItem="deleteReservation"/>
      </div>
      <div>
        <BasicTable
          id="spa-services"
          :columns="serviceCols"
          :rowData="servicesRowData"
          title="Spa Services"
          @addItem="addService"
          @deleteItem="deleteService"/>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue'
import BasicTable from '@/components/shared/BasicTable.vue'
import ReservationTable from '@/components/shared/ReservationTable.vue'
import NavBar from '@/components/shared/NavBar.vue';
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import { useSpaStore } from '@/stores/spa'
import { useReservationsStore } from '@/stores/reservations'
import dayjs from  'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default {
  components: {
    CustomHeader,
    BasicTable,
    ReservationTable,
    NavBar
  },
  beforeMount() {
    if (!this.services?.length) {
      this.fetchSpaServices()
    }
    if (!this.therapists?.length) {
      this.fetchTherapists()
    }
    if (!this.loadingSpaReservations) {
      this.fetchSpaReservations()
    }
  },
  data() {
    return {
      spaHomeLink: {
        to: '/spa',
        text: 'Spa Home'
      },
      resCols: [
        {
          id: 'date',
          label: 'Date'
        },
        {
          id: 'time',
          label: 'Time'
        },
        {
          id: 'duration',
          label: 'Duration'
        },
        {
          id: 'service',
          label: 'Service'
        },
        {
          id: 'client',
          label: 'Client'
        },
        {
          id: 'staff',
          label: 'Staff Member'
        }
      ],
      serviceCols: [
        {
          id: 'service',
          label: 'Service'
        },
        {
          id: 'descript',
          label: 'Description'
        }
      ]
    }
  },
  computed: {
    ...mapState(useSpaStore, {
      services: 'getSpaServices',
      therapists: 'getTherapists'
    }),
    ...mapState(useReservationsStore, {
      loadingSpaReservations: 'getLoadingSpaReservations',
      spaReservations: 'getSpaReservations'
    }),
    servicesRowData() {
      return this.services.map(svc => {
        return { 
          'id': svc.id,
          'service': svc.title,
          'descript': svc.descript
        }
      })
    },
    reservations() {
      return this.spaReservations.map(res => {
        const dayjsStartTime = dayjs(res.res_start_time)
        const duration = dayjs(res.res_end_time).diff(dayjsStartTime, 'minute')
        const therapist = this.therapists.find(obj => obj.id === res.therapist_id)
        const therapistName = `${therapist.first_name} ${therapist.last_name}`
        const service = this.services.find(obj => obj.id === res.spa_service)
        const serviceLabel = service ? service.title : ''
        return {
          ...res,
          date: dayjsStartTime.utc().format('M/D/YYYY'),
          time: dayjsStartTime.utc().format('h:mm a'),
          duration: duration,
          client: res.client_name,
          staff: therapistName,
          service: serviceLabel
        }
      })
    }
  },
  methods: {
    ...mapActions(useSpaStore, ['addSpaService', 'deleteSpaService', 'fetchSpaServices', 'fetchTherapists']),
    ...mapActions(useReservationsStore, ['fetchSpaReservations', 'updateSpaReservation', 'deleteSpaReservation']),
    updateReservation(obj) {
      const times = obj.time.split(/(:|\s+)/)
      const hour = times[4] === 'pm' ? parseInt(times[0]) + 12 : parseInt(times[0])
      const totalTimeInMinutes = (hour * 60) + parseInt(times[2])

      const dayjsDate = dayjs(obj.date).utcOffset(0).startOf('day')
      const startTime = dayjsDate.add(totalTimeInMinutes, 'minutes')
      const resDuration = parseInt(obj.duration)
      const endTime = startTime.add(resDuration, 'minutes')

      const payload = {
        id: obj.id,
        resStartTime: startTime.format('YYYY-MM-DDTHH:mm:ss'),
        resEndTime: endTime.format('YYYY-MM-DDTHH:mm:ss')
      }
      
      this.updateSpaReservation(payload)
    },
    deleteReservation(res) {
      this.deleteSpaReservation(res.id)
    },
    addService(inputs) {
      const newService = {
        title: inputs.service,
        descript: inputs.descript
      }
      this.addSpaService(newService)
    },
    deleteService(svc) {
      this.deleteSpaService(svc)
    }
  }
}
</script>

<style lang="scss">
.spa-management {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .main-header {
    background-color: #ECEBEB;
    h1 {
      color: #84A7AE;
    }
  }
  h2 {
    margin-top: 3rem;
  }
  .content {
    display: flex;
    gap: 4rem;
    justify-content: space-between;
    margin: 0 auto;
    padding: 4rem;
    .col {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
    .basic-table.services {
      margin-top: 4rem;
    }
  }
  
  @media (max-width: 1208px) {
    .content {
      gap: 2rem;
      padding: 4rem 2rem;
    }
  }
}
</style>