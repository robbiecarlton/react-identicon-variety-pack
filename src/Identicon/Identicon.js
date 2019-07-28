import React, { useRef } from 'react';
import useRenderIcon from './useRenderIcon'
import renderBlockie from './renderers/blockies'
import renderBishop from './renderers/bishop'
import renderDiscs from './renderers/discs'
import renderRings from './renderers/rings'
import renderNetwork from './renderers/network'
import renderNetworkLarge from './renderers/network-large'

export default function Identicon ({ renderIcon, seed, size, scale, circle, className }) {
  const canvasRef = useRef(null)
  useRenderIcon(renderIcon, { seed, size, scale }, canvasRef)

  const style = circle ? {borderRadius: '50%'} : {}

  return <canvas className={className} style={style} ref={canvasRef} width={size} height={size} />
}

export function Blockie (props) {
  return <Identicon {...props} renderIcon={renderBlockie} />
}

export function Bishop (props) {
  return <Identicon {...props} renderIcon={renderBishop} />
}

export function Discs (props) {
  return <Identicon {...props} renderIcon={renderDiscs} />
}

export function Rings (props) {
  return <Identicon {...props} renderIcon={renderRings} />
}

export function Network (props) {
  return <Identicon {...props} renderIcon={renderNetwork} />
}

export function NetworkLarge (props) {
  return <Identicon {...props} renderIcon={renderNetworkLarge} />
}

