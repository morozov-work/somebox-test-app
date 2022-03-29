<template>
	<main class="main">
		<row>
			<input v-model="categoryId" type="text" placeholder="Введите ID категории">
			<button @click="loadAttrs">Загрузить</button>
		</row>
		<row>
			<div v-if="isLoading" class="dummy">
				<h1>Загрузка...</h1>
			</div>
			<Form v-if="hasAttrs && !isLoading" :validate="validate" />
			<div v-if="!isLoading && !hasAttrs" class="dummy">
				<h1>Нет данных</h1>
			</div>
		</row>
		<row>
			<button @click="onSave">Сохранить JSON</button>
		</row>
		<row>
			<textarea v-model="json" class="json-view"></textarea>
		</row>
		<row>
			<button @click="onLoad">Загрузить JSON</button>
		</row>
	</main>
</template>

<script>
import Row from './Row.vue';
import Form from './Form.vue';
import {mapGetters} from 'vuex';

export default {
	name: 'Main',

	components: {
		Row,
		Form,
	},

	data() {
		return {
			json: '',
			validate: false,
			categoryId: '17034410',
		};
	},

	computed: {
		...mapGetters({
			isLoading: 'GET_LOADING', 
			hasAttrs: 'HAS_ATTRS', 
			attributes: 'GET_ATTRS', 
			values: 'GET_VALUES'
		}),

	},

	methods: {
		loadAttrs() {
			this.$store.dispatch('FETCH_DATA');
		},

		onSave() {
			this.validate = true;
			if(this.validateValues()) {
				this.json = JSON.stringify(this.values);
			} else {
				console.log(this.validateValues())
			}
		},

		async onLoad() {
			if(!this.hasAttrs) await this.$store.dispatch('FETCH_DATA');
			if(this.json) this.$store.commit('SET_VALUES', JSON.parse(this.json));
		},

		validateValues() {
			const requiredItems = this.values.filter(value => this.isRequiredItem(value.id)); 
			return !requiredItems.filter(item => !item.value).length;
		},

		isRequiredItem(val) {
			const attrs = this.attributes;
			const item = attrs.find(attr => attr.id === val);
			return !!item && !!item.is_required;
		},

		isCollectionItem(val) {
			const attrs = this.attributes;
			const item = attrs.find(attr => attr.id === val);
			return !!item && !!item.is_collection;
		}
	},

	mounted() {
		this.$store.commit('SET_CAT_ID', this.categoryId);
	},

	watch: {
		categoryId() {
			this.$store.commit('SET_CAT_ID', this.categoryId);
		},
	},
}
</script>

<style lang="css">
	.main {
		margin: 0 auto;
		max-width: 1200px;
		padding: 40px;
	}

	.dummy {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 600px;
		min-height: 200px;
	}

	.json-view {
		width: 100%;
		min-height: 200px;
	}
</style>
