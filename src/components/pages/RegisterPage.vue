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
                    <form action="" method="post" class="form form-login">
                        <div class="form-field" id="formvalidation">
                            <label class="user" for="login-email"><span class="hidden">Email address</span></label>
                            <input 
                                autocomplete="off"
                                type="text"
                                v-model="email"
                                v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(email) && emailBlured}"
                                v-on:blur="emailBlured = true"
                                placeholder="Email address" 
                            >
                        </div>
                        
                        <div class="form-field">
                            <label class="user-confirm" for="login-email"><span class="hidden">Confirm Email</span></label>
                            <input id="login-email" type="text" class="form-input" placeholder="Confirm Email address" required>
                        </div>

                        <div class="form-field">
                            <label class="lock" for="login-password"><span class="hidden">Password</span></label>
                            <input 
                                autocomplete="off" 
                                type="password" 
                                v-model="password" 
                                v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}" 
                                v-on:blur="passwordBlured = true"
                                placeholder="Password" 
                                required>
                        </div>

                        <div class="form-field">
                            <label class="lock-confirm" for="login-password"><span class="hidden">Confirm Password</span></label>
                            <input id="login-password" type="password" class="form-input" placeholder="Confirm Password" required>
                        </div>
                            
                        <div class="form-field">
                            <input type="submit" value="Register Now">
                        </div>
                        <p class="register-link">Have already an account!
                            <router-link to="/login"><span class="link">Login here</span></router-link>
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

    el: '#formvalidation',
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

    methods: {
        validate: function() {
            this.emailBlured = true;
            this.passwordBlured = true;
            if( this.validEmail(this.email) && this.validPassword(this.password)){
                this.valid = true;
            }
        },

        validEmail: function(email) {
            var re = /(.+)@(.+){2,}\.(.+){2,}/;
            if(re.test(email.toLowerCase())){
                return true;
            }
        },

        validPassword : function(password) {
            if (password.length > 7) {
                return true;
            }
        },

        submit : function(){
            this.validate();
            if(this.valid){
                this.submitted = true;
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
        
        .register-link {
            text-align: center;
            color: #e5e5e5;
            padding-bottom: 20px;
        }
        .link {
            color: #00d6c0;
        }
}
</style>