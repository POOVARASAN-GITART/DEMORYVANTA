<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import RyvantaIntroLoader from "./components/RyvantaIntroLoader.vue";
import TechConstellationBackground from "./components/TechConstellationBackground.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const showContent = ref(false);

function handleLoadComplete() {
	showContent.value = true;
}
</script>

<template>
	<!-- Global Loader -->
	<RyvantaIntroLoader v-if="!showContent" @complete="handleLoadComplete" />

	<div v-else class="app-root">
		<!-- Fixed Background Canvas -->
		<div class="app-background">
			<TechConstellationBackground />
		</div>

		<!-- Main Content Layout -->
		<div class="app-content-wrapper">
			<Header />

			<main class="app-main">
				<RouterView />
			</main>

			<Footer />
		</div>
	</div>
</template>

<style scoped>
.app-root {
	position: relative;
	min-height: 100vh;
	background-color: var(--bg-primary);
	color: var(--text-primary);
}

.app-root ::selection {
	background-color: rgba(14, 165, 233, 0.2);
	color: var(--brand-blue);
}

.app-background {
	position: fixed;
	inset: 0;
	z-index: 0;
	pointer-events: none;
}

.app-content-wrapper {
	position: relative;
	z-index: 10;
	display: flex;
	min-height: 100vh;
	flex-direction: column;
}

.app-main {
	flex: 1;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 1.5rem 1rem;
}

@media (min-width: 768px) {
	.app-main {
		padding: 2rem 1.5rem;
	}
}

@media (min-width: 1024px) {
	.app-main {
		padding: 2rem;
	}
}
</style>
