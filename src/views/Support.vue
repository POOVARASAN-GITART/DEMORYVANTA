<script setup>
import { MailIcon, PhoneIcon, HeadphonesIcon } from "lucide-vue-next";
import { SUPPORT_LINES } from "../data/events.js";
</script>

<template>
	<div class="support-container">
		<div class="support-card">
			<div class="support-badge">
				<HeadphonesIcon class="support-badge-icon" />
				<span>Official Event Helpdesk</span>
			</div>

			<h1 class="support-title">
				Helpdesk &amp; <span class="text-brand">Support</span>
			</h1>
			<p class="support-desc">
				Have queries regarding registration, payments, problem domains,
				or need team changes? Contact the RYVANTA '26 Organizing
				Convenors directly through the official helpline numbers.
			</p>

			<div class="contact-list">
				<a
					v-for="(line, idx) in SUPPORT_LINES"
					:key="idx"
					:href="`tel:${line.tel}`"
					class="contact-card group"
				>
					<div>
						<span class="contact-label">
							{{ line.label }}
						</span>
						<span class="contact-number">
							{{ line.number }}
						</span>
					</div>
					<div class="contact-icon-wrapper">
						<PhoneIcon class="contact-icon" aria-hidden="true" />
					</div>
				</a>
			</div>

			<div class="support-footer">
				<a href="mailto:ryvanta26@gmail.com" class="email-link">
					<MailIcon class="email-icon" aria-hidden="true" />
					<span>ryvanta26@gmail.com</span>
				</a>
				<span class="support-timings"
					>Helpline Timings: 8:00 AM – 9:00 PM IST</span
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
.support-container {
	margin: 0 auto;
	max-width: 48rem;
	padding: 2.5rem 0;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.support-card {
	border-radius: var(--radius-3xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 1.5rem;
	box-shadow: var(--shadow-luxury);
}

@media (min-width: 640px) {
	.support-card {
		padding: 2.5rem;
	}
}

.support-badge {
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

.support-badge-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.support-title {
	margin-top: 1rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.875rem;
	font-weight: 900;
	color: var(--text-primary);
	letter-spacing: -0.025em;
}

@media (min-width: 640px) {
	.support-title {
		font-size: 2.25rem;
	}
}

.text-brand {
	color: var(--brand-blue);
}

.support-desc {
	margin-top: 0.75rem;
	font-size: 0.875rem;
	line-height: 1.6;
	color: var(--text-secondary);
}

.contact-list {
	margin-top: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.contact-card {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 1.25rem;
	transition: all 0.2s ease;
	text-decoration: none;
}

.contact-card:hover {
	border-color: var(--brand-blue);
	background-color: var(--bg-primary);
	box-shadow: var(--shadow-luxury);
}

.contact-label {
	display: block;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--brand-blue);
}

.contact-number {
	margin-top: 0.25rem;
	display: block;
	font-family: var(--font-mono);
	font-size: 1.25rem;
	font-weight: 700;
	color: var(--text-primary);
	transition: color 0.2s ease;
}

.contact-card:hover .contact-number {
	color: var(--brand-blue-hover);
}

.contact-icon-wrapper {
	display: flex;
	height: 2.75rem;
	width: 2.75rem;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-xl);
	background-color: var(--bg-primary);
	border: 1px solid var(--border-dark);
	color: var(--brand-blue);
	box-shadow: var(--shadow-sm);
	transition: all 0.2s ease;
}

.contact-card:hover .contact-icon-wrapper {
	background-color: var(--text-primary);
	color: var(--bg-primary);
}

.contact-icon {
	width: 1.25rem;
	height: 1.25rem;
}

.support-footer {
	margin-top: 2rem;
	border-top: 1px solid var(--border-light);
	padding-top: 1.5rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	color: var(--text-muted);
}

.email-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 600;
	color: var(--text-primary);
	text-decoration: none;
	transition: color 0.2s ease;
}

.email-link:hover {
	color: var(--brand-blue);
}

.email-icon {
	width: 1rem;
	height: 1rem;
	color: var(--brand-blue);
}

.support-timings {
	color: var(--text-muted);
}
</style>
