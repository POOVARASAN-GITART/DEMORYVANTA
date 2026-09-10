<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const canvasRef = ref(null);
let animationFrameId;
let width = 0;
let height = 0;
let isMobile = false;
let points = [];

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		: { r: 148, g: 163, b: 184 };
}

function resize() {
	const canvas = canvasRef.value;
	if (!canvas) return;
	const ctx = canvas.getContext("2d", { alpha: true });
	if (!ctx) return;

	width = window.innerWidth;
	height = window.innerHeight;
	isMobile = width < 768 || window.matchMedia("(pointer: coarse)").matches;

	// 1.0 DPR on mobile for high framerate; 1.5 on desktop
	const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
	canvas.width = Math.floor(width * dpr);
	canvas.height = Math.floor(height * dpr);
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.scale(dpr, dpr);
	initPoints();
}

function initPoints() {
	points = [];
	const count = isMobile
		? 24
		: Math.min(Math.max(Math.floor((width * height) / 16000), 32), 65);
	const colorOptions = [
		"#64748B",
		"#94A3B8",
		"#CBD5E1",
		"#E2E8F0",
		"#F1F5F9",
	];

	for (let i = 0; i < count; i++) {
		const colorType = colorOptions[i % colorOptions.length];
		const radius = Math.random() * 1.5 + 1.2;

		points.push({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.45),
			vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.45),
			radius,
			baseAlpha: Math.random() * 0.45 + 0.45,
			pulsePhase: Math.random() * Math.PI * 2,
			colorType,
		});
	}
}

onMounted(() => {
	const canvas = canvasRef.value;
	if (!canvas) return;
	const ctx = canvas.getContext("2d", { alpha: true });
	if (!ctx) return;

	window.addEventListener("resize", resize, { passive: true });
	resize();

	const connectionDistance = isMobile ? 130 : 210;
	let time = 0;

	function render() {
		if (!ctx || !canvas) return;

		ctx.clearRect(0, 0, width, height);
		time += 0.02;
		const len = points.length;

		// 1. Update positions & Draw connecting geometric constellation lines
		for (let i = 0; i < len; i++) {
			const p = points[i];
			p.x += p.vx;
			p.y += p.vy;

			if (p.x < 0 || p.x > width) p.vx *= -1;
			if (p.y < 0 || p.y > height) p.vy *= -1;

			for (let j = i + 1; j < len; j++) {
				const p2 = points[j];
				const dx = p.x - p2.x;
				const dy = p.y - p2.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < connectionDistance) {
					const alpha = (1 - dist / connectionDistance) * 0.45;
					ctx.beginPath();
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
					ctx.lineWidth = 1.0;
					ctx.stroke();
				}
			}
		}

		// 2. Draw simple grey circles
		for (let i = 0; i < len; i++) {
			const p = points[i];
			const pulse = Math.sin(time + p.pulsePhase) * 0.8 + p.radius;

			// Main solid node body
			ctx.beginPath();
			ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);

			// Use hex color with baseAlpha
			const rgb = hexToRgb(p.colorType);
			ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.baseAlpha})`;
			ctx.fill();
		}

		animationFrameId = requestAnimationFrame(render);
	}

	render();
});

onUnmounted(() => {
	window.removeEventListener("resize", resize);
	cancelAnimationFrame(animationFrameId);
});
</script>

<template>
	<canvas
		ref="canvasRef"
		aria-hidden="true"
		class="tech-constellation-canvas"
	></canvas>
</template>

<style scoped>
.tech-constellation-canvas {
	pointer-events: none;
	position: fixed;
	inset: 0;
	z-index: 0;
	height: 100vh;
	width: 100vw;
	opacity: 0.9;
	will-change: transform;
}
</style>
