import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

const CheckIcon = ({size}) => (
  <Svg
    width={size || 18}
    height={size || 18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#a)">
      <Path
        d="M15.17 1.61a1.657 1.657 0 0 1 2.368 2.32l-8.82 11.026A1.656 1.656 0 0 1 6.333 15L.485 9.155a1.657 1.657 0 0 1 2.344-2.343l4.625 4.626 7.673-9.776a.546.546 0 0 1 .045-.05l-.001-.002Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CheckIcon;
