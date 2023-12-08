<template>
  <div class="dining-management">
    <CustomHeader subtitle="Dining" />
    <NavBar class="nav" :additionalLink="diningHomeLink"/>
    <h2>Dining Management</h2>
    <div class="main-container">
      <div class="content">
        <div class="col left" v-if="hasReservations">
          <ReservationTable 
            id="dining-res"
            :columns="resCols"
            :rowData="reservations"
            title="Reservations"
            @updateItem="updateReservation"
            @deleteItem="deleteReservation"
          />
        </div>
        <div>
          <div class="services">
            <div class="title">
              <h3>Key Stats</h3>
            </div>
            <h4>Today's Dinner</h4>
            <div v-for="(item, index) in items" :key="index" class="event-item">
              <h5 class="event-title">{{ item.title }}</h5>
              <p class="event-list"><span>{{ item.number }}</span></p>
            </div>
          </div>
          <div class="col right">
            <button class="btn">Update Menu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue'
import ReservationTable from '@/components/shared/ReservationTable.vue'
import NavBar from '@/components/shared/NavBar.vue'
import { mapActions, mapState } from 'pinia'
import { useReservationsStore } from '@/stores/reservations'
import dayjs from  'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


export default {
  components: {
    CustomHeader,
    ReservationTable,
    NavBar
  },
  data() {
    return {
      diningHomeLink: {
        to: '/dining',
        text: 'Dining Home'
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
          id: 'client',
          label: 'Client'
        },
        {
          id: 'guest_count',
          label: 'Party #'
        },
        {
          id: 'table_id',
          label: 'Table'
        }
      ],
      items: [
        {
          id: 1,
          title: 'Reservations',
          number: '100'
        },
        {
          id: 2,
          title: 'Availability',
          number: '40'
        }
      ]
    }
  },
  beforeMount() {
    if (!this.loadingDiningReservations) {
      this.fetchDiningReservations()
    }
  },
  computed: {
    ...mapState(useReservationsStore, {
      diningReservations: 'getDiningReservations',
      loadingDiningReservations: 'loadingDiningReservations'
    }),
    hasReservations() {
      return !!this.reservations?.length
    },
    reservations() {
      return this.diningReservations?.map(res => {
        const dayjsDateTime = dayjs(res.res_time).utc()
        const date = dayjsDateTime.format('M/D/YY')
        const time = dayjsDateTime.format('h:mm a')
        const fullName = `${res.first_name} ${res.last_name}`
        return {
          ...res,
          date: date,
          time: time,
          client: fullName,
        }
      })
    }
  },
  methods: {
    ...mapActions(useReservationsStore, ['addDiningReservation', 'updateDiningReservation', 'deleteDiningReservation', 'fetchDiningReservations']),
    deleteReservation(res) {
      this.deleteDiningReservation(res.id)
    },
    updateReservation(res) {
      const names = res.client.split(' ')
      const first = names[0]
      const last = names[1]
      const times = res.time.split(/(:|\s+)/)
      const hour = times[4] === 'pm' ? parseInt(times[0]) + 12 : parseInt(times[0])
      const totalTimeInMinutes = (hour * 60) + parseInt(times[2])
      const resDate = dayjs(res.date).utcOffset(0).startOf('day')
      const resDateTime = resDate.add(totalTimeInMinutes, 'minutes').format('YYYY-MM-DDTHH:mm:ss')
      
      const updatedRes = {
        id: res.id,
        tableId: res.table_id,
        firstName: first,
        lastName: last,
        resTime: resDateTime,
        guestCount: res.guest_count
      }

      this.updateDiningReservation(updatedRes)
    }
  }
}

</script>

<style lang="scss">
.dining-management {
  display: flex;
  flex-direction: column;
  height: 130vh;
  background-color: white;
  
  h2 {
    margin-top: 3rem;
  }

  .main-container {
    display: flex;
    gap: 3rem;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0em;
    .content {
      display: flex;
      gap: 4rem;
      justify-content: space-between;
      margin: 0 auto;
      padding: 3rem;
      .col {
        align-items: center;
        display: flex;
        flex-direction: column;
      }
      .services {    
        padding: 20px 40px 40px 40px;
        border: 1px solid black;
        h3 {
          font-size: x-large;
          text-align: center;
          color: black;
          padding: 10px;
        }
        h3:after {
          content: ' ';
          display: block;
          border: 1px solid black;
          width: 100%;
          margin-inline: auto;
          margin-block: 6px;
        }
        h4 {
          text-align: left;
          padding-left: 0px;
          font-size: 1.1rem;
        }
        .event-item {
          margin-top: 1rem;
          padding-left: 0px;
          text-align: left;
        }

        .event-title {
          font-size: 1rem;
        }

        .event-list {
          font-size: 1rem;
        }
      }
      .basic-table.services {
        margin-top: 4rem;
      }
    }
    .col.right {
      button {
        background-color: white;
        color: rgb(105, 105, 105);
        padding: 15px 71px;
        text-align: center;
        display: inline-block;
        font-size: 16px;
      }
      .btn {
        margin-top: 1.2rem;
      }
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