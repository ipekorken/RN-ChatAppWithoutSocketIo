import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ChatCamIcon = ({size}) => (
  <Svg
    width={size || 25}
    height={size || 25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M2.564 7.419a2.473 2.473 0 0 1 2.473-2.473h7.419a2.473 2.473 0 0 1 2.473 2.473v9.892a2.473 2.473 0 0 1-2.473 2.473H5.037a2.473 2.473 0 0 1-2.473-2.473V7.419ZM18.086 8.786a1.237 1.237 0 0 0-.684 1.106v4.946a1.236 1.236 0 0 0 .684 1.105l2.473 1.237a1.236 1.236 0 0 0 1.789-1.106V8.655a1.236 1.236 0 0 0-1.79-1.105l-2.472 1.236Z"
      fill="#fff"
    />
  </Svg>
);

export default ChatCamIcon;
