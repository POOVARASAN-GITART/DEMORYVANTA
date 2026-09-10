<script setup>
import { ref, onMounted, watch } from "vue";
import { PhoneIcon, MoonIcon, SunIcon } from "lucide-vue-next";
import { SUPPORT_LINES } from "../data/events.js";

let clickCount = 0;
let clickTimer = null;

function handleSecretLogoClick() {
	clickCount++;
	if (clickCount === 1) {
		clickTimer = setTimeout(() => {
			clickCount = 0;
		}, 2000);
	} else if (clickCount >= 5) {
		clearTimeout(clickTimer);
		clickCount = 0;
		alert("Terminal Access Granted...");
	}
}

const isDarkTheme = ref(false);

onMounted(() => {
	const stored = localStorage.getItem("ryvanta-theme");
	if (stored === "dark") {
		isDarkTheme.value = true;
		document.documentElement.classList.add("dark");
	}
});

watch(isDarkTheme, (val) => {
	if (val) {
		document.documentElement.classList.add("dark");
		localStorage.setItem("ryvanta-theme", "dark");
	} else {
		document.documentElement.classList.remove("dark");
		localStorage.setItem("ryvanta-theme", "light");
	}
});
</script>

<template>
	<footer class="footer">
		<div class="footer-container">
			<div class="footer-grid">
				<!-- Brand & Identity -->
				<div class="footer-brand">
					<div class="brand-logo" @click="handleSecretLogoClick">
						<span class="brand-title">RYVANTA '26</span>
					</div>
					<p class="brand-desc">
						Tech innovation challenge hosted at Jaya Engineering
						College.
					</p>
				</div>

				<!-- Quick Contacts -->
				<div class="footer-contacts">
					<h4 class="section-title">Priority Support Lines</h4>
					<ul class="contact-list">
						<li
							v-for="(contact, index) in SUPPORT_LINES.slice(
								0,
								2,
							)"
							:key="index"
							class="contact-item"
						>
							<PhoneIcon class="contact-icon" />
							<div class="contact-info">
								<span class="contact-name">{{
									contact.label
								}}</span>
								<span class="contact-phone">{{
									contact.number
								}}</span>
							</div>
						</li>
					</ul>
				</div>

				<!-- Settings -->
				<div class="footer-settings">
					<h4 class="section-title">Appearance</h4>
					<div class="theme-switch-buttons">
						<button
							type="button"
							@click="isDarkTheme = false"
							class="switch-button"
							:class="{ 'switch-active': !isDarkTheme }"
						>
							<SunIcon class="switch-icon" />
						</button>
						<button
							type="button"
							@click="isDarkTheme = true"
							class="switch-button"
							:class="{ 'switch-active': isDarkTheme }"
						>
							<MoonIcon class="switch-icon" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped>
.footer {
	margin-top: 4rem;
	border-top: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 3rem 0 1.5rem;
}

.footer-container {
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
}

.footer-grid {
	display: grid;
	gap: 3rem;
}

@media (min-width: 768px) {
	.footer-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

.footer-brand {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.brand-logo {
	display: flex;
	align-items: center;
	gap: 1rem;
	cursor: pointer;
}

.brand-title {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.5rem;
	font-weight: 900;
	letter-spacing: -0.025em;
	color: var(--text-primary);
}

.brand-badge {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	border-radius: var(--radius-full);
	background-color: var(--brand-blue-light);
	padding: 0.25rem 0.75rem;
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--brand-blue-hover);
}

.brand-icon {
	width: 0.875rem;
	height: 0.875rem;
}

.brand-desc {
	font-size: 0.875rem;
	color: var(--text-muted);
	max-width: 24rem;
	line-height: 1.6;
}

.footer-contacts {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.section-title {
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}

.contact-list {
	display: grid;
	gap: 1rem;
}

@media (min-width: 640px) {
	.contact-list {
		grid-template-columns: repeat(2, 1fr);
	}
}

.contact-item {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
}

.contact-icon {
	width: 1.25rem;
	height: 1.25rem;
	color: var(--text-muted);
	flex-shrink: 0;
	margin-top: 0.25rem;
}

.contact-info {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.contact-name {
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--text-primary);
}

.contact-role {
	font-size: 0.75rem;
	color: var(--text-muted);
}

.contact-phone {
	font-family: var(--font-mono);
	font-size: 0.875rem;
	color: var(--brand-blue);
}

.footer-settings {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.theme-switch-buttons {
	display: inline-flex;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 0.25rem;
	width: fit-content;
}

.switch-button {
	border-radius: var(--radius-lg);
	padding: 0.5rem 0.75rem;
	color: var(--text-muted);
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.switch-button:hover {
	color: var(--text-primary);
}

.switch-active {
	background-color: var(--text-primary);
	color: var(--bg-primary);
	box-shadow: var(--shadow-sm);
}

.switch-active:hover {
	color: var(--bg-primary);
}

.switch-icon {
	width: 1.25rem;
	height: 1.25rem;
}

.footer-bottom {
	margin-top: 4rem;
	border-top: 1px solid var(--border-light);
	padding-top: 1.5rem;
}

.footer-bottom-inner {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}

@media (min-width: 640px) {
	.footer-bottom-inner {
		flex-direction: row;
	}
}

.security-badge {
	display: flex;
	align-items: center;
	gap: 0.375rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-muted);
}

.security-icon {
	width: 0.875rem;
	height: 0.875rem;
}
</style>
