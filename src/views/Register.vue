<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
	ShieldCheckIcon,
	AlertCircleIcon,
	CheckCircle2Icon,
} from "lucide-vue-next";
import RegistrationForm from "../components/RegistrationForm.vue";
import { EVENTS } from "../data/events.js";
import { useRegistrations } from "../composables/useRegistrations.js";

const route = useRoute();
const router = useRouter();
const { submitRegistration, existingRegistration, loadError } =
	useRegistrations();

const receipt = ref(null);

onMounted(() => {
	if (existingRegistration.value) {
		receipt.value = existingRegistration.value;
	}
});

watch(existingRegistration, (newVal) => {
	if (newVal) {
		receipt.value = newVal;
	}
});

const activeEventId = computed(() => {
	const eventId = route.query.event;
	if (EVENTS.some((e) => e.id === eventId)) {
		return eventId;
	}
	return "hackathon";
});

const activeEvent = computed(() => {
	return EVENTS.find((e) => e.id === activeEventId.value) || EVENTS[0];
});

function selectEvent(id) {
	router.replace({ query: { event: id } });
}

function handleRegistered(record) {
	receipt.value = record;
	window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
	<div class="register-container">
		<!-- Category Tabs (only show if not registered) -->
		<div v-if="!receipt" class="tabs-container">
			<button
				v-for="event in EVENTS"
				:key="event.id"
				type="button"
				@click="selectEvent(event.id)"
				:aria-current="event.id === activeEventId ? 'true' : undefined"
				class="tab-btn"
				:class="{ 'tab-active': event.id === activeEventId }"
			>
				<span class="tab-index">0{{ event.index }}.</span>
				{{ event.name }}
			</button>
		</div>

		<div v-if="loadError && !receipt" role="alert" class="error-banner">
			<div class="error-content">
				<AlertCircleIcon class="error-icon" />
				<span>{{ loadError }}</span>
			</div>
			<button
				type="button"
				@click="() => window.location.reload()"
				class="retry-btn"
			>
				Retry
			</button>
		</div>

		<!-- Permanent Registration Dialog -->
		<div v-if="receipt" class="success-dialog-container">
			<div class="success-card">
				<div class="success-icon-wrapper">
					<CheckCircle2Icon class="success-icon" />
				</div>
				<h2 class="success-title">Registration Made</h2>
				<p class="success-message">
					You will receive a confirmation email after verification on or before 17/09/2026.
				</p>

				<div class="receipt-details">
					<div class="detail-row">
						<span class="detail-label">Event</span>
						<span class="detail-value">{{
							receipt.eventName
						}}</span>
					</div>
					<div
						v-if="receipt.domain && receipt.domain !== 'N/A'"
						class="detail-row"
					>
						<span class="detail-label">Domain</span>
						<span class="detail-value">{{ receipt.domain }}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">Team Name</span>
						<span class="detail-value">{{ receipt.teamName }}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">College</span>
						<span class="detail-value">{{
							receipt.institution
						}}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">Leader Name</span>
						<span class="detail-value">{{
							receipt.leaderName
						}}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">Email</span>
						<span class="detail-value">{{
							receipt.leaderEmail
						}}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">Members</span>
						<span class="detail-value">{{
							receipt.members
								? receipt.members
										.map((m) => m.name || m.email)
										.join(", ")
								: ""
						}}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Registration Layout (only show if not registered) -->
		<div v-else class="registration-layout">
			<div class="form-wrapper">
				<RegistrationForm
					:key="activeEventId"
					:eventId="activeEventId"
					:submit="submitRegistration"
					@registered="handleRegistered"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.register-container {
	padding: 1.5rem 0;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.tabs-container {
	display: flex;
	flex-wrap: wrap;
	gap: 0.625rem;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 1.25rem;
}

.tab-btn {
	white-space: nowrap;
	border-radius: var(--radius-xl);
	padding: 0.75rem 1rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	transition: all 0.2s ease;
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	color: var(--text-secondary);
}

.tab-btn:hover:not(.tab-active) {
	border-color: var(--brand-blue);
	background-color: var(--bg-secondary);
	color: var(--text-primary);
}

.tab-active {
	border-color: var(--brand-blue);
	background-color: var(--text-primary);
	color: var(--bg-primary);
	box-shadow: var(--shadow-md);
}

.tab-index {
	color: var(--brand-blue);
	margin-right: 0.375rem;
	font-family: var(--font-mono);
}

.tab-active .tab-index {
	color: var(--bg-primary);
}

.error-banner {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--brand-blue-light);
	padding: 1rem 1.25rem;
	font-size: 0.875rem;
	color: var(--text-primary);
	box-shadow: var(--shadow-sm);
}

.error-content {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.error-icon {
	width: 1rem;
	height: 1rem;
	color: var(--brand-blue);
}

.retry-btn {
	border-radius: var(--radius-lg);
	border: 1px solid var(--brand-blue);
	background-color: var(--brand-blue-light);
	padding: 0.25rem 0.75rem;
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	transition: background-color 0.2s;
}

.retry-btn:hover {
	background-color: var(--brand-blue-light);
}

.success-dialog-container {
	display: flex;
	justify-content: center;
	padding: 2rem 1rem;
}

.success-card {
	width: 100%;
	max-width: 32rem;
	border-radius: var(--radius-3xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 2.5rem 2rem;
	text-align: center;
	box-shadow: var(--shadow-luxury-lg);
}

.success-icon-wrapper {
	margin: 0 auto 1.5rem;
	display: flex;
	height: 4rem;
	width: 4rem;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-full);
	background-color: var(--success-bg);
	color: var(--success);
}

.success-icon {
	width: 2rem;
	height: 2rem;
}

.success-title {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 2rem;
	font-weight: 900;
	color: var(--text-primary);
}

.success-message {
	margin-top: 0.5rem;
	font-size: 1rem;
	color: var(--text-muted);
}

.receipt-details {
	margin-top: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	text-align: left;
	border-radius: var(--radius-xl);
	background-color: var(--bg-secondary);
	padding: 1.5rem;
	border: 1px solid var(--border-light);
}

.detail-row {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 0.75rem;
}

.detail-row:last-child {
	border-bottom: none;
	padding-bottom: 0;
}

@media (min-width: 640px) {
	.detail-row {
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}
}

.detail-label {
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	color: var(--text-muted);
}

.detail-value {
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--text-primary);
}

.registration-layout {
	display: grid;
	gap: 2rem;
}

@media (min-width: 1024px) {
	.registration-layout {
		grid-template-columns: minmax(0, 1fr) 320px;
		align-items: flex-start;
	}
}

.sidebar-info {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 1.5rem;
	font-size: 0.875rem;
	color: var(--text-secondary);
	box-shadow: var(--shadow-luxury);
}

@media (min-width: 1024px) {
	.sidebar-info {
		position: sticky;
		top: 7rem;
	}
}

.sidebar-header {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 0.75rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.875rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}

.sidebar-icon {
	width: 1rem;
	height: 1rem;
	color: var(--brand-blue);
}

.module-code-box {
	border-radius: var(--radius-xl);
	border: 1px solid var(--brand-blue);
	background-color: var(--bg-secondary);
	padding: 0.875rem;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.module-code-label {
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--brand-blue);
	display: block;
}

.module-code-value {
	font-family: var(--font-mono);
	font-size: 1rem;
	font-weight: 900;
	color: var(--text-primary);
}

.module-code-desc {
	font-size: 0.75rem;
	color: var(--text-secondary);
}

.guidelines-list {
	display: flex;
	flex-direction: column;
	gap: 0.875rem;
	font-size: 0.75rem;
	line-height: 1.6;
}

.guideline-item {
	display: flex;
	align-items: flex-start;
	gap: 0.5rem;
}

.bullet-point {
	font-weight: 700;
}

.text-brand {
	color: var(--brand-blue);
}
.text-blue {
	color: var(--brand-blue);
}
.text-sky {
	color: var(--brand-blue);
}
.text-bold {
	font-weight: 700;
	color: var(--text-primary);
}

.code-badge {
	color: var(--text-primary);
	font-family: var(--font-mono);
	font-weight: 700;
	background-color: var(--bg-secondary);
	padding: 0.125rem 0.375rem;
	border-radius: 0.25rem;
	border: 1px solid var(--border-light);
}
</style>
