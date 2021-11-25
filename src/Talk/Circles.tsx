import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {spline} from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';

const xNoise = new SimplexNoise('xxx');
const yNoise = new SimplexNoise('yyy');

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export const Circles = () => {
	const {width, height, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();

	const stopStartStop = (value) => {
		return interpolate(
			frame,
			[0, durationInFrames / 2, durationInFrames],
			[0, value, 0]
		);
	};

	const getCircle = (radius, layerDimensions, index) => {
		let points = [];
		const numberOfPoints = 12;
		const angleStep = (Math.PI * 2) / numberOfPoints;
		const progress = frame / 100;
		const amplitude = radius / 10;
		const center = layerDimensions / 2;

		for (let i = 0; i < numberOfPoints; i++) {
			const theta = angleStep * i;
			const xOffset = stopStartStop(
				xNoise.noise2D((index + 1) * i, progress) * amplitude
			);
			const yOffset = stopStartStop(
				yNoise.noise2D((index + 1) * i, progress) * amplitude
			);
			const x = center + radius * Math.cos(theta) + xOffset;
			const y = center + radius * Math.sin(theta) + yOffset;
			points.push({x, y});
		}
		console.log(points);
		return points;
	};

	return (
		<svg width={height} height={height}>
			{colors.map((color, index) => {
				return (
					<path
						style={{mixBlendMode: 'screen'}}
						d={spline(getCircle(400, height, index), 1, true)}
						stroke={color}
						strokeWidth={20}
					/>
				);
			})}
		</svg>
	);
};
