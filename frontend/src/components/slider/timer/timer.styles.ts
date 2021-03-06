import styled from 'styled-components'

const Timer = styled.div`
    margin-top: 2rem;
    position: relative;
`

Timer.Bg = styled.div`
    background: var(--red);
    border-radius: 50%;
    content: '';
    height: 2.5rem;
    opacity: 0.2;
    width: 2.5rem;
`

Timer.Clock = styled.div`
    border-bottom-color: ${(props: any) =>
        (props.pct as number) >= 50 ? 'var(--red)' : 'transparent'};
    border-left-color: ${(props: any) =>
        (props.pct as number) >= 75 ? 'var(--red)' : 'transparent'};
    border-radius: 50%;
    border-right-color: ${(props: any) =>
        (props.pct as number) >= 25 ? 'var(--red)' : 'transparent'};
    border-style: solid;
    border-top-color: ${(props: any) =>
        (props.pct as number) >= 100 ? 'var(--red)' : 'transparent'};
    border-width: 1rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
`

export default Timer
