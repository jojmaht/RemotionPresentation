import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import SimplexNoise from 'simplex-noise';

const xNoise = new SimplexNoise('displacex');
const yNoise = new SimplexNoise('displacey');

const SIZE = 30;
// const SIZE = 100;

export const Background: React.FC = () => {
	const {width, height, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const COLS = width / SIZE + 1;
	const ROWS = height / SIZE + 1;
	return (
		<div
			style={{
				background: '#151C22',
				transform: 'scale(1.2)',
				transformOrigin: 'center center',
			}}
		>
			{Array.from({length: ROWS}).map((_y, y) => {
				return (
					<div key={y} style={{display: 'flex'}}>
						{Array.from({length: COLS}).map((_x, x) => {
							const displacementX =
								xNoise.noise3D(y / ROWS, x / COLS, frame / 500) * SIZE * 2 -
								SIZE / 2;
							const displacementY =
								yNoise.noise3D(y / ROWS, x / COLS, frame / 500) * SIZE * 2 -
								SIZE / 2;
							return (
								<div
									style={{
										width: SIZE,
										height: SIZE,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#32414F',
										opacity: 0.5,
										fontSize: 30,
										// willChange: 'transform',
										transform: `translate(${displacementX}px, ${displacementY}px)`,
									}}
									key={x + y * COLS}
								>
									•
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};
