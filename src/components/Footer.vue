<template>
    <div class="footer">
        <!-- <router-link v-for="(subNav, index) in nav" :key="index" :to="nav.path" exact>

            <icon :name="subNav.icon"></icon>
            <p>{{ subNav.name }}</p>
        </router-link>-->
        <div class="subNav">
            <router-link to="/">首页</router-link>
            <router-link to="/cinema">影院</router-link>
            <router-link to="/hall">大厅</router-link>
            <router-link to="/welfare">福利</router-link>
            <router-link to="/me">我</router-link>
        </div>
<!--        <ul>-->
<!--            <li v-for="(name, index) in svgName" :key="index">-->
<!--                <svg-icon :iconClass="name"></svg-icon>-->
<!--            </li>-->
<!--        </ul>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                svgName: ["user", "password", "email"]
            };
        }
    };
</script>

<style scoped lang="scss">
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 1001;
        background-color: #ffffff;
        border-top: 1px solid #e7e7e7;
        border-bottom: 1px solid #f8f8f8;
        // padding: 20px;
        // padding-top: 4px;
        box-shadow: 0 0 5px 0 hsla(0, 6%, 78%, 0.3);

        .subNav {
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-around;
            align-items: center;
            text-align: center;

            a {
                font-size: 16px;
                color: #333;
                padding: 5px 0;

                svg {
                    font-size: 38px;
                }

                p {
                    margin-top: 10px;
                }
            }
        }

        .router-link-active {
            svg,
            p {
                color: red;
            }
        }
    }
</style>
