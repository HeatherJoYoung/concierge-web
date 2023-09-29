<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="dining-home">

    <div>
      <CustomHeader title="My Concierge" subtitle="Dining" />
    </div>


    <div class="navbar-container">
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li class="sep">|</li>
          <li><a href="#">Calendar</a></li>
          <li class="sep">|</li>
          <li><a href="#">Services</a></li>
        </ul>
      </nav>
    </div>

    <div class="main-container">
      <div class="col1">
        <div class="form-container">
          <div class="form-box">
            <div class="title">
              <h3>Make a Reservation</h3>
            </div>

            <div class="row">
              <input type="text">
              <input type="text">
            </div>

            <div class="row">
              <input type="text">
              <input type="text">
            </div>

            <div class="row">
              <button>Submit</button>
            </div>

          </div>
        </div>

        <div class="contact-container">
          <div class="contact">
            <h3>Contact the Spa: 555-222-5656</h3>
          </div>
        </div>

      </div>

      <div class="service-container">
        <div class="services">
          <div class="title">
            <h3>Today's Dinner Specials</h3>
          </div>

          <div>
            <li v-for="(item, index) in items">
              {{ item.message }}
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '../shared/CustomHeader.vue';

export default {
  components: {
    CustomHeader
  },
  data() {
    return {
      items: [
        { message: 'Soup of the Day'},
        { message: 'Boullabaise'},
        { message: 'Seafood' },
        { message: 'Filet of Sole' },
        { message: 'Steak' },
        { message: 'Filet Mignon' }
      ]
    };
  },
}
</script>
  
<style lang="scss">
.dining-home {
    background-size: cover;
    background-image: url("/src/assets/fine-dining.jpg");
    min-height: 100dvh;

  .navbar-container {
    li {
      display: inline;
      list-style: none;
    }

    nav {
      background-color: white;
      margin: 0;
      text-align: center;

      .sep {
        color: black;
      }

      a {
        text-decoration: none;
        color: black;
        /* Link color */
      }
    }
  }

  .main-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 2em;

    .form-container {
      background-color: white;
      width: 500px;
      padding: 0.5em;
      border: solid 1px black;

      .row {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        margin: 4em;
      }

      .row input {
        width: 150px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid #cccccc;
        border-color: black;
      }

      h3 {
        text-align: center;
        border-bottom: solid 1px;
        color: black;
        padding: 10px;
      }
    }

    .service-container {
      background-color: white;
      width: 400px;
      border-radius: 10px;

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

      .services li {
        color: black;
        list-style-type: none;
        text-align: center;
        line-height: 3em;
        font-size: large;
      }
    }

    .contact-container {
      background-color: white;
      width: 500px;
      padding: 1em;
      border: solid 1px black;
      margin-top: 1em;

      .contact h3 {
        text-align: center;
        color: black;
      }
    }
  }

  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
  }

  h3 {
    font-size: 1.2rem;
    text-align: center;
  }

  @media (max-width: 767px) {

    .form-container,
    .service-container,
    .contact-container {
      width: 300px;
      margin: 1em;
    }
  }
}
</style>
