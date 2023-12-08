<template>
  <div class="register-page">
    <CustomHeader title="My Concierge" subtitle="Sign Up" />
    <NavBar />
    <LayoutDiv>
      <div class="contents">
        <div class="logo">
            Register
        </div>
        <div class="login-item">
          <form 
            action="" 
            method="post" 
            class="form form-login"
            novalidate="true"
            v-on:submit.prevent="validate"
            autocomplete="off"
            id="Form" 
          >
            <div class="form-field">
              <label  for="first-name"><span class="hidden">First Name</span></label>
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name" 
                id="first-name" 
                class="form-input" 
                v-model="firstName"
                required
              />
            </div>

            <div class="form-field">
              <label for="last-name"><span class="hidden">Last Name</span></label>
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                id="last-name" 
                class="form-input" 
                v-model="lastName"
                required
              />
            </div>

            <div class="form-field" id="formvalidation">
              <label class="user" for="login-email"><span class="hidden">Email address</span></label>
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
                v-on:blur="validateEmail('email')"
                v-model="email"
                required
              />
            </div>            

            <div class="form-field">
              <label class="user-confirm" for="login-email"><span class="hidden">Confirm Email</span></label>
              <input 
                type="text" 
                name="email"
                placeholder="Confirm Email address" 
                class="form-input" 
                v-model="emailVerify"
                @blur="validateFormEM"
                required
              />
            </div>

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
                v-on:blur="validatePassword('password')"
                v-model="password"
                required
              />
            </div>

            <div class="form-field">
              <label class="lock-confirm" for="login-password"><span class="hidden">Confirm Password</span></label>
              <input 
                id="login-password" 
                type="password" 
                class="form-input" 
                placeholder="Confirm Password" 
                v-model="passwordVerify"
                @blur="validateFormPW"
                required
              />
            </div>

            <div class="form-field">
              <button class="submit" @click="registerUser" :disabled="submitDisabled">Register Now</button>
            </div>

            <p class="login-link">Already have an account!
              <router-link to="/login"><span class="link">Login here</span></router-link>
            </p>
          </form>
        </div>
      </div>
    </LayoutDiv>
  </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue'
import NavBar from '@/components/shared/NavBar.vue'
import LayoutDiv from '@/components/shared/LayoutDiv.vue'
import { mapActions, mapState } from 'pinia'
import { useLoginStore } from '@/stores/login'

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
      emailVerify: '',
      password: '',
      passwordVerify: '',
      passwordBlured: false,
      valid: false,
      submitted: false,
      errorMessageEM: '',
      errorMessagePW: '',
      firstName: '',
      lastName: '',

      validation: {
        invalid: {},
        valid: {}
      }
    }
  },
  computed: {
    ...mapState(useLoginStore, ['registrationPending']),
    submitDisabled() {
      return !this.email || !this.password
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['register']),
    async registerUser() {
      const args = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.register(args)
    },
    validateEmail() {
      if (!this.email) {
        this.validation.invalid.email = 'Please enter your email address.';
      } else {
        this.validation.valid.email = '';
      }
      this.$forceUpdate();
    },
    validatePassword() {
      if (!this.password) {
        this.validation.invalid.password = 'Please enter password.';
      } else if (this.password.length < 8) {
        this.validation.invalid.password = 
          'Password should have a minimum of 8 characters.';
      } else if (this.password.match(/[^A-Za-z0-9]/i)) {
        this.validation.invalid.password = 
          'Password should contain only letters and numbers.';
      } else {
        this.validation.invalid.password = '';
      }
      this.$forceUpdate();
    },
    validateFormEM() {
      if (this.email !== this.emailVerify) {
        this.errorMessageEM = 'Email do not match'
        return false
      }
      this.errorMessageEM = ''
      return true
    },
    validateFormPW() {
      if (this.password !== this.passwordVerify) {
        this.errorMessagePW = 'Passwords do not match';
        return false
      }
      this.errorMessagePW = '';
      return true
    }
  },
  watch: {
    registrationPending(newVal) {
      if (newVal) {
        this.$router.push({ path: '/login' });
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/base.css';
@import '@/assets/main.css';
@import url('https://netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.css');

.register-page {
  background-size: cover;
  background-color: rgb(183, 183, 183);
  min-height: 130vh;
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
    .logo {
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
      font: 16px fontawesome;
      color: #5b5b5b;
    }
    .user-confirm:before {
      content: "\f00c";
      font: 16px fontawesome;
      color: #5b5b5b;
    }
    .lock:before {
      content: '\f023';
      font: 26px fontawesome;
      color: #5b5b5b;
    }
    .lock-confirm:before {
      content: '\f00c';
      font: 16px fontawesome;
      color: #5b5b5b;
    }
    .invalid-feedback {
      color: rgb(99, 14, 14);
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
    button.submit {
      height: 56px;
      width: 100%;
      margin-bottom: 10px;
      &:hover:not([disabled]) {
        background-color: #dfe4dc;
        border: 2px solid black;
        color: black;
      }
    }
    .login-link {
      text-align: center;
      color: #e5e5e5;
      padding-bottom: 20px;
    }
    .link {
      color: #00d6c0;
    }
  }
}
</style>