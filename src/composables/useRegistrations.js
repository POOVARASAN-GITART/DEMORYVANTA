import { ref, onMounted } from "vue";
import { submitToWeb3Forms } from "../services/web3forms";

const STORAGE_KEY = "ryvanta_user_registration";

export function useRegistrations() {
	const existingRegistration = ref(null);
	const isSubmitting = ref(false);
	const submitError = ref(null);

	// Load from local storage on mount
	onMounted(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				existingRegistration.value = JSON.parse(saved);
			}
		} catch (e) {
			console.error("Failed to load registration", e);
		}
	});

	const submitRegistration = async (formData) => {
		isSubmitting.value = true;
		submitError.value = null;

		try {
			// Generate an ID (e.g., TH001)
			const randomDigits = Math.floor(100 + Math.random() * 900);
			const eventCode = formData.eventCode || "X";
			const registrationId = `T${eventCode}${randomDigits}`;

			const record = {
				...formData,
				id: registrationId,
				createdAt: new Date().toISOString(),
				paymentStatus: "pending", // As requested: pending until verified
			};

			// Submit to Django API
			const backendData = await submitToWeb3Forms(record);
			
			// Overwrite the frontend random ID with the official sequential ID
			if (backendData && backendData.registration_id) {
				record.id = backendData.registration_id;
			}

			// Save to local storage to block future registrations on this device
			localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
			existingRegistration.value = record;

			return record;
		} catch (error) {
			submitError.value = error.message;
			throw error;
		} finally {
			isSubmitting.value = false;
		}
	};

	return {
		existingRegistration,
		isSubmitting,
		submitError,
		submitRegistration,
	};
}
