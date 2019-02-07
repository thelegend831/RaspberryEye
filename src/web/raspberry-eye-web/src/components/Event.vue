<template>
    <div class="column is-one-quarter">
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img v-bind:src="imgSrc">
                </figure>
            </div>
            <div class="card-content">
                <p class="tile">{{ this.event.date }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Event',
    props: {
        event: Object
    },

    computed: {
        imgSrc() {
            return 'data:image/png;base64,' + this.event.image;
        }
    }
}
</script>

<style>

</style>
