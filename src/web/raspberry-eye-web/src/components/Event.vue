<template>
    <div>{{ this.event.date }}</div>
</template>

<script>
export default {
    name: 'Event',
    props: {
        event: Object
    }
}
</script>

<style>

</style>
