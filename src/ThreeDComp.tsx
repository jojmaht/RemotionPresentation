import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from './Common/Background';
import {ThreeDimensions} from './Talk/ThreeDimensions';
export const ThreeDComp: React.FC = () => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	return (
		<div>
			<div>
				<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
					<Background />
				</Sequence>
				<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
					<ThreeDimensions />
				</Sequence>
			</div>
		</div>
	);
};
