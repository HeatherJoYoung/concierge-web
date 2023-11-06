<template>
  <div class="dining-home">
    <CustomHeader title="My Concierge" subtitle="Dining" />
    <NavBar />
    <div class="main-container">
      <div class="col1">
        <ReservationForm 
          :fields="fields"
          @submitReservation="submitReservation"
        />
        <div class="contact-container">
          <div class="contact">
            <h3>Contact the Restaurant: 555-222-5656</h3>
          </div>
        </div>
      </div>
      
      <div class="service-container">
        <div class="services">
          <div class="title">
            <h3>
              Today's Dinner Specials
            </h3>
          </div>
          <div v-for="(item, index) in items" :key="index" class="event-item">
            <h4 class="event-title">{{ item.title }}</h4>
            <p class="event-list"><span>{{ item.food }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue';
import ReservationForm from '@/components/shared/ReservationForm.vue'
import NavBar from '@/components/shared/NavBar.vue';

export default {
  components: {
    CustomHeader,
    ReservationForm,
    NavBar
  },
  data() {
    return {
      items: [
        { 
          id: 1,
          title: 'Soup of the Day',
          food: 'Boullabaise'
        },
        { 
          id: 2,
          title: 'Seafood',
          food: 'Filet of Sole'
        },
        { 
          id: 3,
          title: 'Steak',
          food: 'Filet Mignon'
        }
      ],
      fields: [
        {
          id: 'date',
          label: 'Date',
          type: 'date'
        },
        {
          id: 'time',
          label: 'Time',
          type: 'time'
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
    };
  },
  beforeMount() {
    this.fields[0].options = this.items
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
        return !!values;
      }
    }
}
</script>
  
<style lang="scss">
@import '@/assets/base.css';
@import '@/assets/main.css';
.dining-home {
  background-size: cover;
  background-image: url("@/assets/fine-dining.jpg");
  min-height: 100vh; 
  nav {
        margin: 0;
        padding: 12px;
        border-bottom: 1px solid black;
        background-color: white;
        text-align: center;
    }
  min-height: 100vh;  
  nav {
    margin: 0;
    padding: 12px;
    border-bottom: 1px solid black;
    background-color: white;
    text-align: center;
  }

  .main-container {
    display: flex;
    gap: 6rem;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 8em;
    .col1 {
      flex-basis: 50%;
    }
    .service-container {
      background-color: white;
      border-radius: 10px;
      flex-basis: 40%;
      .services h3 {
        font-size: x-large;
        text-align: center;
        color: black;
        padding: 10px;
      }
      .services h3:after {
        content: ' ';
        display: block;
        border: 1px solid black;
        width: 50%;
        margin-inline: auto;
        margin-block: 6px;
      }
    }
    .contact-container {
      background-color: white;
      max-width: 560px;
      padding: 1em;
      border: solid 1px black;
      margin-top: 1em;
      .contact h3 {
        text-align: center;
        color: black;
      }
    }
  }

  h3 {
    font-size: 1.2rem;
    text-align: center;
  }

  .event-item {
    margin-top: 1rem;
    padding: 10px;
    text-align: center;
  }

  .event-title {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .event-list {
    font-size: 1.3rem;
  }

  @media (max-width: 767px) {
    .form-container,
    .service-container,
    .contact-container {
      width: 300px;
      margin: 1em;
    }
  }

  @media (max-width: 1400px) {
    .main-container {
      padding: 4rem;
      gap: 3rem;
    }
  }
}
</style>