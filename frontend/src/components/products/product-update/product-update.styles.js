import styled from 'styled-components'

import FormStyles from '../../form'
import { transparentButton } from '../../../elements'

const UpdateProduct = styled.div`
  margin: 2rem auto;
  max-width: var(--max-width);
  min-height: 10rem;
  position: relative;
  width: 80%;

  h3 {
    margin: 0;
  }
`

const Form = styled(FormStyles)`
  box-shadow: var(--box-shadow);
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr 1fr;
  padding: 3rem;
`

Form.Fieldset = styled.fieldset`
  grid-column: 1/2;
`

Form.FieldsetInner = styled.span`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;

  div:last-child {
    margin: 0;
  }
`

Form.MultipleChoice = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 2/3;
  height: 30rem;
  justify-content: space-between;
`

Form.SubmitButton = styled.div`
  display: flex;
  grid-column: 1/3;
  justify-content: space-around;

  button {
    width: 20rem;

    &:first-child {
      ${transparentButton};
    }
  }
`

export { Form }
export default UpdateProduct
