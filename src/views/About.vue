<script setup>
import {
	UsersIcon,
	UserIcon,
	ShieldCheckIcon,
	GraduationCapIcon,
} from "lucide-vue-next";
</script>

<template>
	<div class="about-container">
		<!-- Header Section -->
		<div class="header-section">
			<div class="header-badge">
				<UsersIcon class="header-badge-icon" />
				<span>About Us</span>
			</div>
			<h1 class="header-title">College Committee</h1>
			<p class="header-desc">
				Meet the visionary leadership team behind Jaya Engineering
				College.
			</p>
		</div>

		<!-- Committee Grid -->
		<div class="committee-grid">
			<!-- Chairman -->
			<div class="committee-card">
				<div class="image-wrapper">
					<img
						src="/images/chairman.jpg"
						alt="Prof.A. Kanagaraj M.A., M.Phil."
						class="profile-image"
					/>
				</div>
				<h2 class="member-name">Prof.A. Kanagaraj M.A., M.Phil.</h2>
				<div class="role-badge">
					<ShieldCheckIcon class="role-icon" />
					Chairman
				</div>
				<div class="quote-section">
					<p class="quote-text">
						"Delightful task! to rear the tender thought;<br />
						To teach the young how to shoot;<br />
						To pour the fresh, instruction over the mind;<br />
						To breathe the enlivening spirit, and<br />
						To fix the generous purpose in the glowing heart."
					</p>
					<p class="quote-author">- Thomson, Sp. 1149</p>
				</div>
			</div>

			<!-- Vice-Chairman -->
			<div class="committee-card">
				<div class="image-wrapper">
					<img
						src="/images/vice-chairman.jpg"
						alt="Er. K.Navaraj, M.Tech., (Ph.D.)"
						class="profile-image"
					/>
				</div>
				<h2 class="member-name">Er. K.Navaraj, M.Tech., (Ph.D.)</h2>
				<div class="role-badge">
					<GraduationCapIcon class="role-icon" />
					Vice – Chairman
				</div>
				<div class="quote-section">
					<p class="quote-text">
						"Mind has thousand eyes But the Heart with one yet the
						light of whole life done when the Education is in"
					</p>
				</div>
			</div>

			<!-- Secretary -->
			<div class="committee-card">
				<div class="image-wrapper">
					<img
						src="/images/secretary.jpg"
						alt="Smt. K.Vijaya Kumari, M.A., B.Ed."
						class="profile-image"
					/>
				</div>
				<h2 class="member-name">Smt. K.Vijaya Kumari, M.A., B.Ed.</h2>
				<div class="role-badge">
					<UserIcon class="role-icon" />
					Secretary
				</div>
				<div class="quote-section">
					<p class="quote-text">
						"We are launching in all hearts of forth-coming
						Engineering doers. The vision of worldwide corporate
						scope has been given and still continues in our reputed
						Jaya Engineering College. We are giving helping-aid to
						various technical innovations and stimulating those
						projects for worldwide knowledge. Like a Mother
						assuaging the pain to success of child, we are indeed
						find immense pleasure in helping economically lagging
						but mentally capable students to obtain scholarships,
						sponsors, bank loans and other endowment prizes. Like a
						well known proverb, this is not an end; but a beginning.
						Our Jaya Engineering College will do Educational Service
						in Eternal Manner."
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.about-container {
	margin: 0 auto;
	width: 100%;
	max-width: 72rem;
	display: flex;
	flex-direction: column;
	gap: 3rem;
	padding: 2rem 0 4rem;
}

/* Header Section */
.header-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	text-align: center;
}

.header-badge {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: var(--radius-full);
	border: 1px solid var(--brand-blue);
	background-color: var(--brand-blue-light);
	padding: 0.375rem 1rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--brand-blue-hover);
	box-shadow: var(--shadow-sm);
}

.header-badge-icon {
	width: 0.875rem;
	height: 0.875rem;
}

.header-title {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 2.25rem;
	font-weight: 900;
	color: var(--text-primary);
}

@media (min-width: 640px) {
	.header-title {
		font-size: 3rem;
	}
}

.header-desc {
	margin: 0 auto;
	max-width: 42rem;
	font-size: 0.875rem;
	line-height: 1.6;
	color: var(--text-secondary);
}

@media (min-width: 640px) {
	.header-desc {
		font-size: 1rem;
	}
}

/* Committee Grid */
.committee-grid {
	display: grid;
	gap: 2rem;
	grid-template-columns: 1fr;
}

@media (min-width: 768px) {
	.committee-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

.committee-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 2rem;
	text-align: center;
	box-shadow: var(--shadow-luxury);
	transition: all 0.3s ease;
}

.committee-card:hover {
	transform: translateY(-0.25rem);
	border-color: var(--brand-blue);
	box-shadow: var(--shadow-luxury-lg);
}

.image-wrapper {
	margin-bottom: 1.5rem;
	height: 14rem;
	width: 14rem;
	overflow: hidden;
	border-radius: 40%;
	border: 4px solid var(--brand-blue-light);
	background-color: var(--bg-primary);
	box-shadow: var(--shadow-md);
}

.profile-image {
	height: 100%;
	width: 100%;
	object-fit: cover;
}

.member-name {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.25rem;
	font-weight: 700;
	color: var(--text-primary);
}

.role-badge {
	margin-top: 0.5rem;
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	border-radius: var(--radius-lg);
	border: 1px solid var(--brand-blue);
	background-color: var(--brand-blue-light);
	padding: 0.25rem 0.75rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--brand-blue-hover);
}

.role-icon {
	width: 0.875rem;
	height: 0.875rem;
}

.quote-section {
	margin-top: 1.5rem;
	border-top: 1px solid var(--border-light);
	padding-top: 1.5rem;
	width: 100%;
}

.quote-text {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.8125rem;
	font-weight: 500;
	font-style: italic;
	line-height: 1.6;
	color: var(--text-secondary);
}

.quote-author {
	margin-top: 0.75rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	color: var(--text-muted);
}
</style>
