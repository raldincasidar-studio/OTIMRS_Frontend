<template>
    <div class="login-container">
        <img src="../../assets/img/admin-logo.svg" alt="">
        <div class="texts">
            <i class="material-icons">safety_check</i>
            <h3>Admin Access v1.3</h3>
            
            <div class="input-group">
                <div class="input-container">
                    <input v-model="username" type="text" placeholder="Username">
                    <i class="material-icons">person</i>
                </div>
                <div class="input-container">
                    <input v-model="password" type="password" placeholder="Password">
                    <i class="material-icons">key</i>
                </div>
            </div>
            
            <div style="text-align: center">
                <button @click="login()" class="submit-button">
                    <i class="material-icons">lock</i>
                    LOGIN
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #F2F3F9;
    
    & > img {
        max-width: 230px;
        margin-bottom: 40px;
        width: 100%;
    }
    
    .texts {
        text-align: center;
        max-width: 350px;
        
        & > i.material-icons {
            font-size: 60px;
            margin: 20px;
            color: #666666;
        }
        
        h3 {
            font-size: 20px;
            color: #263238;
            margin-bottom: 50px;
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
                padding: 16px;
                margin-right: 5px;
            }
        }
    }
    
    .submit-button {
        font-weight: bold;
        text-decoration: none;
        display: inline-block;
        background-color: #2A9DF2;
        padding: 13px 30px;
        padding-left: 20px;
        border-radius: 6px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.164);
        margin-top: 30px;
        // justify-self: flex-end;
        transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: white;
        width: 100%;
        border: 0;
        cursor: pointer;
        outline: 0;
        
        &:hover {
            
            // padding-left: 15px;
            opacity: 0.7;
            
            // i.material-icons {
            //     margin-right: 15px;
            // }
        }
        
        &:active {
            transform: scale(0.9);
        }
        
        i.material-icons {
            margin-right: 10px;
            transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }
}
</style>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import Swal from 'sweetalert2';
import { makeRequest } from '../../plugins/axios';
import Toast from '../../plugins/toast';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const username = ref('');
const password = ref('');

async function login() {


    let getLogin;

    getLogin = await makeRequest.post('/login', {
        username: username.value,
        password: password.value,
    });

    Toast.fire({
        title: 'Logged in Successfuly',
        icon: 'success'
    })

    auth.admin = getLogin.data;

    // add a authorization header to the request
    makeRequest.defaults.headers.common['Authorization'] = `${getLogin.data.session_id}`

    window.location.href = '/admin/dashboard';
    console.log(getLogin.data)

    

    // if (username.value == 'admin' && password.value == 'admin123') {
    //     Toast.fire({
    //         icon: "success",
    //         title: "Welcome Administrator",
    //     })
    //     router.push('/admin/dashboard');
    // } else {
    //     Toast.fire({
    //         icon: "error",
    //         title: "Invalid username or password",
    //     })
    // }
}

</script>