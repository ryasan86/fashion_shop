import styled from 'styled-components'
import {
  applyStyleModifiers,
  styleModifierPropTypes
} from 'styled-components-modifiers'

import MODIFIER_CONFIG from './config/modifier-config'

export const Ul = styled.ul`
  margin: 0;
  padding: 0;
  ${applyStyleModifiers(MODIFIER_CONFIG)};
`

Ul.propTypes = {
  modifiers: styleModifierPropTypes(MODIFIER_CONFIG)
}
