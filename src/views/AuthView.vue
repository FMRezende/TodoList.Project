<template>
    <h1>Auth View</h1>
    <RouterView/>
</template>

<script>
import {RouterView} from 'vue-router';

export default {
  
    name: 'AutView',
    components :{
        RouterView,
    }
   
}
</script>
