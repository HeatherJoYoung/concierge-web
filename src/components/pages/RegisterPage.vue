<template>
    <div class="register-page">
        <CustomHeader title="My Concierge" subtitle="Sign In" />
        <NavBar />
        <LayoutDiv>
            <div class="contents">
                <div class="logo">
                    Register
                </div>
                <div class="login-item">
                    <form action="" method="post" class="form form-login">
                        <div class="form-field">
                            <label class="user" for="login-email"><span class="hidden">Email address</span></label>
                            <input id="login-email" type="text" class="form-input" placeholder="Email address" required>
                        </div>

                        <div class="form-field">
                            <label class="user-confirm" for="login-email"><span class="hidden">Confirm Email</span></label>
                            <input id="login-email" type="text" class="form-input" placeholder="Confirm Email address" required>
                        </div>

                        <div class="form-field">
                            <label class="lock" for="login-password"><span class="hidden">Password</span></label>
                            <input id="login-password" type="password" class="form-input" placeholder="Password" required>
                        </div>

                        <div class="form-field">
                            <label class="lock-confirm" for="login-password"><span class="hidden">Confirm Password</span></label>
                            <input id="login-password" type="password" class="form-input" placeholder="Confirm Password" required>
                        </div>
                            
                        <div class="form-field">
                            <input type="submit" value="Register Now">
                        </div>
                        <p class="register-link">Have already an account
                            <router-link to="/login">Login here </router-link>
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

export default{
    components: {
    CustomHeader,
    NavBar,
    LayoutDiv
},
    data() {
    return {
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        validationErrors:{},
        isSubmitting:false,
    };
  },
}
</script>

<style lang="scss">
@import '@/assets/base.css';
@import '@/assets/main.css';

.register-page {
    background-size: cover;
    background-color: rgb(183, 183, 183);
    min-height: 100vh;
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
}

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
.user-confirm:before {
    content: "\f00c";
    font: 14px fontawesome;
	color: #5b5b5b;
}

.lock:before {
    content: '\f023';
    font: 20px fontawesome;
    color: #5b5b5b;
}
.lock-confirm:before {
    content: '\f00c';
    font: 14px fontawesome;
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
</style>