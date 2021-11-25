import {useCurrentFrame, useVideoConfig} from 'remotion';
import SimplexNoise from 'simplex-noise';

const xNoise = new SimplexNoise('x');
const yNoise = new SimplexNoise('y');

const getPoints = (radius, numberOfPoints, layerDimensions) => {
	const points = [];
	const angleStep = (Math.PI * 2) / numberOfPoints;

	for (let i = 1; i <= numberOfPoints; i++) {
		const theta = i * angleStep;

		const x = Math.cos(theta) * radius;
		const y = Math.sin(theta) * radius;

		points.push(
			...[
				{
					x: layerDimensions / 2 + x,
					y: layerDimensions / 2 + y,
					theta,
				},
			]
		);
	}

	return points;
};

export const Noise3D = () => {
	const {width, height} = useVideoConfig();
	const frame = useCurrentFrame();
	return (
		<div style={{background: '#232021', width: '100%'}}>
			<svg
				width="500px"
				height="490px"
				viewBox="0 0 100 98"
				version="1.1"
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) translate(${
						xNoise.noise2D(0, frame / 100) * 100
					}px, ${yNoise.noise2D(frame / 100, 0) * 100}px)`,
				}}
			>
				<g
					id="Page-1"
					stroke="none"
					stroke-width="1"
					fill="none"
					fill-rule="evenodd"
				>
					<g
						id="Mobile-Copy-8"
						transform="translate(-350.000000, -222.000000)"
						fill-rule="nonzero"
					>
						<g id="Group-2" transform="translate(238.785000, 222.500000)">
							<g id="Group" transform="translate(111.715000, 0.000000)">
								<path
									d="M18.096954,27.9438379 C16.0785001,31.0466519 14.5773364,34.3375669 13.5726805,37.6976767 C12.5530261,41.1079499 12,44.7393853 12,48.5 C12,58.8553391 16.1973305,68.2303391 22.9834957,75.0165043 C29.7696609,81.8026695 39.1446609,86 49.5,86 C51.8933128,86 54.2342938,85.7760186 56.5029837,85.3468725 L56.5029837,85.3468725 L67.8940361,83.1921374 L57.8834008,89.0390287 C52.4845981,92.1922964 46.203461,94 39.5,94 C29.4208033,94 20.2958033,89.9145983 13.6906025,83.3093975 C7.08540166,76.7041967 3,67.5791967 3,57.5 C3,49.436038 5.61546998,41.9830905 10.0434469,35.9423505 C12.2712188,32.903177 14.9779582,30.1939332 18.096954,27.9438379 Z"
									id="Path"
									fill="#000000"
								></path>
								<path
									d="M28.096954,18.9438379 C26.0785001,22.0466519 24.5773364,25.3375669 23.5726805,28.6976767 C22.5530261,32.1079499 22,35.7393853 22,39.5 C22,49.8553391 26.1973305,59.2303391 32.9834957,66.0165043 C39.7696609,72.8026695 49.1446609,77 59.5,77 C61.8933128,77 64.2342938,76.7760186 66.5029837,76.3468725 L66.5029837,76.3468725 L77.8940361,74.1921374 L67.8834008,80.0390287 C62.4845981,83.1922964 56.203461,85 49.5,85 C39.4208033,85 30.2958033,80.9145983 23.6906025,74.3093975 C17.0854017,67.7041967 13,58.5791967 13,48.5 C13,40.436038 15.61547,32.9830905 20.0434469,26.9423505 C22.2712188,23.903177 24.9779582,21.1939332 28.096954,18.9438379 Z"
									id="Path"
									fill="#000000"
								></path>
								<path
									d="M49.5,12 C59.5791967,12 68.7041967,16.0854017 75.3093975,22.6906025 C81.9145983,29.2958033 86,38.4208033 86,48.5 C86,56.5710049 83.3799625,64.0299339 78.9453029,70.0740399 C76.7057781,73.1263429 73.98318,75.8454779 70.8452393,78.1003494 C72.8824817,74.9957825 74.3998034,71.6997928 75.417487,68.3150427 C76.4471108,64.8905803 77,61.2598641 77,57.5 C77,47.1446609 72.8026695,37.7696609 66.0165043,30.9834957 C59.2303391,24.1973305 49.8553391,20 39.5,20 C37.1068172,20 34.7659585,20.2239573 32.4972946,20.6523334 L32.4972946,20.6523334 L20.9831591,22.8264679 L31.1242397,16.9561475 C36.6147619,13.7778743 42.8498373,12 49.5,12 Z"
									id="Path"
									fill="#000000"
								></path>
								<path
									d="M59.5,3 C69.5791967,3 78.7041967,7.08540166 85.3093975,13.6906025 C91.9145983,20.2958033 96,29.4208033 96,39.5 C96,47.5710049 93.3799625,55.0299339 88.9453029,61.0740399 C86.7057781,64.1263429 83.98318,66.8454779 80.8452393,69.1003494 C82.8824817,65.9957825 84.3998034,62.6997928 85.417487,59.3150427 C86.4471108,55.8905803 87,52.2598641 87,48.5 C87,38.1446609 82.8026695,28.7696609 76.0165043,21.9834957 C69.2303391,15.1973305 59.8553391,11 49.5,11 C47.1066872,11 44.7657062,11.2239814 42.4970163,11.6531275 L42.4970163,11.6531275 L31.1059639,13.8078626 L41.1165992,7.96097128 C46.5154019,4.80770359 52.796539,3 59.5,3 Z"
									id="Path"
									fill="#000000"
								></path>
								<path
									d="M18.096954,27.9438379 C16.0785001,31.0466519 14.5773364,34.3375669 13.5726805,37.6976767 C12.5530261,41.1079499 12,44.7393853 12,48.5 C12,58.8553391 16.1973305,68.2303391 22.9834957,75.0165043 C29.7696609,81.8026695 39.1446609,86 49.5,86 C51.8933128,86 54.2342938,85.7760186 56.5029837,85.3468725 L56.5029837,85.3468725 L67.8940361,83.1921374 L57.8834008,89.0390287 C52.4845981,92.1922964 46.203461,94 39.5,94 C29.4208033,94 20.2958033,89.9145983 13.6906025,83.3093975 C7.08540166,76.7041967 3,67.5791967 3,57.5 C3,49.436038 5.61546998,41.9830905 10.0434469,35.9423505 C12.2712188,32.903177 14.9779582,30.1939332 18.096954,27.9438379 Z"
									id="Path"
									fill="#FF0000"
									opacity="0.653483073"
								></path>
								<path
									d="M28.096954,18.9438379 C26.0785001,22.0466519 24.5773364,25.3375669 23.5726805,28.6976767 C22.5530261,32.1079499 22,35.7393853 22,39.5 C22,49.8553391 26.1973305,59.2303391 32.9834957,66.0165043 C39.7696609,72.8026695 49.1446609,77 59.5,77 C61.8933128,77 64.2342938,76.7760186 66.5029837,76.3468725 L66.5029837,76.3468725 L77.8940361,74.1921374 L67.8834008,80.0390287 C62.4845981,83.1922964 56.203461,85 49.5,85 C39.4208033,85 30.2958033,80.9145983 23.6906025,74.3093975 C17.0854017,67.7041967 13,58.5791967 13,48.5 C13,40.436038 15.61547,32.9830905 20.0434469,26.9423505 C22.2712188,23.903177 24.9779582,21.1939332 28.096954,18.9438379 Z"
									id="Path"
									fill="#00FF00"
									opacity="0.653483073"
								></path>
								<path
									d="M49.5,12 C59.5791967,12 68.7041967,16.0854017 75.3093975,22.6906025 C81.9145983,29.2958033 86,38.4208033 86,48.5 C86,56.5710049 83.3799625,64.0299339 78.9453029,70.0740399 C76.7057781,73.1263429 73.98318,75.8454779 70.8452393,78.1003494 C72.8824817,74.9957825 74.3998034,71.6997928 75.417487,68.3150427 C76.4471108,64.8905803 77,61.2598641 77,57.5 C77,47.1446609 72.8026695,37.7696609 66.0165043,30.9834957 C59.2303391,24.1973305 49.8553391,20 39.5,20 C37.1068172,20 34.7659585,20.2239573 32.4972946,20.6523334 L32.4972946,20.6523334 L20.9831591,22.8264679 L31.1242397,16.9561475 C36.6147619,13.7778743 42.8498373,12 49.5,12 Z"
									id="Path"
									fill="#0000FF"
									opacity="0.653483073"
								></path>
								<path
									d="M59.5,3 C69.5791967,3 78.7041967,7.08540166 85.3093975,13.6906025 C91.9145983,20.2958033 96,29.4208033 96,39.5 C96,47.5710049 93.3799625,55.0299339 88.9453029,61.0740399 C86.7057781,64.1263429 83.98318,66.8454779 80.8452393,69.1003494 C82.8824817,65.9957825 84.3998034,62.6997928 85.417487,59.3150427 C86.4471108,55.8905803 87,52.2598641 87,48.5 C87,38.1446609 82.8026695,28.7696609 76.0165043,21.9834957 C69.2303391,15.1973305 59.8553391,11 49.5,11 C47.1066872,11 44.7657062,11.2239814 42.4970163,11.6531275 L42.4970163,11.6531275 L31.1059639,13.8078626 L41.1165992,7.96097128 C46.5154019,4.80770359 52.796539,3 59.5,3 Z"
									id="Path"
									fill-opacity="0.419607736"
									fill="#FFFFFF"
									opacity="0.653483073"
								></path>
								<path
									d="M59.5,0 C81.3152476,0 99,17.6847524 99,39.5 C99,53.5839408 91.6289888,65.9462896 80.5342359,72.9397771 C77.7433606,76.4779799 74.3602087,79.5281063 70.5342359,81.9397771 C63.3008614,91.1115886 52.0880868,97 39.5,97 C17.6847524,97 0,79.3152476 0,57.5 C0,43.4160592 7.37101118,31.0537104 18.4657641,24.0602229 C21.2566394,20.5220201 24.6397913,17.4718937 28.4657641,15.0602229 C35.6991386,5.88841141 46.9119132,0 59.5,0 Z M11.6672125,37.1090891 L11.6564987,37.1247481 C7.47138818,42.8341645 5,49.8784705 5,57.5 C5,76.5538239 20.4461761,92 39.5,92 C45.8355002,92 51.7721394,90.2922727 56.8747123,87.3120234 C54.485597,87.7639492 52.0203648,88 49.5,88 C27.6847524,88 10,70.3152476 10,48.5 C10,44.5398909 10.5827644,40.7158938 11.6672125,37.1090891 Z M21.6672125,28.1090891 L21.6564987,28.1247481 C17.4713882,33.8341645 15,40.8784705 15,48.5 C15,67.5538239 30.4461761,83 49.5,83 C55.8355002,83 61.7721394,81.2922727 66.8747123,78.3120234 C64.485597,78.7639492 62.0203648,79 59.5,79 C37.6847524,79 20,61.3152476 20,39.5 C20,35.5398909 20.5827644,31.7158938 21.6672125,28.1090891 Z M39.5,23 C35.5586123,23 31.771593,23.6609293 28.2437268,24.878003 C26.1624312,29.3174333 25,34.2729665 25,39.5 C25,58.5538239 40.4461761,74 59.5,74 C63.4413877,74 67.228407,73.3390707 70.7562732,72.121997 C72.8375688,67.6825667 74,62.7270335 74,57.5 C74,38.4461761 58.5538239,23 39.5,23 Z M49.5,14 C43.2122381,14 37.3173491,15.6820886 32.2407741,18.6208245 L32.1262059,18.6870616 C34.5150913,18.2359849 36.979987,18 39.5,18 C61.3152476,18 79,35.6847524 79,57.5 C79,61.4601091 78.4172356,65.2841062 77.3327875,68.8909109 C81.5242486,63.1782661 84,56.1282544 84,48.5 C84,29.4461761 68.5538239,14 49.5,14 Z M59.5,5 C53.1644998,5 47.2278606,6.70772726 42.1252877,9.68797663 C44.514403,9.23605082 46.9796352,9 49.5,9 C71.3152476,9 89,26.6847524 89,48.5 C89,52.4601091 88.4172356,56.2841062 87.3327875,59.8909109 C91.5242486,54.1782661 94,47.1282544 94,39.5 C94,20.4461761 78.5538239,5 59.5,5 Z"
									id="Shape"
									fill="#FFFFFF"
								></path>
							</g>
						</g>
					</g>
				</g>
			</svg>
			<div
				style={{
					color: 'white',
					position: 'absolute',
					left: '50%',
					transform: 'translateX(-50%)',
					bottom: 100,
					fontSize: 100,
					fontFamily: 'Operator Mono',
				}}
			>
				x:
				{Math.round(xNoise.noise2D(0, frame / 100) * 100)
					.toString()
					.padStart(3, ' 0')}{' '}
				y:
				{Math.round(yNoise.noise2D(0, frame / 100) * 100)
					.toString()
					.padStart(3, ' 0')}
			</div>
		</div>
	);
};