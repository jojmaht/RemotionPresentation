import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from './Common/Background';
import {TwoDimensions} from './Talk/TwoDimensions';
export const TwoDComp: React.FC = () => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	return (
		<div>
			<div>
				<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
					<Background />
				</Sequence>
				<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
					<TwoDimensions />
				</Sequence>
			</div>
		</div>
	);
};
