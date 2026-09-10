<script setup>
import { ref, computed } from "vue";
import { EVENTS } from "../data/events";
import {
	CalendarIcon,
	ClockIcon,
	MapPinIcon,
	TrophyIcon,
} from "lucide-vue-next";

const activeIndex = ref(0);
const currentSchedule = computed(() => EVENTS[activeIndex.value]);
</script>

<template>
	<section class="schedule-section">
		<!-- Header -->
		<div class="schedule-header">
			<div class="header-left">
				<div class="section-badge">
					<span>Tech Innovation Challenge Schedule</span>
				</div>
				<h2 class="section-title">
					Event <span class="text-brand">Agenda</span> &amp; Schedule
				</h2>
				<p class="section-desc">
					Detailed hour-by-hour breakdown for all major technical
					events and the grand inauguration ceremony.
				</p>
			</div>

			<div class="date-badge">
				<CalendarIcon class="date-icon" />
				<span>CHALLENGE DAY: 19 SEPTEMBER 2026</span>
			</div>
		</div>

		<!-- Desktop/Tablet Horizontal Event Selector -->
		<div class="event-selector">
			<button
				v-for="(event, idx) in EVENTS"
				:key="event.id"
				type="button"
				@click="activeIndex = idx"
				class="event-tab"
				:class="{ active: activeIndex === idx }"
			>
				<span class="event-tab-name">{{ event.name }}</span>
				<span class="event-tab-venue">{{ event.venue }}</span>
			</button>
		</div>

		<!-- Interactive Phase Detailed View Card -->
		<div class="schedule-content">
			<div class="schedule-grid">
				<div class="agenda-column">
					<div class="agenda-header">
						<span class="agenda-badge">
							<MapPinIcon class="agenda-badge-icon" />
							Venue: {{ currentSchedule.venue }}
						</span>
					</div>

					<div class="agenda-list">
						<div class="timeline-container">
							<div class="timeline-track"></div>
							<div
								v-for="(item, i) in currentSchedule.agenda"
								:key="i"
								class="timeline-item"
							>
								<div class="timeline-indicator">
									<div class="timeline-dot"></div>
								</div>
								<div
									class="timeline-content"
									:class="{
										'border-b':
											i !==
											currentSchedule.agenda.length - 1,
									}"
								>
									<span class="time-text">{{
										item.time
									}}</span>
									<span class="agenda-task">{{
										item.task
									}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.schedule-section {
	position: relative;
	overflow: hidden;
	border-radius: var(--radius-3xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 1.5rem;
	box-shadow: var(--shadow-luxury);
}

@media (min-width: 640px) {
	.schedule-section {
		padding: 2.5rem;
	}
}

.schedule-header {
	position: relative;
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 1.5rem;
}

@media (min-width: 768px) {
	.schedule-header {
		flex-direction: row;
		align-items: flex-end;
	}
}

.section-badge {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: var(--radius-full);
	border: 1px solid var(--brand-blue);
	background-color: var(--bg-secondary);
	padding: 0.25rem 0.875rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--brand-blue-hover);
}

.badge-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.section-title {
	margin-top: 0.75rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.5rem;
	font-weight: 700;
	letter-spacing: -0.025em;
	color: var(--text-primary);
}

@media (min-width: 640px) {
	.section-title {
		font-size: 1.875rem;
	}
}
@media (min-width: 1024px) {
	.section-title {
		font-size: 2.25rem;
	}
}

.text-brand {
	color: var(--brand-blue);
}

.section-desc {
	margin-top: 0.5rem;
	max-width: 36rem;
	font-size: 0.75rem;
	color: var(--text-muted);
}
@media (min-width: 640px) {
	.section-desc {
		font-size: 0.875rem;
	}
}

.date-badge {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--brand-blue);
	background-color: var(--brand-blue-light);
	padding: 0.625rem 1rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--brand-blue-hover);
	box-shadow: var(--shadow-sm);
}
.date-icon {
	width: 1rem;
	height: 1rem;
	color: var(--brand-blue);
}

.event-selector {
	position: relative;
	z-index: 10;
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 0.625rem;
	align-items: center;
	justify-content: center;
}
@media (min-width: 640px) {
	.event-selector {
		grid-template-columns: repeat(3, 1fr);
	}
}

.event-tab {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 0.875rem;
	text-align: center;
	color: var(--text-secondary);
	transition: all 0.2s ease;
}

.event-tab:hover {
	border-color: var(--brand-blue);
	background-color: var(--bg-primary);
}

.event-tab.active {
	border-color: var(--brand-blue);
	background-color: var(--text-primary);
	color: var(--bg-primary);
	box-shadow: var(--shadow-md);
	outline: 2px solid var(--brand-blue);
}

.event-tab-name {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.875rem;
	font-weight: 700;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.event-tab-venue {
	margin-top: 0.25rem;
	font-family: var(--font-mono);
	font-size: 0.725rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	color: var(--text-muted);
}
.event-tab.active .event-tab-venue {
	color: var(--bg-primary);
}

.schedule-content {
	position: relative;
	z-index: 10;
	margin-top: 1.5rem;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 1.5rem;
	box-shadow: var(--shadow-sm);
}
@media (min-width: 640px) {
	.schedule-content {
		padding: 2rem;
	}
}

.schedule-grid {
	display: grid;
	gap: 1.5rem;
}
@media (min-width: 1024px) {
	.schedule-grid {
		grid-template-columns: 1fr;
	}
}

.agenda-column {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.agenda-header {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	flex-wrap: wrap;
}
.agenda-badge {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	border-radius: var(--radius-lg);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 0.25rem 0.75rem;
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}
.agenda-badge-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.agenda-list {
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	border-radius: var(--radius-xl);
	box-shadow: var(--shadow-sm);
	padding: 1.5rem;
}

.timeline-container {
	position: relative;
	display: flex;
	flex-direction: column;
}

.timeline-track {
	position: absolute;
	top: 1rem;
	bottom: 1rem;
	left: 0.4375rem; /* center of dot */
	width: 2px;
	background-color: var(--border-light);
	z-index: 1;
}

.timeline-item {
	position: relative;
	display: flex;
	gap: 1.5rem;
	z-index: 2;
}

.timeline-indicator {
	position: relative;
	margin-top: 1.25rem;
	display: flex;
	justify-content: center;
}

.timeline-dot {
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	background-color: var(--bg-primary);
	border: 2px solid var(--brand-blue);
	box-shadow: 0 0 0 4px var(--bg-primary);
}

.timeline-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 1.25rem 0;
}

@media (min-width: 640px) {
	.timeline-content {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
}

.timeline-item:hover .timeline-content {
	background-color: transparent;
}

.border-b {
	border-bottom: 1px solid var(--border-light);
}

.time-text {
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--brand-blue);
	white-space: nowrap;
}

.agenda-task {
	margin-top: 0.5rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.875rem;
	font-weight: 700;
	color: var(--text-secondary);
}

@media (min-width: 640px) {
	.agenda-task {
		margin-top: 0;
		text-align: right;
	}
}

.info-column {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 1.5rem;
	box-shadow: var(--shadow-sm);
}
@media (min-width: 1024px) {
	.info-column {
		width: 18rem;
	}
}

.info-blocks {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.info-label {
	display: flex;
	align-items: center;
	gap: 0.375rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--text-muted);
}
.info-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.info-value {
	margin-top: 0.25rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.875rem;
	font-weight: 700;
	color: var(--text-primary);
}

.attendance-box {
	border-radius: var(--radius-xl);
	border: 1px solid var(--brand-blue);
	background-color: var(--bg-secondary);
	padding: 0.75rem;
	text-align: center;
}

.attendance-label {
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-muted);
}

.attendance-value {
	margin-top: 0.125rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--text-primary);
}
</style>
