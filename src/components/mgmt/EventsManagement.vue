<template>
  <div class="events-management">
    <CustomHeader subtitle="Admin" />
    <NavBar class="nav" :additionalLink="eventsHomeLink"/>
    <h2>Special Events Management</h2>
    <div class="content">
      <div class="col-left">
        <ReservationTable 
          id="events-res"
          :columns="resCols"
          :rowData="resRows"
          title="Reservations"
          @updateItem="updateReservation"
          @deleteItem="deleteReservation"/>
      </div>
      <div class="col-right">
        <BasicTable
          id="events-table"
          :columns="eventsCols"
          :rowData="eventsRows"
          title="Events"
          @addItem="handleAddEvent"
          @deleteItem="handleDeleteEvent"/>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue'
import NavBar from '@/components/shared/NavBar.vue'
import BasicTable from '@/components/shared/BasicTable.vue'
import ReservationTable from '@/components/shared/ReservationTable.vue'
import { mapActions, mapState } from 'pinia'
import { useEventsStore } from '@/stores/events'
import { useReservationsStore } from '@/stores/reservations'
import dayjs from  'dayjs'

export default {
  components: {
    CustomHeader,
    NavBar,
    BasicTable,
    ReservationTable
  },
  data() {
    return {
      eventsHomeLink: {
        to: '/events',
        text: 'Events Home'
      },
      eventsCols: [
        {
          id: 'title',
          label: 'Title',
        },
        {
          id: 'capacity',
          label: 'Capacity',
        },
        {
          id: 'contactName',
          label: 'Contact Name',
        },
        {
          id: 'contactEmail',
          label: 'Contact Email',
        },
        {
          id: 'contactPhone',
          label: 'Contact Phone',
        },
        {
          id: 'eventLocation',
          label: 'Event Location',
        },
        {
          id: 'descript',
          label: 'Description',
        },
        {
          id: 'startTime',
          label: 'Start Time',
        },
        {
          id: 'endTime',
          label: 'End Time',
        }
      ],
      resCols: [
        {
          id: 'date',
          label: 'Date'
        },
        {
          id: 'eventName',
          label: 'Event'
        },
        {
          id: 'client',
          label: 'Client'
        },
        {
          id: 'party_count',
          label: 'Party #'
        }
      ],
    }
  },
  computed: {
    ...mapState(useEventsStore, {
      events: 'getEvents',
      loadingEvents: 'loadingEvents'
    }),
    ...mapState(useReservationsStore, {
      reservations: 'getEventsReservations',
      loadingEventReservations: 'getLoadingEventReservations'
    }),
    eventsRows() {
      return this.events.map(event => {
        return {
          id: event.id,
          title: event.title,
          capacity: event.capacity,
          contactName: event.contact_name,
          contactEmail: event.contact_email,
          contactPhone: event.contact_phone,
          eventLocation: event.event_location,
          descript: this.parseDescription(event.descript),
          startTime: event.start_time,
          endTime: event.end_time
        }
      })
    },
    resRows() {
      return this.reservations.map(res => {
        const event = this.events.find(e => e.id === res.event_id)
        const fullname = `${res.first_name} ${res.last_name}`
        let date = ''
        if (event) {
          date = dayjs(event.start_time).format('M/D/YY')
        }
        return {
          ...res,
          eventName: event ? event.title : '',
          client: fullname,
          date: date
        }
      })
    }
  },
  methods: {
    ...mapActions(useEventsStore, ['addEvent', 'deleteEvent', 'fetchEvents']),
    ...mapActions(useReservationsStore, ['fetchEventReservations', 'updateEventReservation', 'deleteEventReservation']),
    handleAddEvent(inputs) {
      this.addEvent(inputs)
    },
    handleDeleteEvent(event) {
      this.deleteEvent({
        id: event.id,
        title: event.title
      })
    },
    updateReservation(res) {
      const names = res.client.split(' ')
      const firstName = names[0]
      const lastName = names[names.length - 1]

      res.first_name = firstName
      res.last_name = lastName

      delete res.eventName
      delete res.client
      delete res.date

      this.updateEventReservation(res)
    },
    deleteReservation(res) {
      this.deleteEventReservation(res.id)
    },
    parseDescription(desc) {
      let result = ''
      const descriptionLength = desc?.length
      if (descriptionLength && descriptionLength > 15) {
        result = desc.substring(0, 14) + '...'
      }
      return result
    }
  },
  beforeMount() {
    if (!this.loadingEvents) {
      this.fetchEvents()
    }
    if (!this.loadingEventReservations) {
      this.fetchEventReservations()
    }
  },
}
</script>

<style lang="scss">
.events-management{
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
    .col-left, .col-right {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
    .basic-table {
      th.capacity, td.capacity{
        width:7rem;
      }
      th.contactPhone, td.contactPhone, 
      th.eventLocation, td.eventLocation, 
      th.contactName, td.contactName,
      th.descript, td.descript{
        width: 10rem;
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