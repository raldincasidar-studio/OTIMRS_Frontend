<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import toast from '@/plugins/toast';
import moment from 'moment';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {useTouristStore} from '@/stores/tourist';
import { makeRequest } from '@/plugins/axios';

const router = useRouter();
const route = useRoute();
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



const attractions_info = ref('loading...');

// make the h1 with ref="time" make it update every second
const intervalValue = ref(null);
const time = ref(moment().format('hh:mm:ss A'));



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
    
    // make request using makeRequest from plugins/axios and get /tourists and put it in a reference
    makeRequest.get(`/activities/${route.params.id}`).then(res => {
        if (res.data.success) {
            attractions_info.value = res.data.data;
        }
    })
    
} )

onUnmounted(() => {
    clearInterval(intervalValue.value);
});



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
    <div>
        <div class="parallax" :style="`--image-url: url(${attractions_info.image_url})`">
            <!-- <img src="@/assets/img/otimrs_logo.svg" alt="">
                <h3>Maayong Pag abot!</h3>
                <h1>{{ route.query.name || "Tourist" }}</h1> -->
            </div>
            <div class="bg">
                <div class="form-container">
                    <div class="container">
                        
                        <div class="introduction text-center">
                            <p>
                                <i class="material-icons">pool</i>
                            </p>
                            <p class="text-center tag">
                                <span>#GenLunaActivities</span>
                            </p>
                            <h2 class="text-center">
                                {{ attractions_info.name }}
                            </h2>
                            <p class="text-center">
                                {{ attractions_info.description }}
                            </p>

                            <div class="text-center button-container">
                                <a :href="`https://maps.google.com/?q=${attractions_info.latitude},${attractions_info.longitude}`" target="_blank" class="button"> <i class="material-icons">location_on</i> NAVIGATE LOCATION</a>
                            </div>

                            <div class="arrow-down">
                                <i class="material-icons">arrow_downward</i>
                                <p>More Information Below</p>
                            </div>
                        </div>


                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="flex">
                                            <div class="icon-container">
                                                <i class="material-icons">business</i>
                                            </div>
                                            <div class="content">
                                                <h2>Attraction Name</h2>
                                                <p>{{ attractions_info.name }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex">
                                            <div class="icon-container">
                                                <i class="material-icons">message</i>
                                            </div>
                                            <div class="content">
                                                <h2>Description</h2>
                                                <p>{{ attractions_info.description }}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex">
                                            <div class="icon-container">
                                                <i class="material-icons">location_on</i>
                                            </div>
                                            <div class="content">
                                                <h2>Location</h2>
                                                <p>{{ attractions_info.location }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex">
                                            <div class="icon-container">
                                                <i class="material-icons">calendar_today</i>
                                            </div>
                                            <div class="content">
                                                <h2>Date</h2>
                                                <p>{{ moment(attractions_info.due_date).format('MMMM DD, YYYY') }}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex">
                                            <div class="icon-container">
                                                <i class="material-icons">people</i>
                                            </div>
                                            <div class="content">
                                                <h2>Capacity</h2>
                                                <p>{{ attractions_info.capacity }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex">
                                            <div class="icon-container">
                                                <i class="material-icons">attach_money</i>
                                            </div>
                                            <div class="content">
                                                <h2>Admission Fee</h2>
                                                <p>{{ attractions_info.cost }}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex">
                                            <div class="icon-container">
                                                <i class="material-icons">star</i>
                                            </div>
                                            <div class="content">
                                                <h2>Rating</h2>
                                                <p>{{ attractions_info.rating }} Stars <i class="material-icons" style="color: orange" v-for="i in attractions_info.rating">star</i> </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex">
                                            <div class="icon-container">
                                                <i class="material-icons">phone</i>
                                            </div>
                                            <div class="content">
                                                <h2>Contact Phone</h2>
                                                <p>{{ attractions_info.contact_phone || "No Contact Phone Provided" }}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <style scoped lang="scss">
    .bg {
        // background-image: url(../assets/img/background.jpg);
        // background:radial-gradient(circle, rgba(0,0,0,0.12088585434173671) 0%, rgba(0,0,0,0.7287289915966386) 100%), url(../assets/img/background.jpg) no-repeat center center;
        background-size: cover;
        min-height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: #F2F3F9;
        border-top-right-radius: 50px;
        border-top-left-radius: 50px;
        margin-top: -60px;
        box-shadow: 0 -6px 10px rgba(0, 0, 0, 0.229);
        
        
        & > .texts {
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
                width: 100%;
                
                & > h1 {
                    font-size: 25px;
                    color: #515151;
                    margin-bottom: 50px;
                    margin-top: 70px;
                    
                    .icon-button {
                        padding: 5px 10px;
                        display: inline;
                        color: #de2b79;
                        // outline: 1px solid red;
                        // background-color: rgb(227, 227, 227);
                        border-radius: 50%;
                        transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
                            border-bottom: 2px solid #de2b79;
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
                    background-color: #de2b79;
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
    
    .performance-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        width: 100%;
        text-align: left;
        
        .item {
            width: calc(100%/4 - 25px);
            text-align: center;
            cursor: pointer;
            transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: block;
            text-decoration: none;
            text-align: left;
            text-decoration: none;
            
            
            
            .image-container {
                width: 100%;
                padding-bottom: 170%;
                background:linear-gradient(to top, rgba(0, 0, 0, 0.084) 0%, rgba(0, 0, 0, 0.351) 200%), var(--image) no-repeat center center;
                background-size: cover;
                border-radius: 10px;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.158);
                position: relative;
                overflow: hidden;
                transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                // background-color: red;
                
                
                .informations {
                    color:white;
                    padding: 15px;
                    margin: 10px 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);;
                    
                    
                    .texts {
                        h1 {
                            font-size: 20px;
                        }
                        
                        i.material-icons {
                            color: #DEAC2B;
                            display: inline-block;
                            margin: 2px;
                            margin-top: 10px;
                        }
                        
                        p.description {
                            margin: 5px 0;
                            font-size: 15px;
                            opacity: 0.8;
                        }
                        
                        p.tag {
                            margin-bottom: 10px;
                            
                            i {
                                display: inline-block;
                                padding: 3px 15px;
                                border-radius: 999999px;
                                background-color: #592af2;
                                color:#131010;
                                font-size: 13px;
                            }
                        } 
                        
                    }
                    
                    .icon-button {
                        display: inline-block;
                        padding: 10px;
                        // outline: 1px solid red;
                        transition: .2s cubic-bezier(0.165, 0.84, 0.44, 1);
                        border-radius: 50%;
                        color: #de2b79;
                        
                        &:hover {
                            background-color: rgba(19, 16, 16, 0.095);
                        }
                    }
                    
                }
                
                &:hover {
                    background:linear-gradient(to top, rgba(0, 0, 0, 0.084) 0%, rgba(0, 0, 0, 0.351) 100%), var(--image) no-repeat center center;
                    background-size: cover;
                    
                    .informations {
                        margin-top: 20px;
                    }
                }
                
                .edit-button {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    display: inline-block;
                    margin: 20px;
                    // outline: 1px solid red;
                    color: white;
                    background-color: #de2b79;
                    padding: 13px;
                    border-radius: 50%;
                    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.241);
                }
            }
        }
        
        .item-skeleton {
            width: calc(100%/4 - 25px);
            text-align: center;
            transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: block;
            text-decoration: none;
            text-align: left;
            text-decoration: none;
            
            .image-skeleton {
                width: 100%;
                padding-bottom: 170%;
                background:rgb(220, 220, 220);
                background-size: cover;
                border-radius: 10px;
                // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.158);
                position: relative;
                overflow: hidden;
                transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                animation: color_change 1s infinite;
            }
        }
    }
    
    .performance-grid.activities {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        
        .item {
            width: calc(100%/3 - 25px);
            text-align: center;
            cursor: pointer;
            transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: block;
            text-decoration: none;
            text-align: left;
            text-decoration: none;
            // background-color: rgba(0, 0, 0, 0.026);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.158);
            border-radius: 10px;
            overflow: hidden;
            
            
            &:hover {
                transform: scale(1.02);
                box-shadow: 0 3px 20px rgba(0, 0, 0, 0.149);
            }
            
            &:active {
                transform: scale(0.98);
                box-shadow: 0 3px 4px rgba(0, 0, 0, 0.218);
            }
            
            .image-container {
                width: 100%;
                padding-bottom: 56%;
                background:radial-gradient(circle, rgba(0, 0, 0, 0.084) 0%, rgba(0, 0, 0, 0.168) 100%), var(--image) no-repeat center center;
                background-size: cover;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                position: relative;
                overflow: hidden;
                transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                // background-color: red;
                
                .edit-button {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    display: inline-block;
                    margin: 20px;
                    // outline: 1px solid red;
                    color: white;
                    background-color: #de2b79;
                    padding: 13px;
                    border-radius: 50%;
                    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.241);
                }
            }
            
            
            
            .informations {
                color:#131010;
                padding: 20px;
                margin: 10px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);;
                
                
                .texts {
                    h1 {
                        font-size: 22px;
                        
                    }
                    
                    .date {
                        // margin: 10px 0;
                        margin-bottom: 10px;
                        color: #939393;
                        
                        i.material-icons {
                            color: #de2b79;
                            display: inline-block;
                            font-size: 20px;
                        }
                    }
                    
                    
                    p.description {
                        margin: 10px 0;
                        font-size: 16px;
                        opacity: 0.6;
                        // add max-height and truncate
                        max-height: 100px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 100%;
                    }
                    
                }
                
                .icon-button {
                    display: inline-block;
                    padding: 10px;
                    // outline: 1px solid red;
                    transition: .2s cubic-bezier(0.165, 0.84, 0.44, 1);
                    border-radius: 50%;
                    color: #de2b79;
                    
                    &:hover {
                        background-color: rgba(19, 16, 16, 0.095);
                    }
                }
                
            }
        }
        
        .item-skeleton {
            width: calc(100%/3 - 25px);
            text-align: center;
            transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: block;
            text-decoration: none;
            text-align: left;
            text-decoration: none;
            
            .image-skeleton {
                width: 100%;
                padding-bottom: 110%;
                background:rgb(220, 220, 220);
                background-size: cover;
                border-radius: 10px;
                // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.158);
                position: relative;
                overflow: hidden;
                transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                animation: color_change 1s infinite;
            }
        }
    }
    
    .parallax {
        
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.422) 15%, rgba(0, 0, 0, 0.422) 15%), var(--image-url) no-repeat center center;
        background-size: cover;
        background-attachment: fixed;
        padding: 20px;
        height: 800px;
        z-index: -1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        h1 {
            color: white;
            font-weight: normal;
            font-size: 70px;
            // background-color: rgba(255, 255, 255, 0.708);
            color: white;
            padding: 10px;
            // margin: 30px 0;
            letter-spacing: 3px;
            font-style: italic;
            margin-top: -30px;
            margin-bottom: 30px;
        }
        
        h3 {
            color: white;
            font-weight: normal;
            font-size: 30px;
            // background-color: rgba(255, 255, 255, 0.708);
            color: white;
            padding: 10px;
            // margin: 30px 0;
            letter-spacing: 3px;
            font-style: italic;
        }
        
        img {
            width: 100%;
            max-width: 350px;
            margin: 20px;
            margin-bottom: 20px;
            margin-top: -20px;
        }
    }
    
    .introduction {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 30px 0;
        
        & > p i.material-icons {
            font-size: 80px;
            margin: 10px;
            background-color: #2a9bf227;
            padding: 30px;
            color: #de2b79;
            border-radius: 50%;
        }

        .button {
            display: inline-block;
            background-color: #de2b79;
            color: #F2F3F9;
            padding: 20px 25px;
            border-radius: 7px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.082);
            text-decoration: none;
            transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            border: 0;
            margin: 0 10px;
            margin-top: 50px;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
            }

            &:active {
                transform: scale(0.9);
            }
        }

        .tag {
            margin: 10px;
            margin-top: 40px;
            opacity: 1;

            span {
                display: inline-block;
                background-color: #de2b79;
                color: white;
                padding: 10px 20px;
                font-size: 25px;
                border-radius: 99999px;
            }
        }
        
        h2 {
            margin: 40px;
            margin-top: 0;
            font-size: 50px;
            color: #131010;
        }
        
        p {
            opacity: 0.8;
            line-height: 37px;
            color: #131010;
        }
        
        .arrow-down {
            i.material-icons {
                font-size: 30px;
                margin-top: 100px;
                color: #de2b79;
            }
            
            p {
                font-weight: bold;
                opacity: 0.3;
            }
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;


        td {
            padding: 20px;
            border: 1px solid rgb(220, 220, 228);
            width: 50%;

            .flex {
                display: flex;
                flex-direction: row;

                .icon-container {
                    padding: 10px;

                    i.material-icons {
                        color: #de2b79;
                        margin-right: 20px;
                        font-size: 30px;
                    }
                }
            }

            h2 {
                color: #131010;
                margin-bottom: 10px;

                i.material-icons {
                    color: #de2b79;
                    margin-right: 20px;
                }
            }

            p {
                line-height: 38px;
                opacity: 0.7;
            }
        }
    }
    
    // Stuff that matters.
    @keyframes scroll {
        0% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(60px);
        }
    }
    
    svg #wheel {
        animation: scroll ease 2s infinite;
    }
    
    .spacer-gif  {
        text-align: center;
        line-height: 37px;
        margin-bottom: 70px;
    }
    
    
    // Desktop Breakpoint
    @media only screen and (max-width: 1024px) {
        
        
        
        
    }
</style>