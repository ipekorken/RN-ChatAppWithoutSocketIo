import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ChatPhoneIcon = ({size}) => (
  <Svg
    width={size || 16}
    height={size || 15}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M15.122 2.37 13.182.433a1.472 1.472 0 0 0-2.087 0L9.009 2.52a1.471 1.471 0 0 0 0 2.088l1.525 1.526A7.168 7.168 0 0 1 9.07 8.246a7.197 7.197 0 0 1-2.114 1.471L5.43 8.192a1.471 1.471 0 0 0-2.088 0l-2.088 2.084a1.473 1.473 0 0 0 0 2.09L3.189 14.3a2.392 2.392 0 0 0 2.073.666c2.454-.404 4.888-1.71 6.852-3.671 1.963-1.961 3.266-4.393 3.676-6.854a2.396 2.396 0 0 0-.668-2.072Z"
      fill="#fff"
    />
  </Svg>
);

export default ChatPhoneIcon;
