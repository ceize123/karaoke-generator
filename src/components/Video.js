import React from 'react';
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
} from 'video-react';
import DownloadButton from './DownloadButton';

function Video() {
  return (
	<Player>
		<source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />

		<ControlBar autoHide={false}>
			<CurrentTimeDisplay order={4.1} />
			<TimeDivider order={4.2} />
			<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
			<DownloadButton order={7} />
		</ControlBar>
	</Player>
  );
};

export default Video;