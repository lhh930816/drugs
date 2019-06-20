<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="logo" :style="{width:width+'px'}">
            <a href="/" v-if="!collapse">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAAAYCAYAAAB0vVZPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4M0Y1MUIyODE1RDExRTdCOThBOUEzNzcyNzJGODNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4M0Y1MUIzODE1RDExRTdCOThBOUEzNzcyNzJGODNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzgzRjUxQjA4MTVEMTFFN0I5OEE5QTM3NzI3MkY4M0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzgzRjUxQjE4MTVEMTFFN0I5OEE5QTM3NzI3MkY4M0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6zQ/ayAAAJe0lEQVR42uxb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" alt="logo" class="app-logo">
            </a>
            <span v-if="collapse">熙康</span>
        </div>
        <div class="collapse-btn" @click="collapseChage">
            <i class="fa fa-bars"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="@/assets/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../../static/bus';
    export default {
        data() {
            return {
                collapse: true,
                fullscreen: false,
                name: 'admin',
                message: 2,
                width: 200
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                this.width = this.collapse ? 64 : 200;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        color: #909399;
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,.08);
        z-index: 1;
    }
    .collapse-btn{
        float: left;
        padding: 0 12px;
        cursor: pointer;
        line-height: 50px;
    }
    .header .logo{
        float: left;
        width:200px;
        line-height: 50px;
        background: #17b3a3;
        -webkit-transition: left .3s ease-in-out;
        transition: left .3s ease-in-out;
    }
    .header .logo a img {
        vertical-align: sub;
        padding:0 12px;
    }
    .header .logo span {
        display: block;
        text-align: center;
        color: #fff;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 50px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
