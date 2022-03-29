import Vue from 'vue'
import Vuex from 'vuex'
import { getProduct, getAttrValues } from '../api';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		categoryId: '',
		loading: false,
		attrs: [],
		values: [],
		collections: [],
	},
	getters: {
		GET_CAT_ID: (state) => state.categoryId,
		GET_ATTRS: (state) => state.attrs,
		GET_VALUES: (state) => state.values,
		GET_LOADING: (state) => state.loading,
		HAS_ATTRS: (state) => !!state.attrs.length,
		GET_COLLECTIONS: (state) => state.collections,
	},
	
	mutations: {
		SET_CAT_ID(state, payload) {
			state.categoryId = payload;
		},

		SET_ATTRS(state, payload) {
			state.attrs = payload;
		},

		SET_VALUES_DEFAULT(state) {
			const values = state.attrs.map(attr => ({id: attr.id, value: ''}));
			state.values = values;
		},

		SET_VALUES(state, payload) {
			state.values = payload;
		},

		SET_LOADING(state, payload) {
			state.loading = payload;
		},

		SET_COLLECTIONS(state, payload) {
			state.collections = payload;
		},
	},

	actions: {
		async FETCH_DATA({ commit, dispatch }) {
			commit('SET_LOADING', true);
			await dispatch('FETCH_ATTRS');
			await dispatch('FETCH_COLLECTIONS');
			commit('SET_LOADING', false);

		},
		async FETCH_ATTRS({ commit, state }) {
			const attrs = await getProduct(state.categoryId);
			commit('SET_ATTRS', attrs);
			commit('SET_VALUES_DEFAULT');
		},

		async FETCH_COLLECTIONS({commit, state}) {
			const result = [];
			for (const attr of state.attrs) {
				if(attr.is_collection) {
					const res = await getAttrValues(state.categoryId, attr.id);
					result.push({id: attr.id, options: res});
				}
			}
			commit('SET_COLLECTIONS', result);
		}
	},
})
