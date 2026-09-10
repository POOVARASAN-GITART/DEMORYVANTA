<script setup>
import {
	PrinterIcon,
	XIcon,
	SparklesIcon,
	CalendarIcon,
	ClockIcon,
} from "lucide-vue-next";
import QrCodeView from "./QrCodeView.vue";

const props = defineProps({
	registration: { type: Object, required: true },
	isModal: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

function handlePrint() {
	window.print();
}
</script>

<template>
	<div class="student-pass-container">
		<!-- Action Bar -->
		<div class="action-bar print-hidden">
			<div class="action-bar-left">
				<div class="module-code">TI</div>
				<div>
					<h3 class="pass-title">
						Official Participation Pass &amp; Entry Badge
					</h3>
					<span class="pass-id">ID: {{ registration.id }}</span>
				</div>
			</div>

			<div class="action-bar-right">
				<button type="button" @click="handlePrint" class="print-button">
					<PrinterIcon class="print-icon" />
					<span>Print Pass</span>
				</button>

				<button
					v-if="isModal"
					type="button"
					@click="emit('close')"
					class="close-button"
				>
					<XIcon class="close-icon" />
				</button>
			</div>
		</div>

		<!-- Cyber Blue & Silver Digital Entry Pass Card -->
		<div class="student-pass-root">
			<!-- Decorative Corner Glow -->
			<div class="corner-glow"></div>

			<!-- Header Ribbon -->
			<div class="pass-header">
				<div class="pass-header-info">
					<div class="college-badge">
						<SparklesIcon class="sparkles-icon" />
						<span>Jaya Engineering College · RYVANTA '26 Pass</span>
					</div>
					<h2 class="event-name">{{ registration.eventName }}</h2>
					<p class="institution-name">
						{{ registration.institution }}
					</p>
				</div>

				<!-- Sequential Participation ID Badge -->
				<div class="id-badge">
					<span class="id-label">Participation ID</span>
					<span class="id-value">{{ registration.id }}</span>
					<span class="id-verified">● Verified Admission</span>
				</div>
			</div>

			<!-- Pass Details Grid -->
			<div class="pass-details">
				<div class="details-main">
					<!-- Squad & Leader -->
					<div class="team-leader-grid">
						<div class="detail-box">
							<span class="detail-label">Team Name</span>
							<p class="detail-value">
								{{ registration.teamName }}
							</p>
						</div>

						<div class="detail-box">
							<span class="detail-label">Team Leader</span>
							<p class="detail-value">
								{{
									registration.leaderName ||
									registration.members[0]
								}}
							</p>
						</div>
					</div>

					<!-- Track / Domain -->
					<div class="detail-box highlight-box">
						<span class="detail-label highlight-label"
							>Assigned Problem Domain / Track</span
						>
						<p class="detail-value-mono">
							{{
								registration.track ||
								registration.domain ||
								"General Track"
							}}
						</p>
					</div>

					<!-- Team Members List -->
					<div class="members-box">
						<span class="detail-label block-label">
							Registered Team Members ({{
								registration.members.length
							}}
							Participants)
						</span>
						<div class="members-grid">
							<div
								v-for="(name, i) in registration.members"
								:key="i"
								class="member-item"
							>
								<span class="member-index">{{
									String(i + 1).padStart(2, "0")
								}}</span>
								<span class="member-name">{{ name }}</span>
							</div>
						</div>
					</div>
				</div>

				<!-- QR Code Validation Box -->
				<div class="qr-validation-box">
					<div class="qr-wrapper">
						<QrCodeView
							:value="`JEC-RYVANTA:${registration.id}|TEAM:${registration.teamName}|EVENT:${registration.eventId}`"
							:size="128"
						/>
					</div>
					<span class="qr-label">Gate Scanner QR</span>
					<span class="qr-date">19-09-2026</span>
				</div>
			</div>

			<!-- Footer Notes -->
			<div class="pass-footer">
				<div class="footer-time-info">
					<span class="time-item">
						<CalendarIcon class="time-icon" />
						19 Sep 2026
					</span>
					<span class="time-item">
						<ClockIcon class="time-icon" />
						08:30 AM IST
					</span>
				</div>
				<span class="footer-note"
					>Jaya Engineering College · Carry physical college ID cards
					to campus.</span
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
.student-pass-container {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

/* Action Bar */
.action-bar {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 1rem;
}

@media print {
	.print-hidden {
		display: none !important;
	}
}

.action-bar-left,
.action-bar-right {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.module-code {
	display: flex;
	height: 2rem;
	width: 2rem;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-xl);
	background-color: var(--brand-blue);
	color: var(--text-primary);
	font-family: var(--font-serif, var(--font-sans));
	font-weight: 700;
	font-size: 0.75rem;
}

.pass-title {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1rem;
	font-weight: 700;
	color: var(--text-primary);
}

.pass-id {
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--brand-blue);
}

.print-button {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	border-radius: var(--radius-xl);
	border: 1px solid var(--brand-blue);
	background-color: var(--bg-primary);
	padding: 0.5rem 1rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--text-primary);
	box-shadow: var(--shadow-sm);
	transition: background-color 0.2s ease;
}

.print-button:hover {
	background-color: var(--bg-secondary);
}

.print-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.close-button {
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 0.5rem;
	color: var(--text-muted);
	transition: color 0.2s ease;
}

.close-button:hover {
	color: var(--text-primary);
}

.close-icon {
	width: 1rem;
	height: 1rem;
}

/* Card Root */
.student-pass-root {
	position: relative;
	overflow: hidden;
	border-radius: var(--radius-3xl);
	border: 2px solid var(--brand-blue);
	background-color: var(--bg-primary);
	padding: 1.5rem;
	box-shadow: var(--shadow-luxury-lg);
	color: var(--text-primary);
}

@media (min-width: 640px) {
	.student-pass-root {
		padding: 2rem;
	}
}

.corner-glow {
	position: absolute;
	top: -3rem;
	right: -3rem;
	height: 8rem;
	width: 8rem;
	border-radius: 50%;
	background-color: var(--brand-blue-light);
	filter: blur(1rem);
	pointer-events: none;
}

/* Pass Header */
.pass-header {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border-bottom: 2px solid var(--border-light);
	padding-bottom: 1.5rem;
}

@media (min-width: 640px) {
	.pass-header {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
}

.college-badge {
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

.sparkles-icon {
	width: 0.75rem;
	height: 0.75rem;
	color: var(--brand-blue);
}

.event-name {
	margin-top: 0.75rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.5rem;
	font-weight: 900;
	color: var(--text-primary);
}

@media (min-width: 640px) {
	.event-name {
		font-size: 1.875rem;
	}
}

.institution-name {
	margin-top: 0.25rem;
	font-size: 0.75rem;
	color: var(--text-dark);
}

.id-badge {
	border-radius: var(--radius-2xl);
	border: 2px solid var(--brand-blue);
	background-color: var(--bg-secondary);
	padding: 1rem;
	text-align: center;
	box-shadow: var(--shadow-sm);
}

@media (min-width: 640px) {
	.id-badge {
		text-align: right;
	}
}

.id-label {
	display: block;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--text-muted);
}

.id-value {
	font-family: var(--font-mono);
	font-size: 1.5rem;
	font-weight: 900;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}

@media (min-width: 640px) {
	.id-value {
		font-size: 1.875rem;
	}
}

.id-verified {
	margin-top: 0.25rem;
	display: block;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	color: var(--brand-blue-hover);
}

/* Pass Details */
.pass-details {
	margin-top: 1.5rem;
	display: grid;
	gap: 1.5rem;
	align-items: flex-start;
}

@media (min-width: 640px) {
	.pass-details {
		grid-template-columns: minmax(0, 1fr) 160px;
	}
}

.details-main {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.team-leader-grid {
	display: grid;
	gap: 1rem;
}

@media (min-width: 640px) {
	.team-leader-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

.detail-box {
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 0.875rem;
}

.detail-label {
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--text-muted);
}

.detail-value {
	margin-top: 0.125rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1rem;
	font-weight: 700;
	color: var(--text-primary);
}

.highlight-box {
	border-color: var(--brand-blue);
}

.highlight-label {
	color: var(--brand-blue-hover);
}

.detail-value-mono {
	margin-top: 0.125rem;
	font-family: var(--font-mono);
	font-size: 0.875rem;
	font-weight: 700;
	color: var(--text-primary);
}

.members-box {
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 1rem;
}

.block-label {
	display: block;
	margin-bottom: 0.5rem;
}

.members-grid {
	display: grid;
	gap: 0.5rem;
	font-size: 0.75rem;
}

@media (min-width: 640px) {
	.members-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

.member-item {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: var(--radius-lg);
	background-color: var(--bg-primary);
	border: 1px solid var(--border-light);
	padding: 0.5rem;
}

.member-index {
	display: flex;
	height: 1.25rem;
	width: 1.25rem;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-sm);
	background-color: var(--bg-secondary);
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	color: var(--brand-blue);
}

.member-name {
	font-weight: 500;
	color: var(--text-primary);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

/* QR Code Validation Box */
.qr-validation-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 1rem;
	text-align: center;
}

.qr-wrapper {
	border-radius: var(--radius-xl);
	border: 1px solid var(--brand-blue);
	background-color: var(--bg-primary);
	padding: 0.625rem;
	box-shadow: var(--shadow-sm);
}

.qr-label {
	margin-top: 0.5rem;
	font-family: var(--font-mono);
	font-size: 0.5625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--text-muted);
}

.qr-date {
	margin-top: 0.125rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	color: var(--text-primary);
}

/* Footer Notes */
.pass-footer {
	margin-top: 1.5rem;
	border-top: 2px solid var(--border-light);
	padding-top: 1rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	color: var(--text-muted);
}

.footer-time-info {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.time-item {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	color: var(--text-primary);
	font-weight: 600;
}

.time-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.footer-note {
	/* optional styles */
}
</style>
