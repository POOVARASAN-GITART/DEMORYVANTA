import { ref, onMounted, onUnmounted } from "vue";

export function useCountdown(targetDateStr) {
	const isComplete = ref(false);
	const days = ref(0);
	const hours = ref(0);
	const minutes = ref(0);
	const seconds = ref(0);

	let interval;

	const update = () => {
		const target = new Date(targetDateStr).getTime();
		const now = new Date().getTime();
		const diff = target - now;

		if (diff <= 0) {
			isComplete.value = true;
			days.value = 0;
			hours.value = 0;
			minutes.value = 0;
			seconds.value = 0;
			if (interval) clearInterval(interval);
			return;
		}

		days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
		hours.value = Math.floor(
			(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		);
		minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		seconds.value = Math.floor((diff % (1000 * 60)) / 1000);
	};

	onMounted(() => {
		update();
		interval = setInterval(update, 1000);
	});

	onUnmounted(() => {
		if (interval) clearInterval(interval);
	});

	return { isComplete, days, hours, minutes, seconds };
}
