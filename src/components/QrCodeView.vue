<script setup>
import { ref, watch, onMounted } from "vue";
import QRCode from "qrcode";

const props = defineProps({
	value: { type: String, required: true },
	size: { type: Number, default: 180 },
	darkColor: { type: String, default: "#0b0f19" },
	lightColor: { type: String, default: "#ffffff" },
	margin: { type: Number, default: 1 },
	label: { type: String, default: "" },
});

const dataUrl = ref("");
const error = ref(null);

function generateQR() {
	if (!props.value) {
		dataUrl.value = "";
		return;
	}

	QRCode.toDataURL(props.value, {
		width: props.size * 2,
		margin: props.margin,
		color: {
			dark: props.darkColor,
			light: props.lightColor,
		},
		errorCorrectionLevel: "M",
	})
		.then((url) => {
			dataUrl.value = url;
			error.value = null;
		})
		.catch((err) => {
			error.value = err.message || "QR code generation failed";
		});
}

onMounted(() => {
	generateQR();
});

watch(
	() => [
		props.value,
		props.size,
		props.darkColor,
		props.lightColor,
		props.margin,
	],
	() => {
		generateQR();
	},
	{ deep: true },
);
</script>

<template>
	<div
		v-if="error"
		:style="{ width: size + 'px', height: size + 'px' }"
		class="qr-error"
	>
		Failed to render QR
	</div>
	<div
		v-else-if="!dataUrl"
		:style="{ width: size + 'px', height: size + 'px' }"
		class="qr-loading"
	>
		<div class="spinner"></div>
	</div>
	<div v-else class="qr-container">
		<img
			:src="dataUrl"
			:alt="label || `QR Code for ${value}`"
			:width="size"
			:height="size"
			class="qr-image"
		/>
	</div>
</template>

<style scoped>
.qr-error {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-xl);
	border: 1px solid var(--error);
	background-color: var(--bg-secondary);
	padding: 0.5rem;
	text-align: center;
	font-size: 0.75rem;
	color: var(--error);
}

.qr-loading {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-xl);
	border: 1px solid var(--border-light);
	background-color: var(--bg-secondary);
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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

.spinner {
	height: 1.5rem;
	width: 1.5rem;
	border-radius: 50%;
	border: 2px solid var(--brand-blue);
	border-top-color: transparent;
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

.qr-container {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
}

.qr-image {
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-md);
	transition: transform 0.2s ease;
}
</style>
