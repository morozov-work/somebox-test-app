<template>
    <div class="row">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'Row',
}
</script>

<style lang="css">
.row {
    position: relative;
    display: flex;
    justify-content: center;
    column-gap: 40px;
    align-items: center;
    margin-bottom: 40px;
}
</style>
