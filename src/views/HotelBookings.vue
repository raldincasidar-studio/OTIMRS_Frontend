<template>
    <div class="bg">
        <div class="texts">
            <h2>Explore Beautiful</h2>
            <h1>GENERAL LUNA</h1>
        </div>
        <div class="form-container">
            <div class="container">
                <div class="grid-container">
                    <div>
                        <img src="../assets/img/Hotel Booking-rafiki.svg" class="full-width">
                    </div>
                    <div>
                        
                        <h1>
                            <a @click="goBack()" href="#!" class="icon-button">
                                <i class="material-icons">
                                    arrow_back
                                </i>
                            </a>
                            Acommodation Details
                        </h1>
                        
                        <div class="input-group">
                            <div class="input-container">
                                <input type="text" placeholder="Accommodation Name" v-model="acommodation_name">
                                <i class="material-icons">business</i>
                            </div>
                            <div class="input-container">
                                <input type="text" placeholder="Accommodation Location" v-model="acommodation_location">
                                <i class="material-icons">location_on</i>
                            </div>
                            <div class="input-container">
                                <input type="text" placeholder="How many days" v-model="acommodation_how_many_days">
                                <i class="material-icons">event_available</i>
                            </div>
                        </div>
                        
                        <div style="text-align: right">
                            <button @click="saveDetails()" class="submit-button">
                                GET STARTED
                                <i class="material-icons">chevron_right</i>
                            </button>
                        </div>
                    </div>
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
        border: 0;
        cursor: pointer;
        outline: 0;
        
        .container {
            max-width: 1500px;
            padding: 15px;
            margin: auto;
            
            .grid-container
            {
                display: flex;
                flex-direction: row;
                align-items: center;

                & > div {
                    width: 50%;
                }

                .full-width {
                    width: 100%;
                }
            }

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
                    width: calc(100%);
                    
                    &.one-third {
                        width: calc(33.33%);
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

<script setup>
import { makeRequest } from '@/plugins/axios';
import toast from '@/plugins/toast';
import { useTouristStore } from '@/stores/tourist';
import axios from 'axios';
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tourist = useTouristStore();

const acommodation_name = ref('');
const acommodation_location = ref('');
const acommodation_how_many_days = ref('');

function goBack() {
    window.history.length > 1 ? this.router.go(-1) : this.router.push('/')
}

onMounted(() => {
    if (tourist.accommodation.name) {
        acommodation_name.value = tourist.accommodation.name
        acommodation_location.value = tourist.accommodation.location
        acommodation_how_many_days.value = tourist.accommodation.days
    }
})

async function saveDetails() {
    // TODO

    if (acommodation_name.value === "" || acommodation_location.value === "" || acommodation_how_many_days.value === "")
        return toast.fire({ title: 'All fields are required!', icon: 'warning' });

    tourist.accommodation = {
        name: acommodation_name.value,
        location: acommodation_location.value,
        days: acommodation_how_many_days.value,
    }

    const submitToDatabase = await makeRequest.post('/register_tourist', {
        name: tourist.accommodation.name,
        location: tourist.accommodation.location,
        days: tourist.accommodation.days,
        email: tourist.personal_information.email,
        first_name: tourist.personal_information.first_name,
        last_name: tourist.personal_information.last_name,
        middle_name: tourist.personal_information.middle_name,
        gender: tourist.personal_information.gender,
        birthdate: tourist.personal_information.birthdate,
        address: tourist.personal_information.address,
        nationality: tourist.personal_information.nationality,
    })

    if (submitToDatabase.data.message) {
        toast.fire({
            icon: "success",
            title: submitToDatabase.data.message,
        })

        tourist.accommodation = {}
        tourist.personal_information = {}
    }   
}
</script>