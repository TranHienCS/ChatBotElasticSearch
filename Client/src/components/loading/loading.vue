<template>
<div class="load">
    <div class="imgLoading">
        <img src="../../assets/loading1.gif" />
    </div>
</div>
</template>

<style>
    .load{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 1;
        /* //background-color: rgb(145, 143, 143); */
        z-index: 1132;
    }
    .imgLoading{
        position: absolute;
         /* opacity: 1; */
        z-index: 3333;
        width: 100px;
        height: 100px;
        margin-top: 15%;
        margin-left: 45%;
    }
</style>

