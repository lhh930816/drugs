<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#2F323A"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <div class="sidebar-background"></div>
    </div>
</template>

<script>
    import bus from '../../static/bus';
    export default {
        data() {
            return {
                collapse: true,
                items: [
                    {
                        icon: 'fa fa-list',
                        index: '0',
                        title: '数据维护',
                        subs: [
                            {
                                index: 'YPZD',
                                title: '药品字典'
                            },
                            {
                                index: 'BMYP',
                                title: '部门药品'
                            },
                            {
                                index: 'BMXX',
                                title: '部门信息'
                            },
                            {
                                index: 'GYS',
                                title: '供应商'
                            }
                        ]
                    },
                    {
                        icon: 'fa fa-suitcase',
                        index: '1',
                        title: '日常业务',
                        subs: [
                            {
                                index: 'CGRK',
                                title: '采购入库'
                            },
                            {
                                index: 'THCK',
                                title: '退货出库'
                            },
                            {
                                index: 'DBSQ',
                                title: '调拨申请'
                            },
                            {
                                index: 'DBRK',
                                title: '调拨入库'
                            },
                            {
                                index: 'DBCK',
                                title: '调拨出库'
                            },
                            {
                                index: 'BSBY',
                                title: '报损报溢'
                            },
                            {
                                index: 'QKPD',
                                title: '全库盘点'
                            },
                            {
                                index: 'YPTJ',
                                title: '药品调价'
                            }
                        ]
                    },
                    {
                        icon: "fa fa-stethoscope",
                        index: "cfs",
                        title: '医生工作站'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 50px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-submenu__title i {
        margin-right: 5px;
    }
    .el-menu-item i {
        margin-right: 5px;
    }
</style>
