import {useEffect, useRef} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import SimplexNoise from 'simplex-noise';

const xNoise = new SimplexNoise('displacex');
const yNoise = new SimplexNoise('displacey');

const SIZE = 40;
// const SIZE = 100;

export const Background: React.FC = () => {
	const {width, height, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const COLS = width / SIZE + 1;
	const ROWS = height / SIZE + 1;
	const radius = 5;

	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		//Our first draw
		context.fillStyle = '#232021';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		for (let y = 0; y < ROWS; y++) {
			for (let x = 0; x < COLS; x++) {
				const displacementX =
					xNoise.noise3D(y / ROWS, x / COLS, frame / 500) * SIZE * 2 - SIZE / 2;
				const displacementY =
					yNoise.noise3D(y / ROWS, x / COLS, frame / 500) * SIZE * 2 - SIZE / 2;
				context.beginPath();
				context.arc(
					x * SIZE + displacementX,
					y * SIZE + displacementY,
					radius,
					0,
					2 * Math.PI,
					false
				);
				context.fillStyle = '#464646';
				context.fill();
			}
		}
	}, [frame]);

	return (
		<canvas
			ref={canvasRef}
			width={width}
			height={height}
			style={{
				transform: 'scale(1.2)',
				transformOrigin: 'center center',
			}}
		/>
	);
};
