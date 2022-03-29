<template>
    <form action="" class="form">
        <div class="form-wrapper">
            <AttrInput 
                v-for="attr, i in attributes"
                :key="i"
                :name="attr.name" 
                :id="attr.id"
                :required="attr.is_required"
                :isSelect="attr.is_collection"
                :options="attr.is_collection ? getOptions(attr.id) : null"
                :validate="validate"
                :jsonValue="findValue(attr.id)"
                @changeValue="onChange"
            />          
        </div>
    </form>
</template>

<script>
import AttrInput from './AttrInput.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'Form',

    components: {
		AttrInput,
	},

    props: {
        validate: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        ...mapGetters({attributes: 'GET_ATTRS', values: 'GET_VALUES', collections: 'GET_COLLECTIONS'}),
    },

    methods: {
        onChange({id, value}) {
            const values = [...this.values];
            const attrInd = values.findIndex(value => value.id === id);
            if(attrInd !== -1) {
                values[attrInd].value = value;
                this.$store.commit('SET_VALUES', values);                
            }
        },

        findValue(id) {
            const attrValue = this.values.find(value => value.id === id);
            return attrValue.value;
        },

        getOptions(colId) {
            const collection = this.collections.find(col =>  col.id === colId)
            if(collection && Array.isArray(collection.options)) {
                return collection.options;
            }
        },
    }
}
</script>

<style lang="css" scope>
    .form {
        border: 1px solid gray;
        border-radius: 10px;
        padding: 20px;
    }

    .form-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 20px;
        row-gap: 0px;
    }
</style>