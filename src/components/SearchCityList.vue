<template>
	<div>
		<ul id="cities-list">
			<li
				class="cities-list-item"
				v-for="result in searchResults"
				:key="result.place_id"
			>
				{{ result.formatted_address }}
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "SearchCitylist",
	data() {
		return {};
	},
	computed: {
		...mapState(["searchResults"]),
	},
};
</script>

<style scoped>
#cities-list {
	width: 60%;
	list-style: none;
}

.cities-list-item {
	padding: 10px 20px;
	background-color: rgba(255, 255, 255, 0.150);
	border-radius: 20px;
	color: #f0eeee;
	cursor: pointer;
}
</style>
