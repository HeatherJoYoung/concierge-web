<template>
  <div class="events-home">
    <CustomHeader title="My Concierge" subtitle="Special Events"/>
    <NavBar />
    <main>
      <div class="left-column">
        <ReservationForm
          :fields="fields"
          @submitReservation="submitReservation"/>
        <div class="contact-box">
          <span>Contact Special Events: 555-222-7878</span>
        </div>
      </div>
      <div class="right-column">
        <div class="events-box">
          <h2>Upcoming Events</h2>
          <div v-for="(event, index) in events" :key="index" class="event-item">
            <h4 class="event-title">{{ event.title }}</h4>
            <p><strong>Reservations:</strong> <span>{{ event.reservations }}</span></p>
            <p><strong>Openings:</strong> <span>{{ event.openings }}</span></p>
            <p><strong>Transportation:</strong> <span>{{ event.transportation }}</span></p>
            <p><strong>Host:</strong> <span>{{ event.host }}</span></p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import CustomHeader from '@/components/shared/CustomHeader.vue';
  import NavBar from '@/components/shared/NavBar.vue';
  import ReservationForm from '@/components/shared/ReservationForm.vue'

  export default {
    components: {
      CustomHeader,
      NavBar,
      ReservationForm
    },
    data() {
      return {
        events: [
          {
            id: 1,
            title: 'La Scala Opera Trip',
            reservations: 26,
            openings: 14,
            transportation: 'ABC Bus',
            host: 'Andy Cohen'
          },
          {
            id: 2,
            title: 'Night Club Hop',
            reservations: 10,
            openings: 6,
            transportation: 'XYZ Limo',
            host: 'Joe Jackson, Patty Smith'
          }
        ],
        fields: [
          {
            id: 'event',
            label: 'Event',
            type: 'multi-select',
            options: []
          },
          {
            id: 'name',
            label: 'Name',
            type: 'text'
          },
          {
            id: 'count',
            label: '# in party',
            type: 'number'
          }
        ]
      }
    },
    beforeMount() {
      this.fields[0].options = this.eventOptions
    },
    computed: {
      eventOptions() {
        return this.events.map((event) => {
          return {
            id: event.id,
            title: event.title
          }
        })
      }
    },
    methods: {
      submitReservation(values) {
        const isValid = this.validateInputs(values)
        if (isValid) {
          console.log('submitting')
        }
      },
      validateInputs(values) {
        return !!values
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/base.css';
  @import '@/assets/main.css';
  .events-home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    nav {
        margin: 0;
        padding: 12px;
        border-bottom: 1px solid black;
        background-color: white;
        text-align: center;
    }
    main {
      background-image: url('@/assets/special-event-table.webp');
      background-size: cover;
      height: 100vh;
      display: flex;
      gap: 6rem;
      justify-content: space-between;
      padding: 8rem;
      .right-column {
        flex-basis: 50%;
        .events-box {
          background-color:white;
          padding: 2rem 3rem;
          border-radius: 10px;
          h2 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
          }
          h2::after {
            content: "";
            display: block;
            width: 76%;
            height: 1px;
            background-color: #333;
            margin: 0 auto;
            content: "";
          }
          .event-item {
            margin-top: 1rem;
            padding: 10px;
          }
          .event-title {
            font-weight: bold;
            font-size: 1.2rem;
          }
        }
      }
      .left-column {
        flex-basis: 50%;
        display: flex;
        flex-direction: column;
        .contact-box{
          background-color:white;
          padding: 10px;
          border: 1px solid black;
          text-align: center;
          width: 100%;
          span{
            font-size: 20px;
          }
        }
      }
    }
    @media (max-width: 1280) {
      padding: 4rem;
    }
  }
</style>

