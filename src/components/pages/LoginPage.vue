<template>
  <div class="login-page">
      <CustomHeader title="My Concierge" subtitle="Sign in" />
      <NavBar />
      <LayoutDiv>
          <div class="contents">
              <div class="logo">
                  Sign in
              </div>
              <div class="login-item">
                  <form 
                    action="" 
                    method="POST" 
                    class="form form-login"
                    novalidate="true"
                    v-on:submit.prevent="validate"
                    autocomplete="off"
                    id="Form"
                  >
                      <!-- Invalid email -->
                      <span class="invalid-feedback" v-if="validation.invalid.email">
                        {{ validation.invalid.email }}
                      </span>
                      <!-- Valid email --->
                      <span class="valid-feedback" v-if="validation.valid.email">
                        {{ validation.valid.email }}
                      </span>
                      <div class="form-field">
                          <label class="user" for="login-email"><span class="hidden">Email</span></label>
                          <input 
                            type="text" 
                            name="email"
                            placeholder="Email" 
                            id="email" 
                            class="form-input" 
                            autocomplete="false"
                            v-bind:class="{
                              'is-valid' : validation.valid.email,
                              'is-invalid' : validation.invalid.email
                            }"
                            v-on:focus="clearValidation('email')"
                            v-model="email"
                            required
                          />
                      </div>


                      <!-- Valid Password -->
                      <span class="invalid-feedback" v-if="validation.invalid.password">
                        {{ validation.invalid.password }}
                      </span>
                      <!-- Invalid password -->
                      <span class="valid-feedback" v-if="validation.valid.password">
                        {{ validation.valid.password }}
                      </span>
                      <div class="form-field">
                          <label class="lock" for="login-password"><span class="hidden">Password</span></label>
                          <input 
                            id="password" 
                            type="password"
                            name="password"
                            class="form-input" 
                            placeholder="Password" 
                            v-bind:class="{
                              'is-valid' : validation.valid.password,
                              'is-invalid' : validation.invalid.password
                            }"
                            v-on:focus="clearValidation('password')"
                            v-model="password"
                            required
                          />
                      </div>
                          
                      <div class="form-field">
                          <input type="submit" value="Log in">
                      </div>
                      <p class="register-link">Don't have account? 
                          <router-link to="/register"><span class="link">Register here</span></router-link>
                      </p>
                  </form>
              </div>
          </div>
      </LayoutDiv>
  </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue';
import NavBar from '@/components/shared/NavBar.vue';
import LayoutDiv from '@/components/shared/LayoutDiv.vue';

export default {
  components: {
      CustomHeader,
      NavBar,
      LayoutDiv
  },
  data() {
    return {
      email: '',
      emailBlured: false,
      password: '',
      passwordBlured: false,
      valid: false,
      submitted: false,

      validation: {
        invalid: {},
        valid: {}
      }
    };
  },

  methods: {
    validate: function () {
      // Email validation
      if (!this.email) {
        this.validation.invalid.email = 'Please enter your email address.';
      } else {
        this.validation.valid.email = '';
      }

      // Password validation
      if (!this.password) {
        this.validation.invalid.password = 'Please enter password.';
      } else if (this.password.length < 8) {
        this.validation.invalid.password = 
          'Password should have a minimum of 8 characters.';
      } else if (this.password.match(/[^a-z]/i)) {
        this.validation.invalid.password = 
          'Password should contain only latin letters (a-z).';
      } else {
        this.validation.valid.password = '';
      }

      this.$forceUpdate();
    }
  },

  clearValidation: function (field) {
    this.validation.valid[field] = '';
    this.validation.invalid[field] = '';
    this.$forceUpdate();
  }
};
</script>

<style lang="scss">
@import '@/assets/base.css';
@import '@/assets/main.css';
@import url('https://netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.css');

.login-page {
  background-size: cover;
  background-color: rgb(183, 183, 183);
  min-height: 110vh;
  nav {
  margin: 0;
  padding: 12px;
  border-bottom: 1px solid black;
  background-color: white;
  text-align: center;
  }
}

.contents {
      background:rgb(154, 149, 149);
      border-radius: 5px;
      box-shadow: 0 1.5px 0 0 rgba(0, 0, 0, 0.1);
      width: 600px;
      display: flex;  
      flex-direction: column;
      flex-wrap: wrap;
      margin-top: 3rem !important;
      justify-content: center !important;
      margin: auto;
      margin-bottom: 3rem;
      .logo{
          font-family: "museo-slab";  
          font-size:40px;
          text-align: center;
          padding: 20px 20px 0;
          margin:0;
          color: #ffffff;
      }
      .login-item {
        color: #a8a8a8;
        padding:25px 25px 0;
        margin: 20px 20px 0;	
        border-radius: 3px;
      }
      input {
          border: 0;
          color: inherit;
          font: inherit;
          margin: 0;
          outline: 0;
          padding: 0;
          -webkit-transition: background-color .3s;
          transition: background-color .3s;
      }
  
.user:before {
  content: "\f003";
  font: 14px fontawesome;
  color: #5b5b5b;
}
  
.lock:before {
  content: '\f023';
  font: 20px fontawesome;
  color: #5b5b5b;
}

.form input[type="password"], .form input[type="text"], .form input[type="submit"] {
  width: 100%;
}

.form-login label,
.form-login input[type="text"],
.form-login input[type="password"],
.form-login input[type="submit"] {
  border-radius: 0.25rem;
  padding: 1rem;
  color: #3A3F44;  
}

.form-login label {
  background-color: #222222;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.form-login input[type="text"], .form-login input[type="password"] {
  background-color: #ffffff;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.form-login input[type="text"]:focus, .form-login input[type="text"]:hover, .form-login input[type="password"]:focus, .form-login input[type="password"]:hover {
  background-color: #eeeeee;
}
.form-login input[type="submit"] {
  background-color: #00B9BC;
  color: #eee;
  font-weight: bold;
  text-transform: uppercase;
}
.form-login input[type="submit"]:focus, .form-login input[type="submit"]:hover {
  background-color: #197071;
}
.form-field {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 2rem;
}

.hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.text--center {
  text-align: center;
}

.register-link {
  text-align: center;
  color: #e5e5e5;
}

.link {
  color: #00d6c0;
}

.invalid-feedback {
  color: red;
  text-align: center;
}

}

</style>