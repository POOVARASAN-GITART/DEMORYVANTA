<script setup>
import { ref, computed, watch } from "vue";
import {
	ArrowRightIcon,
	ArrowLeftIcon,
	BuildingIcon,
	FileTextIcon,
	LayersIcon,
	Gamepad2Icon,
	TerminalIcon,
	FlameIcon,
	ShieldCheckIcon,
	CheckCircle2Icon,
	LockIcon,
	Loader2Icon,
	InfoIcon,
	UsersIcon,
} from "lucide-vue-next";
import PaymentQrBox from "./PaymentQrBox.vue";
import { EVENTS, YEARS } from "../data/events.js";

const props = defineProps({
	eventId: { type: String, required: true },
	submit: { type: Function, required: true },
	takenDomains: { type: Array, default: () => [] },
	upiId: { type: String, default: "" },
	payeeName: { type: String, default: "" },
});

const emit = defineEmits(["registered"]);

const REGISTRATION_FEE = 100;

// State
const currentStep = ref("step1_squad");
const institution = ref("");
const year = ref("");
const teamName = ref("");
const leaderName = ref("");
const leaderEmail = ref("");
const leaderPhone = ref("");
const domain = ref("");
const memberCount = ref(3);
const squadMembers = ref([
	{ name: "", email: "" },
	{ name: "", email: "" },
]);
const termsAccepted = ref(false);
const userUpiId = ref("");
const upiRef = ref("");
const isSubmitting = ref(false);
const verificationStatusText = ref("");
const verificationProgress = ref(0);
const submitError = ref(null);

const event = computed(
	() => EVENTS.find((e) => e.id === props.eventId) || EVENTS[0],
);
const availableDomains = computed(() => event.value.domains || []);

watch(
	() => props.eventId,
	(newId) => {
		// Reset state on event change
		currentStep.value = "step1_squad";
		teamName.value = "";
		domain.value = "";
		const ev = EVENTS.find((e) => e.id === newId) || EVENTS[0];
		memberCount.value = ev.memberCounts.includes(3)
			? 3
			: ev.memberCounts[0];
		squadMembers.value = Array.from(
			{ length: memberCount.value - 1 },
			() => ({
				name: "",
				email: "",
			}),
		);
	},
);

function handleMemberCountChange(count) {
	memberCount.value = count;
	const newLength = count - 1;
	if (newLength > squadMembers.value.length) {
		squadMembers.value = [
			...squadMembers.value,
			...Array.from(
				{ length: newLength - squadMembers.value.length },
				() => ({
					name: "",
					email: "",
				}),
			),
		];
	} else if (newLength < squadMembers.value.length) {
		squadMembers.value = squadMembers.value.slice(0, newLength);
	}
}

function updateSquadMember(index, data) {
	squadMembers.value[index] = { ...squadMembers.value[index], ...data };
}

function handleGoToStep2(e) {
	e.preventDefault();
	if (availableDomains.value.length > 0 && !domain.value) {
		alert("Please select a domain/problem statement");
		return;
	}
	currentStep.value = "step2_members";
}

function handleGoToStep3(e) {
	e.preventDefault();
	currentStep.value = "step3_terms";
}

function handleGoToStep4(e) {
	e.preventDefault();
	currentStep.value = "step4_review";
}

function handleGoToStep5(e) {
	e.preventDefault();
	currentStep.value = "step5_payment";
}

async function handleFinalSubmission() {
	if (userUpiId.value.trim().length <= 3 || !userUpiId.value.includes("@")) {
		submitError.value = "Please enter a valid UPI ID (e.g., name@bank).";
		window.scrollTo({ top: 0, behavior: "smooth" });
		return;
	}
	if (upiRef.value.trim().length < 8) {
		submitError.value =
			"Please enter a valid 12-digit UPI transaction reference (UTR).";
		window.scrollTo({ top: 0, behavior: "smooth" });
		return;
	}
	submitError.value = "";

	isSubmitting.value = true;

	try {
		// Simulate process
		await new Promise((resolve) => setTimeout(resolve, 800));
		verificationProgress.value = 45;
		verificationStatusText.value = "Registering Form Data...";

		await new Promise((resolve) => setTimeout(resolve, 800));
		verificationProgress.value = 75;
		verificationStatusText.value = "Updating Database...";

		const payload = {
			eventId: event.value.id,
			eventName: event.value.fullName,
			institution: institution.value,
			year: year.value,
			teamName: teamName.value,
			leaderName: leaderName.value,
			leaderEmail: leaderEmail.value,
			leaderPhone: leaderPhone.value,
			domain: domain.value,
			members: squadMembers.value
				.map((m) => ({ name: m.name, email: m.email }))
				.filter((m) => m.name || m.email),
			userUpiId: userUpiId.value,
			upiRef: upiRef.value,
			amount: (1 + squadMembers.value.length) * REGISTRATION_FEE,
		};

		const record = await props.submit(payload);

		verificationProgress.value = 100;
		verificationStatusText.value = "Registration Complete!";

		setTimeout(() => {
			emit("registered", record);
		}, 500);
	} catch (error) {
		submitError.value =
			error.message || "Submission failed. Please try again.";
		isSubmitting.value = false;
		verificationProgress.value = 0;
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}


function isDomainTaken(d) {
	return props.takenDomains.includes(d);
}

function getStepIndex() {
	const steps = [
		"step1_squad",
		"step2_members",
		"step3_terms",
		"step4_review",
		"step5_payment",
	];
	return steps.indexOf(currentStep.value) + 1;
}

function getProgressPercentage() {
	return (getStepIndex() / 5) * 100;
}
</script>

<template>
	<div class="registration-container">
		<div class="multi-step-progress">
			<div class="progress-info">
				<span class="progress-step-text"
					>Step {{ getStepIndex() }} of 5</span
				>
				<span class="progress-percent-text"
					>{{ getProgressPercentage() }}%</span
				>
			</div>
			<div class="progress-bar-bg">
				<div
					class="progress-bar-fill"
					:style="{ width: getProgressPercentage() + '%' }"
				></div>
			</div>
		</div>

		<div v-if="submitError" class="error-alert">
			{{ submitError }}
		</div>

		<!-- STEPS 1-5 Logic -->
		<!-- STEP 01: SQUAD & IDENTITY -->
		<form
			v-if="currentStep === 'step1_squad'"
			@submit="handleGoToStep2"
			class="form-card"
		>
			<div class="step-header">
				<h3 class="step-title">
					<BuildingIcon class="step-icon" />
					<span>Step 01: Team &amp; College Identity</span>
				</h3>
				<p class="step-subtitle">
					Registering for: <strong>{{ event.fullName }}</strong>
				</p>
			</div>

			<div class="form-section">
				<div class="section-title-wrapper">
					<span class="section-title">1. College Details</span>
				</div>

				<div class="field-group">
					<div class="field">
						<label class="field-label"
							>College Name <span class="required">*</span></label
						>
						<input
							type="text"
							v-model="institution"
							required
							placeholder="Enter full college name"
							class="form-input"
						/>
					</div>
					<div class="field">
						<label class="field-label"
							>Year of Study
							<span class="required">*</span></label
						>
						<select
							v-model="year"
							required
							tabindex="0"
							class="form-input"
							@keydown.enter.prevent="
								$event.target.showPicker &&
								$event.target.showPicker()
							"
						>
							<option value="" disabled>Select Year</option>
							<option v-for="y in YEARS" :key="y" :value="y">
								{{ y }}
							</option>
						</select>
					</div>
				</div>
			</div>

			<div class="form-section">
				<div class="section-title-wrapper mt-2">
					<span class="section-title">2. Team Leader Identity</span>
				</div>

				<div class="field">
					<label class="field-label"
						>Team Name <span class="required">*</span></label
					>
					<input
						type="text"
						v-model="teamName"
						required
						placeholder="Creative squad name"
						class="form-input"
					/>
				</div>

				<div class="input-grid">
					<div class="field">
						<label class="field-label"
							>Leader Full Name
							<span class="required">*</span></label
						>
						<input
							type="text"
							v-model="leaderName"
							required
							placeholder="Your full name"
							class="form-input"
						/>
					</div>
					<div class="field">
						<label class="field-label"
							>Leader Mobile (WhatsApp)
							<span class="required">*</span></label
						>
						<div class="input-with-prefix-group">
							<span class="input-prefix">+91</span>
							<input
								type="tel"
								v-model="leaderPhone"
								required
								pattern="[0-9]{10}"
								maxlength="10"
								@input="
									leaderPhone = $event.target.value
										.replace(/\D/g, '')
										.slice(0, 10)
								"
								placeholder="10-digit mobile number"
								class="form-input input-with-prefix"
							/>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="field-label"
						>Leader Official Email
						<span class="required">*</span></label
					>
					<input
						type="email"
						v-model="leaderEmail"
						required
						placeholder="student@college.edu"
						class="form-input"
					/>
				</div>
			</div>

			<div
				v-if="availableDomains.length > 0"
				class="form-section border-none pt-3"
			>
				<label class="field-label">
					Project Domain <span class="required">*</span>
				</label>
				<select
					v-model="domain"
					required
					tabindex="0"
					class="form-input"
					@keydown.enter.prevent="
						$event.target.showPicker && $event.target.showPicker()
					"
				>
					<option value="" disabled>
						Select domain...
					</option>
					<option
						v-for="d in availableDomains"
						:key="d"
						:value="d"
						:disabled="isDomainTaken(d)"
					>
						{{ d }}
						{{
							isDomainTaken(d) ? "(Claimed by another team)" : ""
						}}
					</option>
				</select>
			</div>

			<div class="form-actions">
				<button type="submit" class="btn-primary">
					<span>Next: Team Members</span>
					<ArrowRightIcon class="btn-icon-right" />
				</button>
			</div>
		</form>

		<!-- STEP 02: MEMBERS -->
		<form
			v-if="currentStep === 'step2_members'"
			@submit="handleGoToStep3"
			class="form-card"
		>
			<div class="step-header">
				<h3 class="step-title">
					<UsersIcon class="step-icon" />
					<span>Step 02: Team Members Registration</span>
				</h3>
				<p class="step-subtitle">
					Enter details for the rest of your squad members.
				</p>
			</div>

			<div class="form-section border-none">
				<div class="team-config-header">
					<span class="section-title">
						Team Roster Configuration
					</span>
					<div class="team-size-selector">
						<span class="team-size-label">Team Size:</span>
						<div class="team-size-buttons">
							<button
								v-for="count in event.memberCounts"
								:key="count"
								type="button"
								@click="handleMemberCountChange(count)"
								class="size-button"
								:class="{
									'size-active': memberCount === count,
								}"
							>
								{{ count }}
								{{
									event.id === "egames" && count === 5
										? "Members (4 + 1 Sub)"
										: "Members"
								}}
							</button>
						</div>
					</div>
				</div>

				<div class="leader-box">
					<div class="leader-info">
						<div class="leader-name-group">
							<span class="member-badge">01</span>
							<span class="leader-name"
								>{{ leaderName || "Team Leader" }} (Team
								Lead)</span
							>
						</div>
						<span class="leader-email">{{ leaderEmail }}</span>
					</div>
				</div>

				<div
					v-for="(member, index) in squadMembers"
					:key="index"
					class="member-card"
				>
					<div class="member-card-header">
						<span class="member-card-title">
							<span class="member-index-box">
								{{ (index + 2).toString().padStart(2, "0") }}
							</span>
							<span>Team Member #{{ index + 2 }}</span>
						</span>
					</div>
					<div class="member-grid">
						<div class="field">
							<label class="field-label"
								>Full Name
								<span class="required">*</span></label
							>
							<input
								type="text"
								required
								:value="member.name"
								@input="
									updateSquadMember(index, {
										name: $event.target.value,
									})
								"
								:placeholder="`Member #${index + 2} Full Name`"
								class="form-input member-input"
							/>
						</div>
						<div class="field">
							<label class="field-label">Email Address</label>
							<input
								type="email"
								:value="member.email"
								@input="
									updateSquadMember(index, {
										email: $event.target.value,
									})
								"
								placeholder="student@college.edu"
								class="form-input member-input"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="form-actions-between">
				<button
					type="button"
					@click="currentStep = 'step1_squad'"
					class="btn-secondary"
				>
					<ArrowLeftIcon class="btn-icon-left" />
					<span>Back: Team Identity</span>
				</button>
				<button type="submit" class="btn-primary">
					<span>Next: Terms &amp; Rules</span>
					<ArrowRightIcon class="btn-icon-right" />
				</button>
			</div>
		</form>

		<!-- STEP 03: TERMS -->
		<form
			v-if="currentStep === 'step3_terms'"
			@submit="handleGoToStep4"
			class="form-card"
		>
			<div class="step-header">
				<h3 class="step-title">
					<FileTextIcon class="step-icon" />
					<span>Step 03: Event Rules &amp; Code of Conduct</span>
				</h3>
				<p class="step-subtitle">
					Please review and accept the official rules for
					{{ event.fullName }}.
				</p>
			</div>

			<div class="rules-box">
				<div
					v-for="(rule, idx) in event.rules || [
						'All squad members must carry valid college identity cards on the event day.',
						'All projects and solutions must be developed fresh on-site.',
						'Jury scoring decisions are final and binding.',
					]"
					:key="idx"
					class="rule-item"
				>
					<span class="rule-index">{{ String(idx + 1).padStart(2, '0') }}.</span>
					<p class="rule-text">{{ rule }}</p>
				</div>
			</div>

			<label class="terms-checkbox-label">
				<input
					type="checkbox"
					required
					v-model="termsAccepted"
					class="checkbox-input"
				/>
				<div class="terms-text">
					<span class="terms-title"
						>Team Declaration &amp; Acceptance</span
					>
					<span class="terms-desc">
						I hereby declare that all provided team details are
						accurate and all participants agree to follow the
						RYVANTA '26 rules and campus regulations.
					</span>
				</div>
			</label>

			<div class="form-actions-between">
				<button
					type="button"
					@click="currentStep = 'step2_members'"
					class="btn-secondary"
				>
					<ArrowLeftIcon class="btn-icon-left" />
					<span>Back: Members</span>
				</button>
				<button
					type="submit"
					:disabled="!termsAccepted"
					class="btn-primary"
					:class="{ 'btn-disabled': !termsAccepted }"
				>
					<span>Next: Review Details</span>
					<ArrowRightIcon class="btn-icon-right" />
				</button>
			</div>
		</form>

		<!-- STEP 04: REVIEW -->
		<div v-if="currentStep === 'step4_review'" class="form-card">
			<div class="step-header">
				<h3 class="step-title">
					<LayersIcon class="step-icon" />
					<span>Step 04: Review Registration Summary</span>
				</h3>
				<p class="step-subtitle">
					Verify your team information before proceeding to generate
					the participation ID.
				</p>
			</div>

			<div class="review-grid">
				<div class="review-box">
					<span class="review-label">Event &amp; Domain</span>
					<div class="review-value-large">{{ event.fullName }}</div>
					<div class="review-value">{{ institution }}</div>
					<div v-if="domain" class="domain-highlight">
						Domain: {{ domain }}
					</div>
				</div>

				<div class="review-box">
					<span class="review-label">Team &amp; Leader Contact</span>
					<div class="review-value-large">{{ teamName }}</div>
					<div class="review-value">Lead: {{ leaderName }}</div>
					<div class="review-value-mono">{{ leaderEmail }}</div>
					<div class="review-value-mono-light">
						Mobile: +91 {{ leaderPhone }}
					</div>
				</div>

				<div class="review-box review-full">
					<div class="roster-header">
						<span class="review-label"
							>Team Roster ({{ memberCount }} Members)</span
						>
						<button
							type="button"
							@click="currentStep = 'step2_members'"
							class="edit-link"
						>
							Edit Members
						</button>
					</div>
					<div class="roster-grid">
						<div class="roster-item leader-roster-item">
							<span class="roster-name"
								>{{ leaderName }} (Team Lead)</span
							>
							<span class="roster-detail">{{ leaderEmail }}</span>
						</div>
						<div
							v-for="(m, idx) in squadMembers"
							:key="idx"
							class="roster-item"
						>
							<span class="roster-name">{{
								m.name || `Member #${idx + 2}`
							}}</span>
							<span class="roster-detail">{{
								m.email || "Participant"
							}}</span>
						</div>
					</div>
				</div>

				<div class="fee-summary-box">
					<div>
						<span class="fee-summary-label"
							>Registration Fee (₹{{ REGISTRATION_FEE }} /
							person)</span
						>
						<span class="fee-summary-detail"
							>₹{{ REGISTRATION_FEE }} ×
							{{ 1 + squadMembers.length }} participants</span
						>
					</div>
					<div class="fee-total">
						₹{{ (1 + squadMembers.length) * REGISTRATION_FEE }}
					</div>
				</div>
			</div>

			<div class="form-actions-between">
				<button
					type="button"
					@click="currentStep = 'step3_terms'"
					class="btn-secondary"
				>
					<ArrowLeftIcon class="btn-icon-left" />
					<span>Back: Terms</span>
				</button>
				<button
					type="button"
					@click="handleGoToStep5"
					class="btn-primary"
				>
					<span>Proceed to Payment</span>
					<ArrowRightIcon class="btn-icon-right" />
				</button>
			</div>
		</div>

		<div
			v-if="currentStep === 'step5_payment'"
			class="payment-step-container"
		>
			<PaymentQrBox
				:upiId="upiId"
				:payeeName="payeeName"
				:feeAmount="(1 + squadMembers.length) * REGISTRATION_FEE"
				:eventName="event.fullName"
				:teamName="teamName"
				v-model:userUpiId="userUpiId"
				v-model:upiRef="upiRef"
				:hideQrCode="event.hideQrCode"
			/>

			<div class="payment-actions">
				<button
					type="button"
					@click="currentStep = 'step4_review'"
					:disabled="isSubmitting"
					class="btn-secondary"
					:class="{ 'btn-disabled': isSubmitting }"
				>
					<ArrowLeftIcon class="btn-icon-left" />
					<span>Review Details</span>
				</button>

				<button
					type="button"
					@click="handleFinalSubmission"
					:disabled="isSubmitting"
					class="btn-submit"
					:class="{ 'btn-disabled': isSubmitting }"
				>
					<Loader2Icon
						v-if="isSubmitting"
						class="spinner-icon text-white"
					/>
					<span v-if="isSubmitting">{{
						verificationStatusText ||
						"Authenticating..."
					}}</span>
					<template v-else>
						<ShieldCheckIcon class="btn-icon-left" />
						<span>Submit Details</span>
					</template>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.registration-container {
	position: relative;
	width: 100%;
}

.multi-step-progress {
	margin-bottom: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.progress-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	color: var(--text-muted);
}

.progress-percent-text {
	color: var(--brand-blue);
}

.progress-bar-bg {
	height: 0.5rem;
	width: 100%;
	border-radius: var(--radius-full);
	background-color: var(--border-light);
	overflow: hidden;
}

.error-alert {
	margin-bottom: 1.5rem;
	border-radius: var(--radius-xl);
	border: 1px solid var(--error);
	background-color: var(--bg-primary);
	padding: 1rem;
	font-size: 0.875rem;
	color: var(--error);
}

.form-card {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 1.5rem;
	box-shadow: var(--shadow-luxury);
}

@media (min-width: 640px) {
	.form-card {
		padding: 2rem;
	}
}

.step-header {
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 0.75rem;
}

.step-title {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.125rem;
	font-weight: 700;
	color: var(--text-primary);
}

.step-icon {
	width: 1.25rem;
	height: 1.25rem;
	color: var(--brand-blue);
}

.step-subtitle {
	margin-top: 0.25rem;
	font-size: 0.75rem;
	color: var(--text-muted);
}
.step-subtitle strong {
	color: var(--text-primary);
}

.form-section {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.section-title-wrapper {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 0.5rem;
}
.mt-2 {
	margin-top: 0.5rem;
}

.section-title {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}

.checkbox-label {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	border-radius: var(--radius-xl);
	border: 1px solid var(--brand-blue-light);
	background-color: var(--bg-secondary);
	padding: 0.75rem;
	cursor: pointer;
}

.checkbox-input {
	margin-top: 0.125rem;
	width: 1rem;
	height: 1rem;
	border-radius: 0.25rem;
	border: 1px solid var(--border-dark);
	accent-color: var(--brand-blue);
}

.checkbox-text {
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--text-primary);
}

.field-group {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.field {
	display: flex;
	flex-direction: column;
}

.field-label {
	margin-bottom: 0.25rem;
	display: block;
	font-size: 0.625rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-muted);
}

.required {
	color: var(--brand-blue);
}

.form-input {
	width: 100%;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 0.75rem 1rem;
	font-size: 0.75rem;
	color: var(--text-primary);
	box-shadow: var(--shadow-sm);
	transition: all 0.2s ease;
}

.form-input::placeholder {
	color: var(--text-muted);
}
.form-input:focus {
	outline: none;
	border-color: var(--brand-blue);
}

.input-with-prefix-group {
	position: relative;
	display: flex;
	align-items: center;
}

.input-prefix {
	position: absolute;
	left: 1rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--text-secondary);
	pointer-events: none;
}

.input-with-prefix {
	padding-left: 2.75rem;
}

.disabled-input {
	background-color: var(--bg-secondary);
	cursor: not-allowed;
}

.input-grid {
	display: grid;
	gap: 1rem;
}
@media (min-width: 640px) {
	.input-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

.border-none {
	border: none;
}
.pt-3 {
	padding-top: 0.75rem;
}

.form-actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-top: 1rem;
	border-top: 1px solid var(--border-light);
}

.form-actions-between {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 1rem;
	border-top: 1px solid var(--border-light);
}

.btn-primary {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: var(--radius-xl);
	background-color: var(--brand-blue);
	padding: 0.75rem 1.75rem;
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--bg-primary);
	box-shadow: var(--shadow-luxury);
	transition: all 0.2s ease;
}

.btn-primary:hover {
	background-color: var(--brand-blue-hover);
	box-shadow: var(--shadow-blue-glow);
}

.btn-secondary {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 0.75rem 1.75rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--text-muted);
	transition: all 0.2s ease;
}

.btn-secondary:hover {
	background-color: var(--bg-primary);
	color: var(--text-primary);
}

.btn-icon-right {
	width: 1rem;
	height: 1rem;
	color: var(--bg-primary);
}
.btn-icon-left {
	width: 0.875rem;
	height: 0.875rem;
}
.btn-disabled {
	opacity: 0.5;
	cursor: not-allowed;
	pointer-events: none;
}

/* Step 2 Specifics */
.team-config-header {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 0.75rem;
}
@media (min-width: 640px) {
	.team-config-header {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
}

.team-size-selector {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.team-size-label {
	font-size: 0.75rem;
	font-family: var(--font-mono);
	text-transform: uppercase;
	color: var(--text-muted);
}

.team-size-buttons {
	display: inline-flex;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 0.25rem;
}

.size-button {
	border-radius: var(--radius-lg);
	padding: 0.25rem 0.875rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--text-muted);
	transition: all 0.2s ease;
}

.size-button:hover {
	color: var(--text-primary);
}
.size-active {
	background-color: var(--text-primary);
	color: var(--bg-primary);
	box-shadow: var(--shadow-sm);
}
.size-active:hover {
	color: var(--bg-primary);
}

.leader-box {
	border-radius: var(--radius-xl);
	border: 1px solid var(--brand-blue);
	background-color: var(--bg-secondary);
	padding: 0.875rem;
}

.leader-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.leader-name-group {
	display: flex;
	align-items: center;
	gap: 0.625rem;
}

.member-badge {
	display: flex;
	height: 1.5rem;
	width: 1.5rem;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-lg);
	background-color: var(--brand-blue);
	color: var(--bg-primary);
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
}

.leader-name {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.875rem;
	font-weight: 700;
	color: var(--text-primary);
}

.leader-email {
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--brand-blue-hover);
}

.member-card {
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 1rem;
	transition: all 0.2s ease;
}

@media (min-width: 640px) {
	.member-card {
		padding: 1.25rem;
	}
}

.member-card:hover {
	border-color: var(--brand-blue);
}

.member-card-header {
	margin-bottom: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.member-card-title {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-family: var(--font-serif, var(--font-sans));
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}

.member-index-box {
	display: flex;
	height: 1.25rem;
	width: 1.25rem;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-md);
	background-color: var(--bg-primary);
	border: 1px solid var(--border-dark);
	font-family: var(--font-mono);
	font-size: 0.625rem;
	color: var(--text-muted);
}

.member-grid {
	display: grid;
	gap: 0.75rem;
}

@media (min-width: 640px) {
	.member-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

.member-input {
	border-radius: var(--radius-lg);
	padding: 0.5rem 0.75rem;
}

/* Step 3 Specifics */
.rules-box {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 1rem;
	font-size: 0.75rem;
	color: var(--text-muted);
}

@media (min-width: 640px) {
	.rules-box {
		padding: 1.5rem;
	}
}

.rule-item {
	display: flex;
	align-items: flex-start;
	gap: 0.625rem;
}

.rule-index {
	font-family: var(--font-mono);
	color: var(--brand-blue);
	font-weight: 700;
	flex-shrink: 0;
	margin-top: 0.125rem;
}

.rule-text {
	line-height: 1.6;
}

.terms-checkbox-label {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	border-radius: var(--radius-xl);
	border: 1px solid var(--brand-blue);
	background-color: var(--bg-secondary);
	padding: 1rem;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.terms-checkbox-label:hover {
	background-color: var(--bg-primary);
}

.terms-text {
	font-size: 0.75rem;
	color: var(--text-muted);
}

.terms-title {
	display: block;
	font-weight: 700;
	color: var(--text-primary);
}

.terms-desc {
	display: block;
}

/* Step 4 Specifics */
.review-grid {
	display: grid;
	gap: 1rem;
}

@media (min-width: 640px) {
	.review-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

.review-box {
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.review-full {
	grid-column: 1 / -1;
}

.review-label {
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--text-muted);
}

.review-value-large {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1rem;
	font-weight: 700;
	color: var(--text-primary);
}

.review-value {
	font-size: 0.75rem;
	color: var(--text-muted);
}

.domain-highlight {
	margin-top: 0.5rem;
	border-radius: var(--radius-lg);
	background-color: var(--bg-primary);
	border: 1px solid var(--border-dark);
	padding: 0.5rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--brand-blue-hover);
}

.review-value-mono {
	font-size: 0.75rem;
	font-family: var(--font-mono);
	color: var(--text-muted);
}

.review-value-mono-light {
	font-size: 0.75rem;
	font-family: var(--font-mono);
	color: var(--text-muted);
}

.roster-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.edit-link {
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--brand-blue);
	cursor: pointer;
}
.edit-link:hover {
	text-decoration: underline;
}

.roster-grid {
	display: grid;
	gap: 0.5rem;
}

@media (min-width: 640px) {
	.roster-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

.roster-item {
	border-radius: var(--radius-lg);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 0.75rem;
	font-size: 0.75rem;
}

.leader-roster-item {
	border-color: var(--brand-blue);
}

.roster-name {
	display: block;
	font-weight: 700;
	color: var(--text-primary);
}

.roster-detail {
	font-family: var(--font-mono);
	font-size: 0.6875rem;
	color: var(--text-muted);
}

.fee-summary-box {
	grid-column: 1 / -1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: var(--radius-xl);
	border: 1px solid var(--brand-blue);
	background-color: var(--brand-blue-light);
	padding: 1rem;
}

.fee-summary-label {
	display: block;
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}

.fee-summary-detail {
	font-size: 0.6875rem;
	color: var(--text-muted);
}

.fee-total {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.5rem;
	font-weight: 900;
	color: var(--text-primary);
}

/* Step 5 Specifics */
.payment-step-container {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.verification-status-box {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 1.25rem;
	font-size: 0.75rem;
	box-shadow: var(--shadow-luxury);
}

.status-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.status-indicator {
	display: flex;
	align-items: center;
	gap: 0.625rem;
}

.spinner-icon {
	width: 1rem;
	height: 1rem;
	color: var(--brand-blue);
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.pulse-dot {
	width: 0.625rem;
	height: 0.625rem;
	border-radius: 50%;
}

.pulse-ready {
	background-color: var(--success);
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.pulse-waiting {
	background-color: var(--warning);
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

.status-text {
	font-weight: 600;
	color: var(--text-primary);
}

.status-badge {
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
}

.badge-ready {
	color: var(--success);
}
.badge-waiting {
	color: var(--text-primary);
}

.progress-bar-container {
	height: 0.5rem;
	width: 100%;
	border-radius: var(--radius-full);
	background-color: var(--border-light);
	overflow: hidden;
}

.progress-bar-fill {
	height: 100%;
	background-color: var(--brand-blue);
	transition: width 0.3s ease-out;
	box-shadow: var(--shadow-sm);
}

.payment-actions {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	padding-top: 0.5rem;
}

@media (min-width: 640px) {
	.payment-actions {
		flex-direction: row;
		align-items: center;
	}
}

.btn-submit {
	flex: 1;
	display: inline-flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	border-radius: var(--radius-xl);
	background-color: var(--brand-blue);
	padding: 1rem 1.5rem;
	font-size: 0.75rem;
	font-weight: 900;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--bg-primary);
	box-shadow: var(--shadow-luxury);
	transition: all 0.2s ease;
}

.btn-submit:hover:not(:disabled) {
	background-color: var(--brand-blue-hover);
	box-shadow: var(--shadow-blue-glow);
}

.btn-submit:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.text-white {
	color: var(--text-primary);
}
</style>
