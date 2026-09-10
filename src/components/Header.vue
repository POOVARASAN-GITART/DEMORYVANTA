<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { TrophyIcon } from "lucide-vue-next";

const route = useRoute();
let clickCount = 0;
let clickTimer = null;

const NAV_ITEMS = [
	{ to: "/", label: "Home" },
	{ to: "/#events-lineup", label: "Events & Registration" },
	{ to: "/about", label: "About Us" },
	{ to: "/support", label: "Helpdesk & Support" },
];

function handleLogoClick() {
	clickCount++;
	if (clickCount === 1) {
		clickTimer = setTimeout(() => {
			clickCount = 0;
		}, 2000);
	} else if (clickCount >= 7) {
		clearTimeout(clickTimer);
		clickCount = 0;
		alert("Easter Egg Found...");
	}
}
</script>

<template>
	<header class="header">
		<div class="header-container">
			<div class="header-inner">
				<!-- Logo -->
				<RouterLink to="/" class="logo-group" @click="handleLogoClick">
					<div class="logo-icon-wrapper">
						<TrophyIcon class="logo-icon" />
					</div>
					<div class="logo-text">
						<span class="logo-title">RYVANTA '26</span>
						<span class="logo-subtitle"
							>Tech Innovation Challenge</span
						>
					</div>
				</RouterLink>

				<!-- Navigation (Desktop) -->
				<nav class="desktop-nav">
					<RouterLink
						v-for="item in NAV_ITEMS"
						:key="item.label"
						:to="item.to"
						class="nav-link"
						:class="{
							active:
								route.path === item.to ||
								(route.path === '/' &&
									item.to === '/#events-lineup' &&
									route.hash === '#events-lineup'),
						}"
					>
						{{ item.label }}
					</RouterLink>
				</nav>

				<!-- CTA Action -->
				<div class="cta-wrapper">
					<RouterLink to="/register" class="cta-button">
						<TrophyIcon class="cta-icon" />
						<span>Register Team</span>
					</RouterLink>
				</div>
			</div>
		</div>

		<!-- Navigation (Mobile - Bottom Scrollable) -->
		<div class="mobile-nav">
			<nav class="mobile-nav-inner">
				<RouterLink
					v-for="item in NAV_ITEMS"
					:key="item.label"
					:to="item.to"
					class="mobile-nav-link"
					:class="{
						active:
							route.path === item.to ||
							(route.path === '/' &&
								item.to === '/#events-lineup' &&
								route.hash === '#events-lineup'),
					}"
				>
					{{ item.label }}
				</RouterLink>
			</nav>
		</div>
	</header>
</template>

<style scoped>
.header {
	position: sticky;
	top: 0;
	z-index: 50;
	width: 100%;
	backdrop-filter: blur(12px);
	background-color: var(--bg-primary);
	border-bottom: 1px solid var(--border-light);
}

.header-container {
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
}

.header-inner {
	display: flex;
	height: 4rem;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}

/* Logo */
.logo-group {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	transition: transform 0.2s ease;
}

.logo-group:active {
	transform: scale(0.98);
}

.logo-icon-wrapper {
	display: flex;
	height: 2.5rem;
	width: 2.5rem;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-lg);
	background-color: var(--brand-blue);
	color: var(--bg-primary);
	box-shadow: var(--shadow-sm);
}

.logo-icon {
	width: 1.25rem;
	height: 1.25rem;
}

.logo-text {
	display: flex;
	flex-direction: column;
}

.logo-title {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.125rem;
	font-weight: 900;
	letter-spacing: -0.025em;
	color: var(--text-primary);
}

.logo-subtitle {
	display: none;
	font-size: 0.625rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-muted);
}

@media (min-width: 768px) {
	.logo-subtitle {
		display: block;
	}
}

/* Desktop Nav */
.desktop-nav {
	display: none;
	align-items: center;
	gap: 1.5rem;
}

@media (min-width: 1024px) {
	.desktop-nav {
		display: flex;
	}
}

.nav-link {
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-muted);
	transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
	color: var(--brand-blue);
}

/* CTA */
.cta-wrapper {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.cta-button {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	border-radius: var(--radius-lg);
	background-color: var(--bg-primary);
	border: 1px solid var(--border-light);
	padding: 0.5rem 0.75rem;
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
	box-shadow: var(--shadow-sm);
	transition: all 0.2s ease;
}

.cta-button:hover {
	border-color: var(--brand-blue);
	color: var(--brand-blue);
	box-shadow: var(--shadow-blue-glow);
}

.cta-icon {
	width: 1rem;
	height: 1rem;
}

/* Mobile Nav */
.mobile-nav {
	display: block;
	border-top: 1px solid var(--border-light);
	background-color: var(--bg-primary);
}

@media (min-width: 1024px) {
	.mobile-nav {
		display: none;
	}
}

.mobile-nav-inner {
	display: flex;
	overflow-x: auto;
	padding: 0.75rem 1rem;
	gap: 1.5rem;
	white-space: nowrap;
}

.mobile-nav-link {
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-muted);
	transition: color 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
	color: var(--brand-blue);
}
</style>
