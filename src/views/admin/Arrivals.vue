<template>
    <div class="container">
        <admin-sidenav></admin-sidenav>
        <div class="login-container">
            <div class="navbar">
                <div class="search-container">
                    <div class="input-container">
                        <input type="text" placeholder="Search anything...">
                        <i class="material-icons">search</i>
                    </div>
                </div>
                <div class="profile-container">
                    <a href="#!">
                        Hello, {{ auth.admin.first_name }}!
                        <img :src="auth.admin.profile_picture || '/user.jpg'" alt="">
                    </a>
                </div>
            </div>
            <div class="page-container">
                <div class="header">
                    <div class="titles">
                        <h1>Arrivals</h1>
                        <p> {{ date_range ? moment(date_range[0]).format('MMMM DD, YYYY') + ' - ' + moment(date_range[1]).format('MMMM DD, YYYY') : 'Today' }}: {{ tourists != 'loading...' ? tourists.length : '0' }} tourist(s)</p>
                    </div>
                    <div class="action">
                        <router-link to="/admin/attractions/add" class="button">
                            <i class="material-icons">date_range</i>
                            Print
                        </router-link>
                        <a href="#!" class="button picker">
                            <i class="material-icons">date_range</i>
                            {{ date_range ? moment(date_range[0]).format('MMMM DD, YYYY') + ' - ' + moment(date_range[1]).format('MMMM DD, YYYY') : 'Today' }}
                            <VueDatePicker class="date-picker-orig" v-model="date_range" range="true"></VueDatePicker>
                        </a>
                    </div>
                </div>
                <!-- <div class="performance-grid" v-if="tourists == 'loading...'">
                    <a href="#!" class="item skeleton" v-for="i in 4" :key="i">
                        <svg
                            role="img"
                            width="236"
                            height="261"
                            aria-labelledby="loading-aria"
                            viewBox="0 0 236 261"
                            preserveAspectRatio="none"
                            >
                            <title id="loading-aria">Loading...</title>
                            <rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                clip-path="url(#clip-path)"
                                style='fill: url("#fill");'
                            ></rect>
                            <defs>
                                <clipPath id="clip-path">
                                    <path d="M 52 0 h 132 v 132 H 52 z" /> 
                                    <rect x="0" y="164" rx="6" ry="6" width="236" height="29" /> 
                                    <rect x="52" y="215" rx="6" ry="6" width="132" height="15" /> 
                                    <rect x="52" y="246" rx="6" ry="6" width="132" height="15" />
                                </clipPath>
                                <linearGradient id="fill">
                                <stop
                                    offset="0.599964"
                                    stop-color="#d9d9d9"
                                    stop-opacity="1"
                                >
                                    <animate
                                    attributeName="offset"
                                    values="-2; -2; 1"
                                    keyTimes="0; 0.25; 1"
                                    dur="2s"
                                    repeatCount="indefinite"
                                    ></animate>
                                </stop>
                                <stop
                                    offset="1.59996"
                                    stop-color="#ecebeb"
                                    stop-opacity="1"
                                >
                                    <animate
                                    attributeName="offset"
                                    values="-1; -1; 2"
                                    keyTimes="0; 0.25; 1"
                                    dur="2s"
                                    repeatCount="indefinite"
                                    ></animate>
                                </stop>
                                <stop
                                    offset="2.59996"
                                    stop-color="#d9d9d9"
                                    stop-opacity="1"
                                >
                                    <animate
                                    attributeName="offset"
                                    values="0; 0; 3"
                                    keyTimes="0; 0.25; 1"
                                    dur="2s"
                                    repeatCount="indefinite"
                                    ></animate>
                                </stop>
                                </linearGradient>
                            </defs>
                            </svg>
                    </a>
                </div>
                <div class="performance-grid" v-else>
                    <router-link :to="`/admin/tourist-information/${tourist.id}`" class="item" v-for="(tourist, i) in tourists" :key="tourist.id">
                        <i class="material-icons person-icon">portrait</i>
                        <div class="contexts">
                            <h2>{{ tourist.first_name }} {{ tourist.middle_name }} {{ tourist.last_name }}</h2>
                            <span class="tags">
                                <i class="material-icons">location_on</i>
                                from {{ tourist.address }}
                            </span><br>
                            <span class="tags">
                                <i class="material-icons">flight_land</i>
                                arrived on {{ moment(tourist.created_at).format('MMMM DD, YYYY hh:mm:ss A') }}
                            </span>
                        </div>
                    </router-link>
                </div> -->
                <div class="bordered-table">
                    <table>
                        <thead>
                            <th>Tourist Name</th>
                            <th>From</th>
                            <th>Arrived on</th>
                        </thead>
                        <tbody>
                            <tr v-for="i in 30" :key="i">
                                <td>{{ faker.person.fullName() }}</td>
                                <td>{{ faker.location.city() }}</td>
                                <td> <i class="material-icons">flight_land</i> {{ moment(faker.date.past()).format('MMMM DD, YYYY hh:mm:ss A') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
:root {
    --dp-hover-color: #e1e1e1 !important;
    --dp-range-between-dates-background-color: #e1e1e1 !important;

}

.dp__main {
    width: 100%;

    & > div {
        flex-grow: 1;
        width: 100%;
    }
}



.dp__input_wrap {

    .dp__pointer {
        height: 100%;
        width: 100%;
        flex-grow: 1;
    }

    height: 100% !important;
    width: 100%;
    flex-grow: 1;
    // opacity: 0 !important;
}
</style>

<style scoped lang="scss">




.container {
    min-height: 100vh;
    position: relative;
    background-color: #F2F3F9;
}


.login-container {
    padding-left: 350px;

    .navbar {
        display: flex;
        align-items: center;

        .search-container {
            width: 70%;
            // outline: 1px solid red;
            padding: 15px;

            .input-container {
                position: relative;
                width: 100%;
                max-width: 800px;
                margin: auto;

                input {
                    width: 100%;
                    display: block;
                    border: 2px solid transparent;
                    padding: 15px 30px;
                    padding-left: 60px;
                    font-size: 16px;
                    background-color: rgba(0, 0, 0, 0.019);
                    border-radius: 6px;
                    outline: 0;
                    transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);

                    &:hover,
                    &:active,
                    &:focus {
                        background-color: rgba(0, 0, 0, 0.056);
                    }

                    &:focus {
                        border-bottom: 2px solid #2A9DF2;
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                }

                i.material-icons {
                    position: absolute;
                    // outline: 1px solid red;
                    left: 0;
                    top: 0;
                    font-size: 30px;
                    padding: 12px;
                    color: #131010;
                }
            }
        }

        .profile-container {
            width: 30%;
            text-align: right;
            padding: 15px 30px;

            a {
                color: #131010;
                text-decoration: none;
                display: inline-block;
                padding: 10px 20px;
                border-radius: 7px;
                transition: all .1s linear;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.056);
                }

                &:active {
                    background-color: rgba(0, 0, 0, 0.105);
                }

                img {
                    width: 100%;
                    max-width: 50px;
                    vertical-align: middle;
                    border-radius: 50%;
                    margin-left: 20px;;
                }
            }

        }
    }

    .page-container {
        padding: 30px;
        width:100%;
        max-width: 1400px;
        margin: auto;

        .header {
            display: flex;
            justify-content: space-between;
            h1 {
                font-size: 25px;
                margin-top: 30px;
            }
            
            p {
                color: #939393;
                margin-bottom: 50px;
            }

            .action {
                .button {
                    display: inline-block;
                    background-color: #2A9DF2;
                    color: #F2F3F9;
                    padding: 13px 20px;
                    border-radius: 7px;
                    margin: 0 10px;
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.082);
                    text-decoration: none;
                    transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);


                    i.material-icons {
                        margin-right: 10px;
                    }

                    &:hover {
                        opacity: 0.8;
                    }

                    &:active {
                        transform: scale(0.9);
                    }

                    
                    &.picker {
                        background-color: white;
                        color: #131010;
                        box-shadow: none;
                        border: 1px dashed #A1A1A1;
                        position: relative;

                        &:active {
                            transform: scale(1);
                        }

                        .date-picker-orig {
                            position: absolute;
                            top: 0;
                            left: 0;
                            bottom: 0;
                            right: 0;
                            height: 100%;
                            z-index: 9;

                            .dp__input_wrap {
                                height: 100%;
                                opacity: 0 !important;
                            }
                        }
                    }
                }
            }
        }


        .performance-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 25px;

            .item {
                width: calc(100% - 25px);
                padding: 30px;
                text-align: center;
                border: 1px dashed #A1A1A1;
                cursor: pointer;
                transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                display: flex;
                align-items: center;
                text-decoration: none;


                .contexts {
                    text-align: left;
                    padding: 0 15px;
                }

                &.skeleton {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px dashed #d9d9d9;
                }

                &:hover {
                    background-color: rgba(0, 0, 0, 0.056);
                    border-radius: 6px;
                }

                .person-icon {
                    font-size: 70px;
                    color: #666666;
                    background-color: white;
                    display: inline-block;
                    padding: 20px;
                    margin: 25px 0;
                }

                h2 {
                    color: #2A9DF2;
                    font-size: 20px;
                    margin-bottom: 20px;
                }

                .tags {
                    display: inline-block;
                    padding: 3px;
                    font-size: 15px;
                    // outline: 1px solid red;
                    // margin: 5px;
                    color: #939393;

                    i.material-icons {
                        margin-right: 10px;
                        color: #1310109f;
                    }
                }
            }


        }

        .bordered-table {
            
            border: 1px dashed #A1A1A1;
            border-radius: 10px;
            padding: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;

            th {
                color: #2A9DF2;
            }

            tr {
                &:hover {
                    background-color: #00000009;
                }
            }

            th, td {
                padding: 15px;
                border-bottom: 1px dashed #d4d4d4;

                i.material-icons {
                    color: #2A9DF2;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>

<script setup>
import { useAuthStore } from '../../stores/auth';
import {useRouter} from 'vue-router';
import { makeRequest } from '../../plugins/axios';
import toast from '@/plugins/toast';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import AdminSidenav from '@/components/AdminSidenav.vue';
import { onMounted, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const auth = useAuthStore();
const router = useRouter();

const date_range = ref();

async function logOut() {
    
    await makeRequest.get('/logout');
    auth.admin = {};

    toast.fire({
        title: 'Logged out',
        icon: 'info'
    })
    router.push('/admin');
}

const tourists = ref('loading...');

onMounted(() => {
    // make request using makeRequest from plugins/axios and get /tourists and put it in a reference
    makeRequest.get('/tourists').then(res => {
        if (res.data.success) {
            tourists.value = res.data.data;
        }
    })
})

</script>