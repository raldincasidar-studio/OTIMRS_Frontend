<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import toast from '@/plugins/toast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {useTouristStore} from '@/stores/tourist';

const router = useRouter();
const tourist = useTouristStore();

const email = ref('');
const first_name = ref('');
const middle_name = ref('');
const last_name = ref('');
const gender = ref('');
const birthdate = ref('');
const address = ref('');
const nationality = ref('Filipino');

function goBack() {
    window.history.length > 1 ? this.router.go(-1) : this.router.push('/')
}

onMounted( () => {
  if (tourist.personal_information.email) {
    email.value = tourist.personal_information.email
    first_name.value = tourist.personal_information.first_name
    middle_name.value = tourist.personal_information.middle_name
    last_name.value = tourist.personal_information.last_name
    gender.value = tourist.personal_information.gender
    birthdate.value = tourist.personal_information.birthdate
    address.value = tourist.personal_information.address
    nationality.value = tourist.personal_information.nationality
  }
} )

function next() {


  if (email.value == "") return toast.fire({ title: 'Email is required!', icon: 'warning' })
  if (first_name.value == "") return toast.fire({ title: 'First name is required!', icon: 'warning' })
  if (last_name.value == "") return toast.fire({ title: 'Last name is required!', icon: 'warning' })
  if (address.value == "") return toast.fire({ title: 'Address is required!', icon: 'warning' })
  if (nationality.value == "") return toast.fire({ title: 'Nationality is required!', icon: 'warning' })

  const data = {
    email:        email.value,
    first_name:   first_name.value,
    middle_name:  middle_name.value,
    last_name:    last_name.value,
    gender:       gender.value,
    birthdate:    birthdate.value,
    address:      address.value,
    nationality:  nationality.value,
  }

  tourist.personal_information = data;
  toast.fire({
    title: 'Please input your acommodation',
    icon: 'info'
  })
  router.push('/hotel-bookings');
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
                <input v-model="email" type="text" placeholder="Email Address (@gmail.com)">
                <i class="material-icons">email</i>
            </div>
            <div class="input-container one-third">
                <input v-model="first_name" type="text" placeholder="First Name">
                <i class="material-icons">person</i>
            </div>
            <div class="input-container one-third">
                <input v-model="middle_name" type="text" placeholder="Middle Name">
                <i class="material-icons">person</i>
            </div>
            <div class="input-container one-third">
                <input v-model="last_name" type="text" placeholder="Last Name">
                <i class="material-icons">person</i>
            </div>
            <div class="input-container one-third">
                <!-- <input type="text" placeholder="Gender"> -->
                <select v-model="gender" name="gender" id="gender">
                  <option value="" selected disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <i class="material-icons">wc</i>
            </div>
            <div class="input-container one-third">
                <input v-model="birthdate" type="date" placeholder="Birth Date">
                <i class="material-icons">event</i>
            </div>
            <div class="input-container one-third">
                <input v-model="address" type="text" placeholder="Address">
                <i class="material-icons">location_on</i>
            </div>
            <div class="input-container one-third">
                <input v-model="nationality" type="text" placeholder="Nationality">
                <i class="material-icons">language</i>
            </div>
        </div>

        <div style="text-align: right">
          <button @click="next()" class="submit-button">
            NEXT
            <i class="material-icons">chevron_right</i>
          </button>
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
    background-color: #F2F3F9;
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

          input,
          select {
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
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;

            &:focus {
              box-shadow: 0 3px 6px #2a9bf253;
            }

            &[type="date"]::-webkit-inner-spin-button,
            &[type="date"]::-webkit-calendar-picker-indicator {
                opacity: 0;
                // margin-right: -25px;
                padding: 5px;
                opacity: 0;
                // outline: 1px solid red;
            }

            option {
              border: 0;
            }
          }

          i.material-icons {
            color: #A1A1A1;
            position: absolute;
            right: 0;
            top: 0;
            // outline: 1px solid red;
            padding: 16px;
            margin-right: 5px;
            pointer-events: none;
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
        border: 0;
        outline: 0;
        cursor: pointer;

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