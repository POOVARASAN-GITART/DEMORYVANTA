<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["complete"]);

const mounted = ref(false);
const stage = ref("sliding");
const progress = ref(0);

let progressInterval;

onMounted(() => {
	// 1. Initial mounting (0s)
	setTimeout(() => {
		mounted.value = true;
	}, 80);

	// 2. Smooth Loading Counter
	const startTime = Date.now();
	const duration = 2800;

	progressInterval = setInterval(() => {
		const elapsed = Date.now() - startTime;
		const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
		progress.value = pct;
		if (pct >= 100) {
			clearInterval(progressInterval);
		}
	}, 40);

	// Phase 2: Assembled
	setTimeout(() => {
		stage.value = "assembled";
	}, 300);

	// Phase 3: Subtitles reveal
	setTimeout(() => {
		stage.value = "subtitles";
	}, 800);

	// Phase 4: Ready to boot sequence (skipped boot sequence straight to done)
	setTimeout(() => {
		handleLoginToWebsite();
	}, 3200);
});

onUnmounted(() => {
	clearInterval(progressInterval);
});

function handleLoginToWebsite() {
	if (stage.value === "entering" || stage.value === "done") return;

	stage.value = "entering";

	setTimeout(() => {
		stage.value = "done";
		emit("complete");
	}, 750);
}
</script>

<template>
	<div
		v-if="stage !== 'done'"
		class="loader-overlay"
		:class="{
			entering: stage === 'entering',
		}"
	>
		<!-- Top Organization Pill -->
		<div
			class="org-pill"
			:class="{
				'org-pill-active': [
					'subtitles',
					'ready_to_enter',
					'entering',
				].includes(stage),
			}"
		>
			<span>Jaya Engineering College</span>
		</div>

		<!-- MAIN RYVANTA LETTERS -->
		<div class="title-container">
			<div class="letters-container">
				<!-- R -->
				<span
					class="letter"
					:class="{ 'letter-active': mounted, 'text-glow': true }"
					>R</span
				>
				<!-- Y -->
				<span
					class="letter"
					:class="{ 'letter-active': mounted, 'text-glow': true }"
					>Y</span
				>
				<!-- V -->
				<span
					class="letter"
					:class="{ 'letter-active': mounted, 'text-glow': true }"
					>V</span
				>
				<!-- A -->
				<span
					class="letter"
					:class="{ 'letter-active': mounted, 'text-glow': true }"
					>A</span
				>
				<!-- N -->
				<span
					class="letter"
					:class="{ 'letter-active': mounted, 'text-glow': true }"
					>N</span
				>
				<!-- T -->
				<span
					class="letter"
					:class="{ 'letter-active': mounted, 'text-glow': true }"
					>T</span
				>
				<!-- A -->
				<span
					class="letter"
					:class="{ 'letter-active': mounted, 'text-glow': true }"
					>A</span
				>
			</div>

			<!-- '26 Badge -->
			<span
				class="year-badge"
				:class="{
					'year-active': [
						'assembled',
						'subtitles',
						'ready_to_enter',
						'entering',
					].includes(stage),
				}"
			>
				'26
			</span>
		</div>

		<!-- Subtitle Line -->
		<p
			class="subtitle"
			:class="{
				'subtitle-active': [
					'subtitles',
					'ready_to_enter',
					'entering',
				].includes(stage),
			}"
		>
			Tech Innovation Challenge
		</p>

		<!-- BOOT SEQUENCE OR PROGRESS BAR -->
		<div class="bottom-actions">
			<div class="progress-container">
				<div class="progress-track">
					<div
						class="progress-bar"
						:style="{ width: progress + '%' }"
					></div>
				</div>
				<div class="progress-text">
					<span class="progress-label">
						[INFO] SYSTEM INITIALIZING
					</span>
					<span class="progress-pct">{{ progress }}%</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.loader-overlay {
	position: fixed;
	inset: 0;
	z-index: 99999;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #000000;
	color: #ffffff;
	user-select: none;
	overflow: hidden;
	transition: all 700ms ease-out;
	opacity: 1;
	transform: scale(1);
}
.loader-overlay.entering {
	opacity: 0;
	transform: scale(1.05);
	pointer-events: none;
}
.pointer-events-none {
	pointer-events: none;
}

.ambient-glow {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	height: 24rem;
	width: 24rem;
	border-radius: 9999px;
	background-color: rgba(14, 165, 233, 0.15);
	filter: blur(64px);
}

.org-pill {
	margin-bottom: 1.5rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: 9999px;
	border: 1px solid #1e293b;
	background-color: rgba(2, 6, 23, 0.9);
	padding: 0.375rem 1rem;
	font-size: 0.75rem;
	font-family: var(--font-mono);
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: #cbd5e1;
	box-shadow:
		0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
	transition: all 700ms;
	opacity: 0;
	transform: translateY(-2rem);
}
.org-pill-active {
	opacity: 1;
	transform: translateY(0);
}
.sparkle {
	color: #0ea5e9;
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

.title-container {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: var(--font-sans);
	font-size: 3rem;
	font-weight: 900;
	letter-spacing: 0.05em;
}
@media (min-width: 640px) {
	.title-container {
		font-size: 4.5rem;
	}
}
@media (min-width: 768px) {
	.title-container {
		font-size: 6rem;
	}
}
@media (min-width: 1024px) {
	.title-container {
		font-size: 8rem;
	}
}

.letters-container {
	display: flex;
	align-items: center;
}
.letter {
	display: inline-block;
	opacity: 0;
	transition: opacity 1000ms ease-in;
}
.letter-active {
	opacity: 1;
}
.text-glow {
	text-shadow:
		0 0 35px rgba(14, 165, 233, 0.65),
		0 0 10px rgba(255, 255, 255, 0.4);
}

.year-badge {
	margin-left: 0.5rem;
	display: inline-block;
	font-family: var(--font-mono);
	font-size: 1.875rem;
	font-weight: 900;
	transition: all 500ms ease-out;
	opacity: 0;
	transform: scale(0) translateY(2rem);
	text-shadow: 0 0 25px rgba(14, 165, 233, 0.9);
	color: #0ea5e9;
}
@media (min-width: 640px) {
	.year-badge {
		font-size: 4rem;
		margin-left: 0.75rem;
	}
}
@media (min-width: 768px) {
	.year-badge {
		font-size: 5.75rem;
	}
}
.year-active {
	opacity: 1;
	transform: scale(1) translateY(0);
}

.subtitle {
	margin-top: 1rem;
	text-align: center;
	font-family: var(--font-sans);
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.25em;
	color: #94a3b8;
	transition: all 700ms;
	opacity: 0;
	transform: translateY(1.5rem);
}
@media (min-width: 640px) {
	.subtitle {
		font-size: 0.875rem;
	}
}
.subtitle-active {
	opacity: 1;
	transform: translateY(0);
}

.bottom-actions {
	margin-top: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	height: 6rem; /* fixed height to avoid layout shift */
}

/* Progress bar */
.progress-container {
	width: 16rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
}
@media (min-width: 640px) {
	.progress-container {
		width: 20rem;
	}
}
.progress-track {
	height: 0.375rem;
	width: 100%;
	overflow: hidden;
	border-radius: 9999px;
	background-color: #0f172a;
	border: 1px solid #1e293b;
}
.progress-bar {
	height: 100%;
	background-color: #0ea5e9;
	box-shadow: 0 0 20px rgba(14, 165, 233, 0.35);
	transition: all 100ms linear;
}
.progress-text {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	color: #64748b;
}
.progress-label {
	display: flex;
	align-items: center;
	gap: 0.375rem;
}
.ping-dot {
	display: inline-block;
	height: 0.375rem;
	width: 0.375rem;
	border-radius: 9999px;
	background-color: #0ea5e9;
	animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping {
	75%,
	100% {
		transform: scale(2);
		opacity: 0;
	}
}
.progress-pct {
	font-weight: 700;
	color: #0ea5e9;
}

/* Boot sequence */
.boot-sequence {
	width: 16rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	color: #10b981; /* Hacker green */
	text-align: left;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}
@media (min-width: 640px) {
	.boot-sequence {
		width: 20rem;
		font-size: 0.875rem;
	}
}
.boot-line {
	animation: type 0.2s steps(40, end);
	white-space: nowrap;
	overflow: hidden;
}
.boot-cursor {
	display: inline-block;
	animation: blink 1s step-end infinite;
}
@keyframes blink {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}
</style>
