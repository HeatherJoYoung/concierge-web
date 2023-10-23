<template>
    <div class="register-page">
        <CustomHeader title="My Concierge" subtitle="Sign In" />
        <NavBar />
        <LayoutDiv>
        <div class="row justify-content-md-center mt-5">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Register</h5>
                        <form >
                            <div class="mb-3">
                                <label 
                                    htmlFor="name"
                                    class="form-label">Name
                                </label>
                                <input 
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    name="name"
                                    v-model="name"
                                />
                                <div v-if="validationErrors.name" class="flex flex-col">
                                    <small  class="text-danger">
                                    {{validationErrors?.name[0]}}
                                    </small >
                                </div>      
                            </div>
                            <div class="mb-3">
                                <label 
                                    htmlFor="email"
                                    class="form-label">Email address
                                </label>
                                <input 
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    name="email"
                                    v-model="email"
                                />
                                <div v-if="validationErrors.email" class="flex flex-col">
                                    <small  class="text-danger">
                                    {{validationErrors?.email[0]}}
                                    </small >
                                </div>
                            </div>
                            <div class="mb-3">
                                <label 
                                    htmlFor="password"
                                    class="form-label">Password
                                </label>
                                <input 
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    name="password"
                                    v-model="password"
                                />
                               <div v-if="validationErrors.password" class="flex flex-col">
                                    <small  class="text-danger">
                                    {{validationErrors?.password[0]}}
                                    </small >
                                </div>
                            </div>
                            <div class="mb-3">
                                <label 
                                    htmlFor="confirm_password"
                                    class="form-label">Confirm Password
                                </label>
                                <input 
                                    type="password"
                                    class="form-control"
                                    id="confirm_password"
                                    name="confirm_password"
                                    v-model="confirmPassword"
                                />
                            </div>
                            <div class="d-grid gap-2">
                                <button 
                                    :disabled="isSubmitting"
                                    @click="registerAction()"
                                    type="button"
                                    class="btn btn-primary btn-block">Register Now
                                </button>
                                <p 
                                    class="text-center">Have already an account <router-link to="/login">Login here</router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </LayoutDiv>
    </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue';
import NavBar from '@/components/shared/NavBar.vue';
import LayoutDiv from '../shared/LayoutDiv.vue';

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
  background-color: grey;
  min-height: 100vh;
}
</style>