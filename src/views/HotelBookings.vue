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
                                <input type="text" placeholder="Acommodation Name">
                                <i class="material-icons">email</i>
                            </div>
                            <div class="input-container">
                                <input type="text" placeholder="Acommodation Location">
                                <i class="material-icons">email</i>
                            </div>
                            <div class="input-container">
                                <input type="text" placeholder="How may days">
                                <i class="material-icons">email</i>
                            </div>
                        </div>
                        
                        <div style="text-align: right">
                            <a href="#!" @click="saveDetails()" class="submit-button">
                                GET STARTED
                                <i class="material-icons">chevron_right</i>
                            </a>
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
        background-color: white;
        border-top-right-radius: 50px;
        border-top-left-radius: 50px;
        min-height: calc(100vh - 125px);
        display: flex;
        align-items: center;
        justify-content: center;
        
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
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
    window.history.length > 1 ? this.router.go(-1) : this.router.push('/')
}

function saveDetails() {
    // TODO

    Swal.fire({
        icon: "info",
        title: "To be done",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
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
    })
}
</script>