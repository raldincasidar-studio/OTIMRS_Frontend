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
                <h1>
                    <a @click="goBack()" href="#!" class="icon-button">
                        <i class="material-icons">
                            arrow_back
                        </i>
                    </a>
                    Juan Magic Luna
                </h1>
                <h2 class="subheader">Personal Information</h2>
                <div class="input-group">
                    <div class="input-container">
                        <input readonly type="text" placeholder="Email Address (@gmail.com)">
                        <i class="material-icons">email</i>
                    </div>
                    <div class="input-container one-third">
                        <input readonly type="text" placeholder="First Name">
                        <i class="material-icons">person</i>
                    </div>
                    <div class="input-container one-third">
                        <input readonly type="text" placeholder="Middle Name">
                        <i class="material-icons">person</i>
                    </div>
                    <div class="input-container one-third">
                        <input readonly type="text" placeholder="Last Name">
                        <i class="material-icons">person</i>
                    </div>
                    <div class="input-container one-third">
                        <!-- <input type="text" placeholder="Gender"> -->
                        <select readonly name="gender" id="gender">
                            <option value="" selected disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <i class="material-icons">wc</i>
                    </div>
                    <div class="input-container one-third">
                        <input readonly type="date" placeholder="Birth Date">
                        <i class="material-icons">event</i>
                    </div>
                    <div class="input-container one-third">
                        <input readonly type="text" placeholder="Address">
                        <i class="material-icons">location_on</i>
                    </div>
                    <div class="input-container one-third">
                        <input readonly type="text" placeholder="Nationality">
                        <i class="material-icons">language</i>
                    </div>
                </div>
                <h2 class="subheader">Acommodation</h2>
                <div class="input-group">
                    <div class="input-container one-third">
                        <input readonly type="text" placeholder="Accommodation Name">
                        <i class="material-icons">business</i>
                    </div>
                    <div class="input-container one-third">
                        <input readonly type="text" placeholder="Accommodation Location">
                        <i class="material-icons">location_on</i>
                    </div>
                    <div class="input-container one-third">
                        <input readonly type="text" placeholder="How many days">
                        <i class="material-icons">event_available</i>
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
import {useRouter} from 'vue-router';
import { makeRequest } from '@/plugins/axios';
import toast from '@/plugins/toast';
import AdminSidenav from '@/components/AdminSidenav.vue';

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
</script>