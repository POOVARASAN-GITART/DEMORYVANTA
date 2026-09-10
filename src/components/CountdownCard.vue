<script setup>
import { useCountdown } from "../composables/useCountdown";
import { computed } from "vue";

const props = defineProps({
	label: String,
	target: String,
	caption: String,
	completeLabel: String,
	emphasis: {
		type: Boolean,
		default: false,
	},
});

const { isComplete, days, hours, minutes, seconds } = useCountdown(
	props.target,
);
const UNITS = ["Days", "Hours", "Min", "Sec"];
const values = computed(() => [
	days.value,
	hours.value,
	minutes.value,
	seconds.value,
]);
</script>

<template>
	<div class="countdown-card">
		<div class="card-header">
			<h3 class="card-title">
				{{ label }}
			</h3>
			<span v-if="emphasis" class="card-badge emphasis-badge">
				KEY DEADLINE
			</span>
			<span v-else class="card-badge"> EVENT DAY </span>
		</div>

		<p v-if="isComplete" class="complete-text">
			{{ completeLabel }}
		</p>

		<div v-else class="timer-grid">
			<div
				v-for="(value, index) in values"
				:key="UNITS[index]"
				class="timer-box"
			>
				<div class="timer-value">
					{{ String(value).padStart(2, "0") }}
				</div>
				<div class="timer-label">
					{{ UNITS[index] }}
				</div>
			</div>
		</div>

		<div class="card-footer">
			<p class="caption-text">{{ caption }}</p>
		</div>
	</div>
</template>

<style scoped>
.countdown-card {
	position: relative;
	z-index: 10;
	background-color: var(--bg-primary);
	padding: 0.75rem;
	border: 1px solid var(--border-light);
	border-radius: var(--radius-2xl);
	box-shadow: var(--shadow-sm);
	transition: all 0.2s ease;
}

@media (min-width: 640px) {
	.countdown-card {
		padding: 1.25rem;
	}
}

.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 0.5rem;
	margin-bottom: 0.5rem;
}

.card-title {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.2em;
	color: var(--text-secondary);
}

.card-badge {
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--text-muted);
}

.emphasis-badge {
	color: var(--brand-blue-hover);
}

.complete-text {
	margin-top: 1rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--text-primary);
}

.timer-grid {
	margin-top: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	text-align: center;
}

@media (min-width: 640px) {
	.timer-grid {
		gap: 1rem;
	}
}

.timer-box {
	flex: 1;
	padding: 0.25rem 0;
	background-color: var(--bg-secondary);
	border: 1px solid var(--border-light);
	border-radius: var(--radius-xl);
	box-shadow: var(--shadow-sm);
}

.timer-value {
	font-family: var(--font-mono);
	font-size: 1.875rem;
	font-weight: 900;
	font-variant-numeric: tabular-nums;
	letter-spacing: -0.025em;
	color: var(--text-primary);
}

@media (min-width: 640px) {
	.timer-value {
		font-size: 2.25rem;
	}
}

.timer-label {
	margin-top: 0.25rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--brand-blue);
}

.card-footer {
	margin-top: 1rem;
	padding-top: 0.5rem;
	border-top: 1px solid var(--border-light);
}

.caption-text {
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 1.6;
	color: var(--text-muted);
}
</style>
