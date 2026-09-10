<script setup>
import { ref } from "vue";
import {
	ExternalLinkIcon,
	SmartphoneIcon,
	ShieldCheckIcon,
	CheckCircle2Icon,
	LockIcon,
} from "lucide-vue-next";

const props = defineProps({
	upiId: { type: String, default: "alangaram1985@okicici" },
	payeeName: { type: String, default: "Alangaram Selvaraj" },
	feeAmount: { type: Number, required: true },
	eventName: { type: String, required: true },
	teamName: { type: String, default: "" },
	userUpiId: { type: String, default: "" },
	upiRef: { type: String, default: "" },
	hideQrCode: { type: Boolean, default: false },
});

const emit = defineEmits(["update:userUpiId", "update:upiRef"]);

const note = `RYVANTA ${props.eventName.slice(0, 12)}${props.teamName ? ` - ${props.teamName.slice(0, 10)}` : ""}`;

function handleUserUpiIdChange(e) {
	emit("update:userUpiId", e.target.value);
}

function handleUpiRefChange(e) {
	emit("update:upiRef", e.target.value.replace(/[^a-zA-Z0-9]/g, ""));
}
</script>

<template>
	<div class="payment-box">
		<!-- Payee Profile Header Bar -->
		<div class="payment-header">
			<div class="header-left">
				<div class="header-icon-wrapper">
					<ShieldCheckIcon class="header-icon" />
				</div>
				<div>
					<h3 class="header-title">
						Official Challenge Payment Gateway
					</h3>
					<span class="header-subtitle"
						>Automated Authentication &amp; Payment Received
						Verification</span
					>
				</div>
			</div>

			<div class="fee-badge">
				<span class="fee-label">Fee Amount:</span>
				<span class="fee-value">₹{{ feeAmount }}</span>
			</div>
		</div>

		<div class="payment-grid" :class="{ 'grid-full': hideQrCode }">
			<!-- QR Code Container -->
			<div v-if="!hideQrCode" class="qr-column">
				<div class="qr-image-wrapper">
					<img
						src="/images/payment-qr.jpg"
						alt="Payment QR Code"
						class="qr-image"
					/>
				</div>
				<span class="qr-instruction">Scan with any UPI App</span>
				<span class="qr-apps">GPay · PhonePe · Paytm · BHIM</span>
			</div>

			<!-- Secure Gateway Channel Details & Deep Links -->
			<div class="details-column">
				<!-- Secure Channel Card -->
				<div class="secure-card">
					<div class="secure-card-header">
						<span class="secure-title">
							<LockIcon class="secure-icon" />
							Encrypted UPI Gateway
						</span>
					</div>
					<p class="secure-desc">
						Scan the QR code with any UPI app or tap one of the
						direct app buttons below to pay the ₹{{ feeAmount }}
						challenge fee. Once paid, enter your UPI ID and the
						12-digit UTR reference below to verify that payment has
						been received.
					</p>
				</div>
			</div>
		</div>

		<!-- Payment Authentication, UTR & Screenshot Proof Section -->
		<div class="auth-section">
			<div class="auth-header">
				<div class="auth-title-wrapper">
					<LockIcon class="auth-icon" />
					<span class="auth-title">
						Payment Authentication &amp; Verification Proof
						<span class="required-asterisk">*</span>
					</span>
				</div>
			</div>

			<div class="auth-grid">
				<!-- User UPI ID -->
				<div class="input-group">
					<label class="input-label">
						<span>Your UPI ID</span>
					</label>
					<input
						type="text"
						:value="userUpiId"
						@input="handleUserUpiIdChange"
						placeholder="e.g. 9876543210@ybl"
						class="auth-input"
						:class="
							userUpiId.trim().length > 3 &&
							userUpiId.includes('@')
								? 'input-valid'
								: ''
						"
					/>
				</div>

				<!-- UPI Ref / 12-Digit UTR Number -->
				<div class="input-group">
					<label class="input-label">
						<span>12-Digit UPI Transaction ID (UTR)</span>
					</label>
					<input
						type="text"
						:value="upiRef"
						@input="handleUpiRefChange"
						placeholder="e.g. 423984729182 (12-digit UTR)"
						maxlength="24"
						class="auth-input"
						:class="upiRef.trim().length >= 8 ? 'input-valid' : ''"
					/>
				</div>
			</div>

			<p class="security-note">
				<LockIcon class="security-note-icon" />
				<span
					>Your UPI ID and 12-digit UTR reference are authenticated
					and stored to verify that your ₹{{ feeAmount }} registration
					payment has been received before issuing your official
					Student ID.</span
				>
			</p>
		</div>
	</div>
</template>

<style scoped>
.payment-box {
	overflow: hidden;
	border-radius: var(--radius-2xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-primary);
	padding: 1.25rem;
	box-shadow: var(--shadow-luxury);
}

@media (min-width: 640px) {
	.payment-box {
		padding: 1.75rem;
	}
}

.payment-header {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.75rem;
	border-bottom: 1px solid var(--border-light);
	padding-bottom: 1rem;
}

@media (min-width: 640px) {
	.payment-header {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
}

.header-left {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.header-icon-wrapper {
	display: flex;
	height: 2.5rem;
	width: 2.5rem;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-xl);
	background-color: var(--bg-secondary);
	border: 1px solid var(--border-dark);
}

.header-icon {
	width: 1.25rem;
	height: 1.25rem;
	color: var(--brand-blue);
}

.header-title {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1rem;
	font-weight: 700;
	color: var(--text-primary);
}

.header-subtitle {
	font-size: 0.75rem;
	color: var(--text-muted);
}

.fee-badge {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: var(--radius-xl);
	background-color: var(--brand-blue-light);
	border: 1px solid var(--brand-blue);
	padding: 0.5rem 1rem;
}

.fee-label {
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--brand-blue-hover);
}

.fee-value {
	font-family: var(--font-serif, var(--font-sans));
	font-size: 1.25rem;
	font-weight: 900;
	color: var(--text-primary);
}

.payment-grid {
	margin-top: 1.5rem;
	display: grid;
	gap: 1.5rem;
	align-items: flex-start;
}

@media (min-width: 768px) {
	.payment-grid {
		grid-template-columns: 220px minmax(0, 1fr);
	}
	.grid-full {
		grid-template-columns: 1fr;
	}
}

.qr-column {
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

.qr-image-wrapper {
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-dark);
	background-color: var(--bg-primary);
	padding: 0.5rem;
	box-shadow: var(--shadow-md);
}

.qr-image {
	width: 168px;
	height: 168px;
	object-fit: cover;
	border-radius: var(--radius-lg);
}

.qr-instruction {
	margin-top: 0.75rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-muted);
}

.qr-apps {
	margin-top: 0.125rem;
	font-size: 0.6875rem;
	font-weight: 500;
	color: var(--brand-blue-hover);
}

.details-column {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.secure-card {
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 1rem;
}

.secure-card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.secure-title {
	display: flex;
	align-items: center;
	gap: 0.375rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}

.secure-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.live-badge {
	border-radius: var(--radius-full);
	background-color: var(--bg-secondary);
	border: 1px solid var(--success);
	padding: 0.125rem 0.625rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	color: var(--success);
}

.secure-desc {
	margin-top: 0.5rem;
	font-size: 0.75rem;
	line-height: 1.6;
	color: var(--text-muted);
}

.quick-pay-section {
	display: flex;
	flex-direction: column;
}

.quick-pay-label {
	margin-bottom: 0.5rem;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--text-muted);
}

.quick-pay-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.5rem;
}

@media (min-width: 640px) {
	.quick-pay-grid {
		grid-template-columns: repeat(4, 1fr);
	}
}

.app-button {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.375rem;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 0.625rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--text-primary);
	transition: all 0.2s ease;
	box-shadow: var(--shadow-sm);
}

.app-button:hover {
	border-color: var(--brand-blue);
	background-color: var(--bg-primary);
}

.primary-app-button {
	border-color: var(--brand-blue);
	background-color: var(--brand-blue-light);
}

.primary-app-button:hover {
	background-color: var(--brand-blue-light);
}

.app-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.auth-section {
	margin-top: 1.5rem;
	border-top: 1px solid var(--border-light);
	padding-top: 1.25rem;
}

.auth-header {
	margin-bottom: 0.75rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

@media (min-width: 640px) {
	.auth-header {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
}

.auth-title-wrapper {
	display: flex;
	align-items: center;
	gap: 0.375rem;
}

.auth-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--brand-blue);
}

.auth-title {
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-primary);
}

.required-asterisk {
	color: var(--error);
}

.status-ready {
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-family: var(--font-mono);
	font-size: 0.6875rem;
	font-weight: 700;
	color: var(--success);
}

.status-icon {
	width: 0.875rem;
	height: 0.875rem;
}

.status-pending {
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 600;
	color: var(--warning);
}

.auth-grid {
	display: grid;
	gap: 1rem;
}

@media (min-width: 640px) {
	.auth-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

.input-group {
	display: flex;
	flex-direction: column;
}

.input-label {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.375rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--text-secondary);
}

.valid-badge {
	font-family: var(--font-mono);
	font-size: 0.625rem;
	font-weight: 700;
	color: var(--success);
}

.auth-input {
	width: 100%;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	padding: 0.625rem 1rem;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	color: var(--text-primary);
	transition: all 0.2s ease;
}

.auth-input:focus {
	outline: none;
	border-color: var(--brand-blue);
	background-color: var(--bg-primary);
}

.input-valid {
	border-color: var(--success);
	background-color: var(--success-bg);
}
.input-valid:focus {
	border-color: var(--success);
}

.security-note {
	margin-top: 0.75rem;
	display: flex;
	align-items: flex-start;
	gap: 0.375rem;
	font-size: 0.6875rem;
	color: var(--text-muted);
}
.security-note-icon {
	width: 0.875rem;
	height: 0.875rem;
	color: var(--text-muted);
	flex-shrink: 0;
}
</style>
