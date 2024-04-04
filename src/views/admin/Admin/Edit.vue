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
                        <h1>
                            <a @click="goBack()" href="#!" class="icon-button">
                                <i class="material-icons">
                                    arrow_back
                                </i>
                            </a>
                            {{ isLoading ? 'Loading...' : `${ first_name } ${ middle_name } ${ last_name }` }}
                        </h1>
                    </div>
                    <div class="action">
                        <button class="icon-button" @click="deleteAttraction()" title="Delete Attraction">
                            <i class="material-icons">delete</i>
                        </button>
                        <button @click="logOutToAllSession()" class="button orange">
                            <i class="material-icons">power_settings_new</i>
                            Logout from all session
                        </button>
                        <button @click="saveAttraction()" class="button">
                            <i class="material-icons">add</i>
                            Save Changes
                        </button>
                    </div>
                    
                </div>
                <div class="skeleton" style="text-align:center" v-if="isLoading">
                    <svg
                        role="img"
                        width="1114"
                        height="286"
                        aria-labelledby="loading-aria"
                        viewBox="0 0 1114 286"
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
                                <rect x="0" y="79" rx="9" ry="9" width="354" height="47" /> 
                                <path d="M 0 -0.5 h 354.001" /> 
                                <rect x="0" y="158" rx="9" ry="9" width="354" height="47" /> 
                                <path d="M 0 -0.5 h 354.001" /> 
                                <rect x="0" y="0" rx="9" ry="9" width="1114" height="47" /> 
                                <rect x="380" y="79" rx="9" ry="9" width="354" height="47" /> 
                                <path d="M 0 -0.5 h 354.001" /> 
                                <rect x="380" y="158" rx="9" ry="9" width="354" height="47" /> 
                                <path d="M 0 -0.5 h 354.001" /> 
                                <rect x="760" y="79" rx="9" ry="9" width="354" height="47" /> 
                                <path d="M 0 -0.5 h 354.001" /> 
                                <rect x="760" y="158" rx="9" ry="9" width="354" height="47" /> 
                                <path d="M 0 -0.5 h 354.001" /> 
                                <rect x="0" y="237" rx="9" ry="9" width="354" height="47" /> 
                                <path d="M 0 -0.5 h 354.001" />
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
                </div>
                <div v-else>
                    
                    <h2 class="subheader">Admins Information</h2>
                    <div class="input-group">
                        <div class="input-container one-third">
                            <input v-model="first_name" type="text" placeholder="First Name" required>
                            <i class="material-icons">perm_identity</i>
                        </div>
                        <div class="input-container one-third">
                            <input v-model="middle_name" type="text" placeholder="Middle Name">
                            <i class="material-icons">perm_identity</i>
                        </div>
                        <div class="input-container one-third">
                            <input v-model="last_name" type="text" placeholder="Last Name" required>
                            <i class="material-icons">perm_identity</i>
                        </div>
                        <div class="input-container one-third">
                            <input v-model="profile_picture" type="url" placeholder="Profile Picture URL" required>
                            <i class="material-icons">insert_photo</i>
                        </div>
                        <div class="input-container one-third">
                            <input v-model="username" type="text" placeholder="Username" required>
                            <i class="material-icons">person</i>
                        </div>
                        <div class="input-container one-third">
                            <input v-model="password" type="password" placeholder="New Password" required>
                            <i class="material-icons">lock</i>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    min-height: 100vh;
    position: relative;
    background-color: #F2F3F9;
}


.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    .titles {
        h1 {
        font-size: 25px;
        margin-top: 30px;
        }
        
        p {
            color: #939393;
        }
    }

    .action {
        .button {
            display: inline-block;
            background-color: #2A9DF2;
            color: #F2F3F9;
            padding: 13px 20px;
            border-radius: 7px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.082);
            text-decoration: none;
            transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            border: 0;
            margin: 0 10px;
            cursor: pointer;

            &.orange {
                background-color: #c8581c;
            }

            &:hover {
                opacity: 0.8;
            }

            &:active {
                transform: scale(0.9);
            }
        }
        .icon-button {
            display: inline-block;
            // background-color: #2A9DF2;
            color: #c73b3b;
            padding: 13px;
            border-radius: 50%;
            // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.082);
            text-decoration: none;
            transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            border: 0;
            margin: 0 10px;
            cursor: pointer;

            &:hover {
                background-color: rgba(0, 0, 0, 0.114);
            }

            &:active {
                transform: scale(0.9);
            }
        }
    }
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

        h1 {
            font-size: 25px;
            margin-top: 30px;

            .icon-button {
                padding: 5px 10px;
                display: inline;
                // outline: 1px solid red;
                // background-color: rgb(227, 227, 227);
                border-radius: 50%;
                transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);

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

        .subheader {
            font-size: 20px;
            color: #686868;
            margin: 25px 0;
            margin-top: 50px;
            font-weight: normal;
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
    }
}
</style>

<script setup>
import { useAuthStore } from '@/stores/auth';
import {useRoute, useRouter} from 'vue-router';
import { makeRequest } from '@/plugins/axios';
import toast from '@/plugins/toast';
import AdminSidenav from '@/components/AdminSidenav.vue';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import moment from 'moment';

const auth = useAuthStore();
const router = useRouter();

async function logOut() {
    
    await makeRequest.get('/logout');
    auth.admin = {};

    toast.fire({
        title: 'Logged out',
        icon: 'info'
    })
    router.push('/admin');
}

async function goBack() {
    window.history.length > 1 ? this.router.go(-1) : this.router.push('/admin/tourist-information')
}

const route = useRoute();
const isLoading = ref(true);

const first_name = ref('');
const middle_name = ref('');
const last_name = ref('');
const profile_picture = ref('');
const username = ref('');
const password = ref('');


// create an makeRequest axios that submits the form to POST /tourist-attractions/add

async function saveAttraction() {
    await makeRequest.post(`/admins/` + route.params.id, {
        first_name: first_name.value,
        middle_name: middle_name.value,
        last_name: last_name.value,
        profile_picture: profile_picture.value,
        username: username.value,
        password: password.value,
    })

    toast.fire({
        title: 'Admin Details saved',
        icon: 'success'
    })

    router.push('/admin/management');
}

async function logOutToAllSession() {
    await Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out from all other sessions including your browser.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            container: 'dont-base-reset',
            popup: 'dont-base-reset',
            header: 'dont-base-reset',
            title: 'dont-base-reset',
            closeButton: 'dont-base-reset',
            icon: 'dont-base-reset',
            image: 'dont-base-reset',
            content: 'dont-base-reset',
            input: 'dont-base-reset',
            actions: 'dont-base-reset',
            confirmButton: 'dont-base-reset',
            cancelButton: 'dont-base-reset',
            footer: 'dont-base-resets'
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            await makeRequest.delete(`/admins/logout-sessions/${route.params.id}`)
            toast.fire({
                title: 'Admin deleted',
                icon: 'success'
            })
            router.push('/admin/management');
        }
    })
}

async function deleteAttraction() {
    await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            container: 'dont-base-reset',
            popup: 'dont-base-reset',
            header: 'dont-base-reset',
            title: 'dont-base-reset',
            closeButton: 'dont-base-reset',
            icon: 'dont-base-reset',
            image: 'dont-base-reset',
            content: 'dont-base-reset',
            input: 'dont-base-reset',
            actions: 'dont-base-reset',
            confirmButton: 'dont-base-reset',
            cancelButton: 'dont-base-reset',
            footer: 'dont-base-resets'
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            await makeRequest.delete(`/admins/${route.params.id}`)
            toast.fire({
                title: 'Admin deleted',
                icon: 'success'
            })
            router.push('/admin/management');
        }
    })
}

onMounted(() => {

    // Get the id from the router parameter
    const id = route.params.id;

    // make request using makeRequest from plugins/axios and get /tourists and put it in a reference
    makeRequest.get(`/admins/${route.params.id}`).then(res => {
        if (res.data.success) {
            isLoading.value = false;
            first_name.value = res.data.data.first_name;
            middle_name.value = res.data.data.middle_name;
            last_name.value = res.data.data.last_name;
            profile_picture.value = res.data.data.profile_picture;
            username.value = res.data.data.username;
        }
    })
})
</script>