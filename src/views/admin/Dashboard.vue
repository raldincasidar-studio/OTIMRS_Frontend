<template>
    <div class="login-container">
        <img src="../../assets/img/admin-logo.svg" alt="">
        <div class="texts">
            <i class="material-icons">account_circle</i>
            <h3>You are logged in as {{ auth.admin?.first_name || 'None' }}</h3>
            <p>This is the dashboard page, and it is not yet done, the login/logout API is now working.</p>
            
            <div style="text-align: center">
                <a @click="logOut()" class="submit-button">
                    <i class="material-icons">logout</i>
                    LOGOUT
                </a>
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
        max-width: 400px;
        
        & > i.material-icons {
            font-size: 60px;
            margin: 20px;
            color: #666666;
        }
        
        h3 {
            font-size: 20px;
            color: #263238;
        }

        p {
            margin: 20px;
            margin-bottom: 50px;
            opacity: 0.7;
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
        padding-left: 20px;
        border-radius: 6px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.164);
        margin-top: 30px;
        // justify-self: flex-end;
        transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: white;
        width: 100%;
        
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
import { useAuthStore } from '../../stores/auth';
import {useRouter} from 'vue-router';
import { makeRequest } from '../../plugins/axios';
import toast from '@/plugins/toast';

const auth = useAuthStore();
const router = useRouter();

async function logOut() {
    
    await makeRequest.post('/logout', {
        session_id: auth.admin.session_id
    });
    auth.admin = {};

    toast.fire({
        title: 'Logged out',
        icon: 'info'
    })
    router.push('/admin/login');
}

</script>