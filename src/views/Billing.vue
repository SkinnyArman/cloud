<template>
<v-main>
    <dashboard-header></dashboard-header>
    <dashboard-nav></dashboard-nav>
</v-main>
</template>

<script> 
import DashboardNav from '../components/dashboardNav.vue'
import DashboardHeader from "../components/DashboardHeader.vue"

export default{
    components:{
        DashboardNav,
        DashboardHeader
    }
}

</script>