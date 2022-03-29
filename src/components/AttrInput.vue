<template>
    <div class="form-attr">
        <span class="form-attr__label">{{ name }}</span>
        <select v-if="isSelect" v-model="value" @change="onChange">
            <option 
                :value="option.id" 
                v-for="option, i in options" 
                :key="i"
            >{{ option.value }}</option>
        </select>
        <input v-else v-model="value" type="text" @change="onChange">
        <div class="error-message">
            <span v-if="validate && !isValid && required">*Это поле обязательно</span>
        </div> 
    </div>            
</template>

<script>

export default {
    name: 'AttrInput',

    props: {
        name: {
            type: String,
            required: true,
        },

        id: {
            type: [String, Number],
            required: true,
        },

        jsonValue: {
            type: [String, Number],
            default: '',
        },

        required: {
            type: Boolean,
            default: false,
        },

        isSelect: {
            type: Boolean,
            default: false,
        },

        options: {
            type: Array,
            default: () => [],
        },

        validate: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            value: this.jsonValue,
        };
    },

    computed: {
        isValid() {
            return this.required && !!this.value;
        },
    },

    methods: {
        onChange() {
            this.$emit('changeValue', {id: this.id, value: this.value});
        },
    },

    watch: {
        jsonValue() {
            this.value = this.jsonValue;
        }
    }
}
</script>

<style lang="css" scope>
    .form-attr {
        display: flex;
        flex-direction: column;
    }

    .form-attr__label {
        margin-bottom: 10px;
    }

    .error-message {
        font-size: 12px;
        color: red;
        padding-top: 6px;
        min-height: 20px;
    }
</style>