<template>
    <div class="loading-screen">
        <p>
            Loading...
        </p>
    </div>

</template>

<script>

export default {
    name: "LoadingScreen",
    data() {

    }
}

</script>

<style scoped>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 24px;
  background-color: #f0f0f0;
}
</style>