<template>
    <div class="sidebar">
        <p style="text-align: center">
            <img src="../assets/img/admin-logo.svg" alt="Logo">
        </p>
        <div class="links">
            <router-link to="/admin/dashboard">
                <i class="material-icons">home</i>
                Dashboard
            </router-link>
            <router-link to="/admin/tourist-information">
                <i class="material-icons">people</i>
                Tourist Information
            </router-link>
            <router-link to="/admin/attractions">
                <i class="material-icons">beach_access</i>
                Attraction & Acommodation
            </router-link>
            <router-link to="/admin/activities">
                <i class="material-icons">pool</i>
                Activities
            </router-link>
            <router-link to="/admin/arrivals">
                <i class="material-icons">flight</i>
                Arrivals
            </router-link>
            <router-link to="/admin/management">
                <i class="material-icons">settings</i>
                Admin Management
            </router-link>
            <a href="#!" @click="logOut()">
                <i class="material-icons">logout</i>
                Log Out
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100vh;
    max-width: 350px;
    width: 100%;
    // box-shadow: 3px 0 30px rgba(0, 0, 0, 0.133);
    background-color: white;

    & > p {
        padding: 50px 15px;
        background-color: rgba(0, 0, 0, 0.107);
        margin-bottom: 20px;
        
        img {
            margin: 20px auto;
            max-width: 220px;
            width: 100%;
        }
    }

    .links {
        a {
            display: block;
            padding: 15px 30px;
            text-decoration: none;
            color: #939393;
            transition: all .2s ease-out;
            i.material-icons {
                margin-right: 20px;
            }

            &.active {
                color:#131010;
            }

            &:hover {
                background-color: rgb(235, 235, 235);
                color: #131010;
            }

            &:active {
                background-color:  rgb(221, 221, 221);;
            }
        }
    }

}
</style>

<script setup>
import { makeRequest } from '@/plugins/axios';
import toast from '@/plugins/toast';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
async function logOut() {
    
    auth.admin = {};
    router.push('/admin');
    await makeRequest.get('/logout');

    toast.fire({
        title: 'Logged out',
        icon: 'info'
    })
}
</script>