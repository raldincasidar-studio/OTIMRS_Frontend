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



const attractions = ref('loading...');
const acommodations = ref('loading...');
const activities = ref('loading...');

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
    makeRequest.get('/tourist-attractions/getAttraction').then(res => {
        if (res.data.success) {
            attractions.value = res.data.data;
        }
    })
    
    // make request to activities
    makeRequest.get('/tourist-attractions/getAcommodation').then(res => {
        if (res.data.success) {
            acommodations.value = res.data.data;
        }
    })
    
    // make request to activities
    makeRequest.get('/activities/get').then(res => {
        if (res.data.success) {
            activities.value = res.data.data;
        }
    })


    // make interval for the timer
    intervalValue.value = setInterval(() => {
        time.value = moment().format('hh:mm:ss A');
    }, 1000);
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
        <div class="parallax">
            <img src="@/assets/img/otimrs_logo.svg" alt="">
            <h3>Maayong Pag abot!</h3>
            <h1>{{ route.query.name || "Tourist" }}</h1>
        </div>
        <div class="bg">
            <div class="form-container">
                <div class="container">
        
                    <div class="spacer-gif">
                            <svg width="40px" height="100%" viewBox="0 0 247 390" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
                                <path id="wheel" d="M123.359,79.775l0,72.843" style="fill:none;stroke:#2A9DF2;stroke-width:20px;"/>
                                <path id="mouse" d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" style="fill:none;stroke:#2A9DF2;stroke-width:20px;"/>
                            </svg>
                            <p>We have made you a tour guide for your trip<br><b>Just scroll down</b></p>
                        </div>
                    <div class="introduction text-center">
                        <p>
                            <i class="material-icons">speaker_notes</i>
                        </p>
                        <h2 class="text-center">
                            Welcome to the Beautiful General Luna City in the Philippines!
                        </h2>
                        <p class="text-center">
                            Discover the charming city that combines modernity with rich history. General Luna City is nestled in the heart of Cagayan Valley and is a haven for tourists and travelers. Its picturesque landscapes and historic structures make it a must-visit destination for anyone looking to experience the beauty of the Philippines. From its vibrant night markets to its majestic churches and churches, General Luna City offers a unique blend of culture and nature that will leave you spellbound. So why wait? Come and explore this enchanting city and make memories that will last a lifetime!
                        </p>
                        <div class="arrow-down">
                            <i class="material-icons">arrow_downward</i>
                            <p>Discover your personalized tour</p>
                        </div>
                    </div>
                    <h1>
                        <a class="icon-button">
                            <i class="material-icons">tag</i>
                        </a>
                        Tourist Attraction
                    </h1>
        
        
                    <div class="performance-grid" v-if="attractions == 'loading...'">
                        <div class="item-skeleton" v-for="i in 4" :key="i">
                            <div class="image-skeleton"></div>
                        </div>
                    </div>
                    <div class="performance-grid" v-else>
                        <router-link :to="`/attraction-info/${attraction.id}`" class="item" v-for="(attraction, i) in attractions" :key="i">
                            <div class="image-container" :style="`--image: url(${attraction.image_url || 'Weh'});`">
        
                                <div class="informations">
                                    <div class="texts">
                                        <p class="tag"><i>#{{ attraction.category || 'Unknown' }}</i></p>
                                        <h1>{{ attraction.name || 'Tourist Attraction' }}</h1>
                                        <p class="description">{{ attraction.description || 'Tourist attraction' }}</p>
                                        <p><i class="material-icons" v-for="j in Number(attraction.rating)" :key="j">star</i></p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <h1>
                        <a class="icon-button">
                            <i class="material-icons">tag</i>
                        </a>
                        Acommodation
                    </h1>
        
        
                    <div class="performance-grid" v-if="acommodations == 'loading...'">
                        <div :to="`/admin/attractions/1`" class="item-skeleton" v-for="i in 4" :key="i">
                            <div class="image-skeleton"></div>
                        </div>
                    </div>
                    <div class="performance-grid" v-else>
                        <router-link :to="`/attraction-info/${attraction.id}`" class="item" v-for="(attraction, i) in acommodations" :key="i">
                            <div class="image-container" :style="`--image: url(${attraction.image_url || 'Weh'});`">
        
                                <div class="informations">
                                    <div class="texts">
                                        <p class="tag"><i>#{{ attraction.category || 'Unknown' }}</i></p>
                                        <h1>{{ attraction.name || 'Tourist Attraction' }}</h1>
                                        <p class="description">{{ attraction.description || 'Tourist attraction' }}</p>
                                        <p><i class="material-icons" v-for="j in Number(attraction.rating)" :key="j">star</i></p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <h1>
                        <a class="icon-button">
                            <i class="material-icons">tag</i>
                        </a>
                        Activities
                    </h1>
        
        
        
                    <div class="performance-grid activities" v-if="activities == 'loading...'">
                        <div :to="`/admin/attractions/1`" class="item-skeleton" v-for="i in 3" :key="i">
                            <div class="image-skeleton"></div>
                        </div>
                    </div>
                    <div class="performance-grid activities" v-else>
                        <router-link :to="`/activity-info/${activity.id}`" class="item" v-for="(activity, i) in activities" :key="activity.id">
                            <div class="image-container" :style="`--image: url(${activity.image_url});`">
        
                                <!-- <div class="edit-button">
                                    <i class="material-icons">edit</i>
                                </div> -->
                            </div>
        
                            <div class="informations">
                                <div class="texts">
                                    <p class="date"><i class="material-icons">calendar_today</i> {{ moment(activity.due_date).diff(moment(), 'days') < 0 ? 'Already finished' : moment(activity.due_date).diff(moment(), 'days') + (moment(activity.due_date).diff(moment(), 'days') > 1 ? ' days' : ' day') + ' left' }}</p>
                                    <h1>{{ activity.name }}</h1>
                                    <p class="description">{{ activity.description }}</p>
                                </div>
                            </div>
                        </router-link>
                    </div>
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
                    color: #2A9DF2;
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
                            background-color: #F2EA2A;
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
                    color: #2A9DF2;
                    
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
                background-color: #2A9DF2;
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
                background-color: #2A9DF2;
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
                        color: #2A9DF2;
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
                color: #2A9DF2;
                
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
    
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.422) 15%, rgba(0, 0, 0, 0.422) 15%), url(@/assets/img/background.jpg) no-repeat center center;
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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p i.material-icons {
        font-size: 80px;
        margin: 10px;
        background-color: #2a9bf227;
        padding: 30px;
        color: #2A9DF2;
        border-radius: 50%;
    }

    h2 {
        margin: 40px;
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
            color: #2A9DF2;
        }

        p {
            font-weight: bold;
            opacity: 0.3;
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