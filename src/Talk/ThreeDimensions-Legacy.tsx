import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {spline} from '@georgedoescode/spline';

import SimplexNoise from 'simplex-noise';

const strokeStart = 0;
const strokeEnd = 45;
const pixelsStart = strokeEnd + 5;
const pixelsEnd = pixelsStart + 20;
const fillStart = pixelsEnd + 30;
const fillEnd = fillStart + 40;

const hRotationStart = fillEnd + 30;
const hRotationEnd = hRotationStart + 20;
const imagesDescentStart = hRotationEnd + 10;
const imagesDescentEnd = imagesDescentStart + 20;
const fanOutStart = imagesDescentEnd + 10;
const fanOutEnd = fanOutStart + 20;

const PIXEL_SIZE = 20;

export const ThreeDimensions: React.FC = () => {
	const {width, height, durationInFrames, fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const containerWidth = (height * 4) / 3;
	const rectangleWidth = containerWidth * 0.66;
	const rectangleHeight = height * 0.66;
	const pointsStart = [{x: 0, y: 0}];
	const pointsMiddle = [
		{x: rectangleWidth, y: 0},
		{x: rectangleWidth, y: rectangleHeight},
		{x: 0, y: rectangleHeight},
	];
	const pointsEnd = pointsStart;

	const points1 = [...pointsStart, ...pointsMiddle, ...pointsEnd];
	const points2 = [...pointsStart, ...pointsMiddle.reverse(), ...pointsEnd];
	const perimeter = rectangleHeight + rectangleWidth;

	const strokeProgress = interpolate(frame, [strokeStart, strokeEnd], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const fillProgress = interpolate(frame, [fillStart, fillEnd], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const labelsTranslate = interpolate(
		spring({
			frame: frame,
			fps: fps,
			config: {
				damping: 10,
				mass: 0.5,
			},
		}),
		[0, 1],
		[100, 0]
	);

	const labelsOpacity = interpolate(
		spring({
			frame: frame,
			fps: fps,
			config: {
				damping: 10,
				mass: 0.5,
			},
		}),
		[0, 1],
		[0, 1]
	);

	const labels = (
		<>
			<div
				style={{
					position: 'absolute',
					zIndex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					left: 0,
					right: 0,
					top: -100,
					transform: `translateY(${labelsTranslate}%)`,
					opacity: labelsOpacity,
				}}
			>
				𝓍
			</div>
			<div
				style={{
					position: 'absolute',
					zIndex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					top: 0,
					bottom: 0,
					left: -100,
					transform: `translateX(${labelsTranslate}%)`,
					opacity: labelsOpacity,
				}}
			>
				𝓎
			</div>
		</>
	);

	const strokeWidth = 8;

	const getSVGCanvases = (number) => {
		return Array.from({length: number}).map((_, svgIndex) => (
			<svg
				viewBox={`0 0 ${rectangleWidth} ${rectangleHeight}`}
				width={rectangleWidth}
				height={rectangleHeight}
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: number - svgIndex,
					// transform: `matrix3d(0.3, 0, 0, -0.0005, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, ${
					// 	-8 * svgIndex
					// }, ${1 - svgIndex / 10})`,
					transform: `translateZ(${-40 * svgIndex}px) scale(${
						1 + (5 * svgIndex) / 10
					})`,
					opacity: interpolate(
						frame,
						[hRotationStart, hRotationEnd],
						[1, 0.5],
						{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
					),
				}}
			>
				<defs>
					<linearGradient
						id="gradient-fill"
						x1="0"
						y1="0"
						x2={rectangleWidth}
						y2={rectangleHeight}
						gradientUnits="userSpaceOnUse"
						gradientTransform="rotate(15)"
					>
						<stop offset={`${fillProgress * 0}`} stop-color="#043c5c" />
						<stop
							offset={`${fillProgress * 0.14285714285714285}`}
							stop-color="#36487a"
						/>
						<stop
							offset={`${fillProgress * 0.2857142857142857}`}
							stop-color="#6e4e8d"
						/>
						<stop
							offset={`${fillProgress * 0.42857142857142855}`}
							stop-color="#a64e90"
						/>
						<stop
							offset={`${fillProgress * 0.5714285714285714}`}
							stop-color="#d85181"
						/>
						<stop
							offset={`${fillProgress * 0.7142857142857142}`}
							stop-color="#fa6266"
						/>
						<stop
							offset={`${fillProgress * 0.8571428571428571}`}
							stop-color="#ff8341"
						/>
						<stop offset={`${fillProgress * 0.99}`} stop-color="#ffad08" />
						<stop offset={`${fillProgress * 1}`} stop-color="#ffffff00" />
					</linearGradient>
				</defs>
				{[points1, points2].map((points, index) => (
					<path
						d={spline(points, 0, true)}
						stroke="#fff"
						strokeWidth={strokeWidth}
						strokeDasharray={perimeter * 2}
						strokeDashoffset={perimeter * 2 - perimeter * strokeProgress}
						fill={index === 0 ? 'url(#gradient-fill)' : 'none'}
					/>
				))}
				{Array.from({length: rectangleWidth / PIXEL_SIZE}).map(
					(line, index) => (
						<polyline
							points={`${PIXEL_SIZE * (index + 1)}, ${strokeWidth / 2} ${
								PIXEL_SIZE * (index + 1)
							}, ${rectangleHeight - strokeWidth / 2}`}
							stroke="#fff"
							strokeWidth="2"
							style={{
								transform: `translateY(${interpolate(
									frame,
									[pixelsStart + index, pixelsEnd + index],
									[-100, 0],
									{extrapolateRight: 'clamp'}
								)}%)`,
								opacity: interpolate(
									frame,
									[pixelsStart + index, pixelsEnd + index],
									[0, 0.6],
									{extrapolateRight: 'clamp'}
								),
							}}
						/>
					)
				)}
				{Array.from({length: rectangleHeight / PIXEL_SIZE}).map(
					(line, index) => (
						<polyline
							points={`${strokeWidth / 2}, ${PIXEL_SIZE * (index + 1)} ${
								rectangleWidth - strokeWidth / 2
							}, ${PIXEL_SIZE * (index + 1)}`}
							stroke="#fff"
							strokeWidth="2"
							style={{
								transform: `translateX(${interpolate(
									frame,
									[pixelsStart + index, pixelsEnd + index],
									[-100, 0],
									{extrapolateRight: 'clamp'}
								)}%)`,
								opacity: interpolate(
									frame,
									[pixelsStart + index, pixelsEnd + index],
									[0, 0.6],
									{extrapolateRight: 'clamp'}
								),
							}}
						/>
					)
				)}
			</svg>
		));
	};

	const hRotation = interpolate(
		frame,
		[hRotationStart, hRotationEnd],
		[0, 0.0005],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
	);

	const hCompression = interpolate(
		frame,
		[hRotationStart, hRotationEnd],
		[1, 0.3],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
	);

	const descent = interpolate(
		frame,
		[imagesDescentStart, imagesDescentEnd],
		[40, 0],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
	);

	const fanOut = interpolate(frame, [fanOutStart, fanOutEnd], [0, 5], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	return (
		<div
			style={{
				width: containerWidth,
				height,
				margin: 'auto',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					position: 'relative',
					color: 'white',
					width: rectangleWidth,
					height: rectangleHeight,
					fontSize: 70,
					lineHeight: 1,
					transformStyle: 'preserve-3d',
					perspective: '55px',
					perspectiveOrigin: 'left center',
					transform: `matrix3d(
						${hCompression}, 0, 0, ${hRotation},
						0, 1, 0, 0,
						${fanOut}, ${descent}, 1, 0.002,
						0, 0, 0, 1
					)`,
				}}
			>
				{labels}
				<div style={{position: 'absolute', left: 0, top: -40, zIndex: 10}}>
					<div style={{display: 'flex', alignItems: 'center'}}>
						<span
							style={{
								width: rectangleWidth * strokeProgress,
								height: 5,
								background: '#FFF',
								borderRadius: '3px 0 0 3px',
							}}
						></span>
						<svg
							width="26px"
							height="30px"
							viewBox="0 0 26 31"
							version="1.1"
							style={{
								transform: `scaleX(${Math.min(strokeProgress * 2, 1)})`,
								transformOrigin: 'center left',
							}}
						>
							<g
								id="Page-1"
								stroke="none"
								stroke-width="1"
								fill="none"
								fill-rule="evenodd"
							>
								<polygon
									id="Triangle"
									fill="#FFFFFF"
									stroke="#FFFFFF"
									points="25.3255814 15.5 0 30.3255814 0 0"
								></polygon>
							</g>
						</svg>
					</div>
				</div>
				<div style={{position: 'absolute', left: -40, top: 0, zIndex: 10}}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
						}}
					>
						<span
							style={{
								width: 5,
								height: rectangleHeight * strokeProgress,
								background: '#FFF',
								borderRadius: '3px 3px 0 0',
							}}
						></span>

						<svg
							width="30px"
							height="25px"
							viewBox="0 0 30 25"
							version="1.1"
							style={{
								transform: `scaleY(${Math.min(strokeProgress * 2, 1)})`,
								transformOrigin: 'center top',
							}}
						>
							<g
								id="Page-1"
								stroke="none"
								stroke-width="1"
								fill="none"
								fill-rule="evenodd"
							>
								<path
									d="M28.773343,0.5 L14.8255814,24.0197549 L0.877819761,0.5 L28.773343,0.5 Z"
									id="Triangle"
									stroke="#FFFFFF"
									fill="#FFFFFF"
								></path>
							</g>
						</svg>
					</div>
				</div>
				{getSVGCanvases(10)}
			</div>
		</div>
	);
};
