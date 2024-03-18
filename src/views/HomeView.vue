<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="bg">
    <div class="texts">
      <h2>Explore Beautiful</h2>
      <h1>GENERAL LUNA</h1>
      <router-link to="/personal-information-collection" class="button">
        GET STARTED
        <i class="material-icons">arrow_forward</i>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg {
  // background-image: url(../assets/img/background.jpg);
  background:radial-gradient(circle, rgba(0,0,0,0.12088585434173671) 0%, rgba(0,0,0,0.7287289915966386) 100%), url(../assets/img/background.jpg) no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .texts {
    text-align: center;
    h2 {
      color: white;
      font-family: 'Kristi';
      font-size: 6.7rem;
      font-weight: normal;
      margin-bottom: -50px;
    }

    h1 {
      font-size: 6rem;
      color: #F2EA2A;
      text-shadow: 0 3px 20px rgba(0, 0, 0, 0.289);
    }

    .button {
      display: inline-block;
      border: 2px solid white;
      text-decoration: none;
      color: white;
      padding: 20px 40px;
      font-weight: bold;
      letter-spacing: 5px;
      margin-top: 50px;
      transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:hover {
        background-color: white;
        color: #515151;

        i.material-icons {
          margin-left: 20px;
        }
      }

      &:active {
        transform: scale(0.9);
      }

      i.material-icons {
        transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        margin-left: 10px;
      }
    }
  }
}
</style>