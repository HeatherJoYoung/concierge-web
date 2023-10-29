<template>
  <div class="main-header" :class="fontColor">
    <img class=logo src="../../assets/butler.png">
    <h1>My Concierge</h1>
    <h1 v-if="subtitle">&nbsp;- {{ subtitle }}</h1>

    <div class="right-section">
      <button><router-link to="/login">Sign in</router-link></button>
      <button><router-link to="/register">Sign up</router-link></button>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    subtitle: {
      type: String
    },
    fontColor: {
      type: String,
      default: 'white'
    },
    backgroundColor: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.main-header {
  background-color: #84A7AE;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  height: 180px;
  padding: 20px;
  width: 100%;
  &.black {
    h1 {
      color: black;
    }
  }
  .logo {
    background-color: white;
    display: block;
    margin: 20px 40px;
    height: 100px;
    width: 120px;    
    border-radius: 6px;
  }
  h1 {
    color: white;
    font-family: 'Marcellus', Times, serif;
    font-size: 3rem;
  }
  .right-section {
    position: absolute;
    display: block;
    padding-right: 20px;
    right: 0;
    padding-left: 50px;
  }
  button {
    background-color: white;
    color: rgb(0, 0, 0);
    padding: 15px 30px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
  }
}
</style>
  