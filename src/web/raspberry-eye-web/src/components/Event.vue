<template>
    <div>
        {{ dbEvent.date }}
    </div>
</template>

<script>
export default {
    name: 'Event',
    props: {
        dbEvent: {
            type: Object,
            require: true
        }
    }
}
</script>

<style>

</style>
