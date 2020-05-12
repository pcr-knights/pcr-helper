<template>
    <b-navbar fixed="top" toggleable="lg" type="light" variant="light" id="topbar">
        {{ msg }}
    </b-navbar>
</template>

<script>
export default {
    name: "TopBar",
    props: {
        msg: String
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
#topbar {
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    z-index: 999;
    height: 64px;
}
</style>