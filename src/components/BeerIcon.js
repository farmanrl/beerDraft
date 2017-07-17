import React from 'react';
import { srmToCss } from 'brauhaus';

import flute from './flute.svg';
import goblet from './goblet.svg';
import mug from './mug.svg';
import pilsner from './pilsner.svg';
import pint from './pint.svg';
import snifter from './snifter.svg';
import stange from './stange.svg';
import tulip from './tulip.svg';
import weizen from './weizen.svg';
import oversized from './oversized.svg';
import willi from './willi.svg';

const BeerIcon = (props) => {

  const beerGlass = (glasswareId) => {
    if (glasswareId === 1) {
      return flute;
    } else if (glasswareId === 2) {
      return goblet;
    } else if (glasswareId === 3) {
      return mug;
    } else if (glasswareId === 4) {
      return pilsner;
    } else if (glasswareId === 5) {
      return pint;
    } else if (glasswareId === 6) {
      return snifter;
    } else if (glasswareId === 7) {
      return stange;
    } else if (glasswareId === 8) {
      return tulip;
    } else if (glasswareId === 9) {
      return weizen;
    } else if (glasswareId === 10) {
      return oversized;
    } else if (glasswareId === 13) {
      return willi;
    } else {
      return pint;
    }
  }

  const srmStyle = {
    backgroundColor: props.srm ? srmToCss(props.srm) : 'white',
    width: '64px',
    height: '64px',
    overflow: 'hidden',
  }

  const glassStyle = {
    height: '80px',
    overflow: 'hidden',
    filter: props.srm ? 'invert(100%)' : null,
  }

  return (
    <div style={srmStyle}>
      <img
        height={64}
        width={64}
        style={glassStyle}
        src={beerGlass(props.glasswareId)}
        alt=""
      />
    </div>
  );
}

export default BeerIcon;
