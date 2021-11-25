import {Composition} from 'remotion';
import {Background} from './Common/Background';
import {TwoDimensions} from './Talk/TwoDimensions';
import {TwoDComp} from './TwoDComp';
import {ThreeDComp} from './ThreeDComp';
import {Noise2D} from './Talk/Noise2D';
import {Noise3D} from './Talk/Noise3D';
import {WhiteNoise} from './Talk/WhiteNoise';
import {Circles} from './Talk/Circles';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Background"
				component={Background}
				durationInFrames={1000}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="TwoDimensions"
				component={TwoDimensions}
				durationInFrames={1000}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="TwoDComp"
				component={TwoDComp}
				durationInFrames={160}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="ThreeDComp"
				component={ThreeDComp}
				durationInFrames={320}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Noise2D"
				component={Noise2D}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Noise3D"
				component={Noise3D}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
			<Composition
				id="WhiteNoise"
				component={WhiteNoise}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Circles"
				component={Circles}
				durationInFrames={300}
				fps={60}
				width={1080}
				height={1080}
			/>
		</>
	);
};
