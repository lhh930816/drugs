<template>
    <div class="wrapper">
        <!--头部-->
        <v-head></v-head>
        <!--侧边栏-->
        <v-sidebar></v-sidebar>
        <!--内容-->
        <div class="content-main" :class="{'content-collapse':collapse}">
            <div class='content-box' >
                <div class="content">
                    <transition name="move" mode="out-in">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from '@/components/Sidebar.vue';
    import bus from '../../static/bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead, vSidebar
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
	    }
    }
</script>
<style >
.content-main {
    position: absolute;
    left: 199px;
    right: 0;
    top: 50px;
    bottom: 0;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
}
.content-main .content-box {
    margin: 15px;
    min-height: 582px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,.3)
}
.content-collapse {
    left: 63px;
}
.el-submenu .el-menu-item {
    min-width: 199px !important;
}
.el-menu--vertical .el-menu--popup-right-start{
    margin-left: 0;
    margin-right: 0;
}
</style>