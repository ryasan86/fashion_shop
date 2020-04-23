import { css } from 'styled-components'

const MODIFIER_CONFIG = {
  border2px: () => css`
    border-width: 2px;
  `,
  border3px: () => css`
    border-width: 3px;
  `,
  borderRadius2px: () => css`
    border-radius: 2px;
  `,
  borderRadius3px: () => css`
    border-radius: 3px;
  `,
  clear: () => css`
    background-color: transparent;
  `,
  dark: () => css`
    background-color: var(--dark);
  `,
  darker: () => css`
    background-color: var(--darker);
  `,
  grayColor: () => css`
    color: var(--gray);
  `,
  green: () => css`
    background: var(--green);
  `,
  greenColor: () => css`
    color: var(--green);
  `,
  largeText: () => css`
    font-size: var(--large-font);
  `,
  mediumText: () => css`
    font-size: var(--regular-font);
  `,
  offWhiteColor: () => css`
    color: var(--off-white);
  `,
  red: () => css`
    background-color: var(--red);
  `,
  redBorder: () => css`
    border-color: var(--red);
  `,
  redColor: () => css`
    color: var(--red);
  `,
  redOutline: () => css`
    outline-color: var(--red);
  `,
  salmon: () => css`
    background: var(--salmon);
  `,
  salmonBorder: () => css`
    border-color: var(--salmon);
  `,
  smallText: () => css`
    font-size: var(--small-font);
  `,
  solidBorder: () => css`
    border-style: solid;
  `,
  superSmallText: () => css`
    font-size: var(--super-small-font);
  `,
  textAlignCenter: () => css`
    text-align: center;
  `,
  textAlignLeft: () => css`
    text-align: left;
  `,
  textAlignRight: () => css`
    text-align: right;
  `,
  transparent: () => css`
    background: transparent;
  `,
  uppercase: () => css`
    text-transform: uppercase;
  `,
  whiteColor: () => css`
    color: white;
  `,
  width100: () => css`
    width: 100%;
  `
}

export default MODIFIER_CONFIG
