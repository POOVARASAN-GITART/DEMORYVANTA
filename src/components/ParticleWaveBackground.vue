<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const canvasRef = ref(null);
let animationFrameId;
let width = 0;
let height = 0;
let particles = [];
const colors = ["#64748B", "#94A3B8", "#CBD5E1", "#E2E8F0", "#F1F5F9"];

const mouse = {
	x: -1000,
	y: -1000,
	targetX: -1000,
	targetY: -1000,
	radius: 200,
};

function handleResize() {
	const canvas = canvasRef.value;
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const dpr = Math.min(window.devicePixelRatio || 1, 2);
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width * dpr;
	canvas.height = height * dpr;
	ctx.scale(dpr, dpr);
	initGrid();
}

function handleMouseMove(e) {
	mouse.targetX = e.clientX;
	mouse.targetY = e.clientY;
}

function handleMouseLeave() {
	mouse.targetX = -1000;
	mouse.targetY = -1000;
}

function initGrid() {
	particles = [];
	const rows = 38;
	const cols = 60;
	const spacingX = width / cols;
	const spacingY = height / rows;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const color = colors[(c + r) % colors.length];
			const x = c * spacingX;
			const y = r * spacingY;
			particles.push({
				origX: x,
				origY: y,
				x,
				y,
				z: Math.random() * 2 + 1,
				baseY: y,
				angle: c * 0.15 + r * 0.2,
				color,
				size: 0.5,
			});
		}
	}
}

onMounted(() => {
	const canvas = canvasRef.value;
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	window.addEventListener("resize", handleResize);
	window.addEventListener("mousemove", handleMouseMove, { passive: true });
	document.addEventListener("mouseleave", handleMouseLeave);

	handleResize();

	let step = 0;

	function render() {
		if (!ctx || !canvas) return;

		// Smooth mouse interpolation
		mouse.x += (mouse.targetX - mouse.x) * 0.08;
		mouse.y += (mouse.targetY - mouse.y) * 0.08;

		// Dark navy canvas background
		ctx.fillStyle = "#0a0e1a";
		ctx.fillRect(0, 0, width, height);

		// Subtle ambient vignette glow in center
		const grad = ctx.createRadialGradient(
			width / 2,
			height / 2,
			100,
			width / 2,
			height / 2,
			Math.max(width, height) * 0.8,
		);
		grad.addColorStop(0, "rgba(217, 70, 239, 0.07)");
		grad.addColorStop(0.5, "rgba(168, 85, 247, 0.03)");
		grad.addColorStop(1, "rgba(10, 14, 26, 0.95)");
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, width, height);

		step += 0.025;

		// Render 3D wave mesh
		const len = particles.length;
		for (let i = 0; i < len; i++) {
			const p = particles[i];
			p.angle += 0.015;

			// Primary undulating wave calculation
			const wave1 = Math.sin(step + p.angle) * 22;
			const wave2 = Math.cos(step * 0.8 + p.origX * 0.01) * 12;
			let currentY = p.baseY + wave1 + wave2;
			let currentX = p.origX;

			// Mouse displacement interactivity
			if (mouse.x > 0 && mouse.y > 0) {
				const dx = currentX - mouse.x;
				const dy = currentY - mouse.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < mouse.radius) {
					const force = (1 - dist / mouse.radius) * 28;
					currentY += Math.sin(dist * 0.05 - step * 2) * force;
					currentX += (dx / dist) * force * 0.4;
				}
			}

			// Depth perspective alpha
			const verticalRatio = p.baseY / height;
			const alpha = Math.min(
				0.4,
				Math.max(0.05, verticalRatio * 0.4 + 0.05),
			);

			// Draw particle
			ctx.fillStyle = p.color;
			ctx.globalAlpha = alpha;
			ctx.beginPath();
			ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.globalAlpha = 1.0;
		animationFrameId = requestAnimationFrame(render);
	}

	render();
});

onUnmounted(() => {
	window.removeEventListener("resize", handleResize);
	window.removeEventListener("mousemove", handleMouseMove);
	document.removeEventListener("mouseleave", handleMouseLeave);
	cancelAnimationFrame(animationFrameId);
});
</script>

<template>
	<canvas
		ref="canvasRef"
		aria-hidden="true"
		class="particle-wave-canvas"
	></canvas>
</template>

<style scoped>
.particle-wave-canvas {
	pointer-events: none;
	position: fixed;
	inset: 0;
	z-index: 0;
	height: 100vh;
	width: 100vw;
}
</style>
