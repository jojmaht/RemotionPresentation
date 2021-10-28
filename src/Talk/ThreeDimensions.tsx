import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {spline} from '@georgedoescode/spline';
import FRAME0 from './assets/frame0.jpg';
import FRAME1 from './assets/frame1.jpg';
import FRAME2 from './assets/frame2.jpg';
import FRAME3 from './assets/frame3.jpg';
import FRAME4 from './assets/frame4.jpg';
import FRAME5 from './assets/frame5.jpg';
import FRAME6 from './assets/frame6.jpg';
import FRAME7 from './assets/frame7.jpg';
import FRAME8 from './assets/frame8.jpg';
import FRAME9 from './assets/frame9.jpg';
import FRAME10 from './assets/frame10.jpg';
import FRAME11 from './assets/frame11.jpg';
import FRAME12 from './assets/frame12.jpg';
import FRAME13 from './assets/frame13.jpg';
import FRAME14 from './assets/frame14.jpg';

const frames = [
	FRAME0,
	FRAME1,
	FRAME2,
	FRAME3,
	FRAME4,
	FRAME5,
	FRAME6,
	FRAME7,
	FRAME8,
	FRAME9,
	FRAME10,
	FRAME11,
	FRAME12,
	FRAME13,
	FRAME14,
];

import SimplexNoise from 'simplex-noise';

const strokeStart = 0;
const strokeEnd = 45;
const pixelsStart = strokeEnd - 15;
const pixelsEnd = pixelsStart + 20;
const fillStart = pixelsEnd + 30;
const fillEnd = fillStart + 40;

const hRotationStart = fillEnd + 5;
const hTranslateStart = hRotationStart;
const hTranslateEnd = hTranslateStart + 10;
const hRotationEnd = hRotationStart + 20;
const imagesDecompStart = hRotationEnd - 5;
const imagesDecompEnd = imagesDecompStart + 20;

const imagesOpacityStart = imagesDecompEnd + 15;
const imagesOpacityEnd = imagesOpacityStart + 5;
const axesOpacityStart = imagesOpacityEnd + 25;
const axesOpacityEnd = axesOpacityStart + 10;
const refoldStart = axesOpacityEnd - 2;
const refoldEnd = refoldStart + 20;

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

	const zLabelTranslate = interpolate(
		spring({
			frame: frame - (imagesDecompStart + imagesDecompEnd) / 2,
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

	const zLabelOpacity = interpolate(
		spring({
			frame: frame - (imagesDecompStart + imagesDecompEnd) / 2,
			fps: fps,
			config: {
				damping: 10,
				mass: 0.5,
			},
		}),
		[0, 1],
		[0, 1]
	);

	const hRotationProgress = interpolate(
		frame,
		[hRotationStart, hRotationEnd],
		[0, 1],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
	);

	const hTranslateProgress = interpolate(
		frame,
		[hTranslateStart, hTranslateEnd],
		[0, 1],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
	);

	const decompProgress = interpolate(
		frame,
		[imagesDecompStart, imagesDecompEnd],
		[0, 1],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
	);

	const axesOpacityProgress = interpolate(
		frame,
		[axesOpacityStart, axesOpacityEnd],
		[1, 0],
		{
			extrapolateRight: 'clamp',
			extrapolateLeft: 'clamp',
		}
	);

	const refoldProgress = interpolate(frame, [refoldStart, refoldEnd], [1, 0], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	const zLabel = (
		<div
			style={{
				position: 'absolute',
				top: -40,
				width: 840,
				right: 480,
				opacity: axesOpacityProgress,
			}}
		>
			<div
				style={{
					position: 'absolute',
					zIndex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					left: 0,
					right: 0,
					top: -120,
					transform: `translateY(${Math.round(zLabelTranslate)}%)`,
					opacity: zLabelOpacity,
				}}
			>
				𝓏 (time)
			</div>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: -40,
					zIndex: 10,
					opacity: hRotationProgress * hRotationProgress,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						transform: 'rotate(180deg)',
					}}
				>
					<span
						style={{
							width: 866 * decompProgress,
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
							transform: `scaleX(${Math.min(decompProgress * 2, 1)})`,
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
		</div>
	);

	const getTransform = (index = 0) => {
		return `
		perspective(${1000}px) 
		scale(${1 - 0.35 * hRotationProgress * hRotationProgress * refoldProgress})
		translateX(${
			(300 * hTranslateProgress * hTranslateProgress +
				-60 * index * decompProgress) *
			refoldProgress *
			refoldProgress
		}px) 
		rotateY(${55 * hRotationProgress * hRotationProgress * refoldProgress}deg)
		`;
	};

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
					transform: `translateY(${Math.round(labelsTranslate)}%)`,
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
					transform: `translateX(${Math.round(labelsTranslate)}%)`,
					opacity: labelsOpacity,
				}}
			>
				𝓎
			</div>
		</>
	);

	const strokeWidth = 8;

	const getSVGCanvases = (number) => {
		return Array.from({length: number}).map((_, svgIndex) => {
			const shouldAnimate = svgIndex === 0;
			const internalFillProgress = shouldAnimate ? fillProgress : 1;
			return (
				<svg
					viewBox={`0 0 ${rectangleWidth} ${rectangleHeight}`}
					width={rectangleWidth}
					height={rectangleHeight}
					style={{
						position: 'absolute',
						inset: 0,
						zIndex: number - svgIndex,
						willChange: 'transform',
						transform: getTransform(svgIndex),
						opacity: shouldAnimate
							? interpolate(frame, [hRotationStart, hRotationEnd], [1, 0.5], {
									extrapolateLeft: 'clamp',
									extrapolateRight: 'clamp',
							  }) +
							  (1 - refoldProgress)
							: hRotationProgress * hRotationProgress * 0.5 * refoldProgress,
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
							<stop
								offset={`${internalFillProgress * 0}`}
								stop-color="#043c5c"
							/>
							<stop
								offset={`${internalFillProgress * 0.14285714285714285}`}
								stop-color="#36487a"
							/>
							<stop
								offset={`${internalFillProgress * 0.2857142857142857}`}
								stop-color="#6e4e8d"
							/>
							<stop
								offset={`${internalFillProgress * 0.42857142857142855}`}
								stop-color="#a64e90"
							/>
							<stop
								offset={`${internalFillProgress * 0.5714285714285714}`}
								stop-color="#d85181"
							/>
							<stop
								offset={`${internalFillProgress * 0.7142857142857142}`}
								stop-color="#fa6266"
							/>
							<stop
								offset={`${internalFillProgress * 0.8571428571428571}`}
								stop-color="#ff8341"
							/>
							<stop
								offset={`${internalFillProgress * 0.99}`}
								stop-color="#ffad08"
							/>
							<stop
								offset={`${internalFillProgress * 1}`}
								stop-color="#ffffff00"
							/>
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
									transform: shouldAnimate
										? `translateY(${interpolate(
												frame,
												[pixelsStart + index, pixelsEnd + index],
												[-100, 0],
												{extrapolateRight: 'clamp'}
										  )}%)`
										: '',
									opacity: shouldAnimate
										? interpolate(
												frame,
												[pixelsStart + index, pixelsEnd + index],
												[0, 0.6],
												{extrapolateRight: 'clamp'}
										  )
										: 0.6,
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
									transform: shouldAnimate
										? `translateX(${interpolate(
												frame,
												[pixelsStart + index, pixelsEnd + index],
												[-100, 0],
												{extrapolateRight: 'clamp'}
										  )}%)`
										: '',
									opacity: shouldAnimate
										? interpolate(
												frame,
												[pixelsStart + index, pixelsEnd + index],
												[0, 0.6],
												{extrapolateRight: 'clamp'}
										  )
										: 0.6,
								}}
							/>
						)
					)}
					<image
						xlinkHref={
							frames[
								frame < refoldEnd + 10
									? svgIndex
									: (svgIndex + Math.floor(frame / 2)) % frames.length
							]
						}
						x="0"
						y="0"
						width={rectangleWidth}
						height={rectangleHeight}
						style={{
							opacity: interpolate(
								frame,
								[imagesOpacityStart + svgIndex, imagesOpacityEnd + svgIndex],
								[0, 1],
								{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
							),
						}}
					/>
				</svg>
			);
		});
	};

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
				}}
			>
				<div
					style={{
						transform: getTransform(),
						width: rectangleWidth,
						height: rectangleHeight,
						position: 'relative',
						zIndex: 100,
						opacity: axesOpacityProgress,
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
				</div>
				{getSVGCanvases(14)}
				{zLabel}
			</div>
		</div>
	);
};
