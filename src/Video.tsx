import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import {Background} from './Common/Background';
import {TwoDimensions} from './Talk/TwoDimensions';
import {TwoDComp} from './TwoDComp';
import {ThreeDComp} from './ThreeDComp';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			{/* <Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Logo"
				component={Logo}
				durationInFrames={200}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Title"
				component={Title}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Subtitle"
				component={Subtitle}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
			/> */}
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
		</>
	);
};
