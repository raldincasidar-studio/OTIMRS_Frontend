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
                        <h1>Tourist Attractions</h1>
                        <p>100 tourist(s)</p>
                    </div>
                    <div class="action">
                        <router-link to="/admin/attractions/add" class="button">
                            <i class="material-icons">add</i>
                            Add Attraction
                        </router-link>
                    </div>
                    
                </div>
                <div class="performance-grid" v-if="attractions == 'loading...'">
                    <div :to="`/admin/attractions/1`" class="item-skeleton" v-for="i in 4" :key="i">
                        <div class="image-skeleton"></div>
                    </div>
                </div>
                <div class="performance-grid" v-else>
                    <router-link :to="`/admin/attractions/1`" class="item" v-for="(attraction, i) in attractions" :key="i">
                        <div class="image-container" :style="`--image: url(${attraction.image_url || 'Weh'});`">
                            
                            <div class="informations">
                                <div class="texts">
                                    <p class="tag"><i>#{{ attraction.category || 'Unknown' }}</i></p>
                                    <h1>{{ attraction.name || 'Tourist Attraction' }}</h1>
                                    <p class="description">{{ attraction.description || 'Tourist attraction' }}</p>
                                    <p><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i></p>
                                </div>
                            </div>
                            <div class="edit-button">
                                <i class="material-icons">edit</i>
                            </div>
                        </div>
                    </router-link>
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

                    &:hover {
                        opacity: 0.8;
                    }

                    &:active {
                        transform: scale(0.9);
                    }
                }
            }
        }


        .performance-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 25px;

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
    }
}

// create an animation that changes the background color every 2 seconds
@keyframes color_change {
    0% {
        background-color: rgb(220, 220, 220);
    }
    50% {
        background-color: rgb(234, 234, 234);
    }
    100% {
        background-color: rgb(220, 220, 220);
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

const attractions = ref('loading...');

onMounted(() => {
    // make request using makeRequest from plugins/axios and get /tourists and put it in a reference
    makeRequest.get('/tourist-attractions/get').then(res => {
        if (res.data.success) {
            attractions.value = res.data.data;
        }
    })
})

</script>