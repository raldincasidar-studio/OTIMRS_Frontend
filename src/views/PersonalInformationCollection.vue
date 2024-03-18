<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
    window.history.length > 1 ? this.router.go(-1) : this.router.push('/')
}
</script>

<template>
  <div class="bg">
    <div class="texts">
      <h2>Explore Beautiful</h2>
      <h1>GENERAL LUNA</h1>
    </div>
    <div class="form-container">
      <div class="container">
        <h1>
          <a @click="goBack()" href="#!" class="icon-button">
              <i class="material-icons">
                  arrow_back
              </i>
          </a>
          Personal Information
        </h1>

        <div class="input-group">
          <div class="input-container">
            <input type="text" placeholder="Email Address (@gmail.com)">
            <i class="material-icons">email</i>
          </div>
          <div class="input-container one-third">
            <input type="text" placeholder="First Name">
            <i class="material-icons">email</i>
          </div>
          <div class="input-container one-third">
            <input type="text" placeholder="Middle Name">
            <i class="material-icons">email</i>
          </div>
          <div class="input-container one-third">
            <input type="text" placeholder="Last Name">
            <i class="material-icons">email</i>
          </div>
          <div class="input-container one-third">
            <input type="text" placeholder="Gender Name">
            <i class="material-icons">email</i>
          </div>
          <div class="input-container one-third">
            <input type="text" placeholder="Birth Date">
            <i class="material-icons">email</i>
          </div>
          <div class="input-container one-third">
            <input type="text" placeholder="Address">
            <i class="material-icons">email</i>
          </div>
          <div class="input-container one-third">
            <input type="text" placeholder="Nationality">
            <i class="material-icons">email</i>
          </div>
        </div>

        <div style="text-align: right">
          <router-link to="/hotel-bookings" class="submit-button">
            NEXT
            <i class="material-icons">chevron_right</i>
          </router-link>
        </div>
      </div>
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
  align-items: center;
  flex-direction: column;

  .texts {
    text-align: center;
    margin-top: 25px;
    h2 {
      color: white;
      font-family: 'Kristi';
      font-size: 3.7rem;
      font-weight: normal;
      margin-bottom: -25px;
    }

    h1 {
      font-size: 3.4rem;
      color: #F2EA2A;
      text-shadow: 0 3px 20px rgba(0, 0, 0, 0.289);
    }
  }

  .form-container {
    width: 100%;
    padding: 20px 0;
    padding-top: 50px;
    background-color: white;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    min-height: calc(100vh - 125px);
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
      max-width: 1200px;
      padding: 15px;
      margin: auto;

      h1 {
        font-size: 25px;
        color: #515151;
        margin-bottom: 50px;

        .icon-button {
            padding: 5px 10px;
            display: inline;
            // outline: 1px solid red;
            // background-color: rgb(227, 227, 227);
            border-radius: 50%;
            transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            &:hover {
                background-color: rgb(227, 227, 227);
            }
            &:focus {
                background-color: #2A9DF2;
                color: white;
                transform: scale(0.9);
            }
        }
      }

      .input-group {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;

        .input-container {
          position: relative;
          // width: calc(100% - 15px);
          // margin: 15px;
          width: calc(100% - 30px);

          &.one-third {
            width: calc(33.33% - 30px);
          }

          input {
            width: 100%;
            padding: 15px 20px;
            padding-right: 50px;
            font-size: 16px;
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
            outline: 0;
            border: 0;
            border-bottom: 2px solid #2A9DF2;
            background-color: #e7e8ee;

            &:focus {
              box-shadow: 0 3px 6px #2a9bf253;
            }
          }

          i.material-icons {
            color: #A1A1A1;
            position: absolute;
            right: 0;
            top: 0;
            // outline: 1px solid red;
            padding: 15px;
            margin-right: 15px;
          }
        }
      }
      
      .submit-button {
        font-weight: bold;
        text-decoration: none;
        display: inline-block;
        background-color: #2A9DF2;
        padding: 13px 30px;
        padding-right: 20px;
        border-radius: 6px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.164);
        margin-top: 30px;
        justify-self: flex-end;
        transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: white;

        &:hover {

          padding-right: 15px;
          opacity: 0.8;

          i.material-icons {
            margin-left: 15px;
          }
        }

        &:active {
          transform: scale(0.9);
        }

        i.material-icons {
          margin-left: 10px;
          transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      }
    }
  }
}
</style>