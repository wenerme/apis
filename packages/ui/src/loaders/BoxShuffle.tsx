import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const cbox = (props: any) => `
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;
const fbox = (props: any) => `
  ${cbox}
  width: 100%;
  height: 100%;
`;

const BoxShuffleContainer = styled.div<{ size?: string,colors?:string[] }>`
  --size: ${(props) => props['size'] || '3em'};

  ${cbox};
  transform-style: preserve-3d;
  perspective: 2000px;
  transform: rotateX(-30deg) rotateY(-45deg);

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  .holder {
    ${cbox};
    transform-style: preserve-3d;
    transform: translate3d(0em, var(--size), calc(var(--size) * 0.5));
    &:last-child {
      transform: rotateY(-90deg) rotateX(90deg) translate3d(0, var(--size), calc(var(--size) * 0.5));
    }
    &:first-child {
      transform: rotateZ(-90deg) rotateX(-90deg) translate3d(0, var(--size), calc(var(--size) * 0.5));
    }
  }

  ${(props) =>
  (props.colors || ['#1FBCD3', '#CBE2B4', '#F6B6CA']).map(
    (color, i) => `
    .holder:nth-child(${i + 1}){
      .box{
        background-color: ${color};
        &:before{
          background-color: ${darken(0.2, color)};
        }
        &:after{
          background-color: ${darken(0.1, color)};
        }
      }
    }
  }
`
  )}

  .box {
    ${cbox};
    transform-style: preserve-3d;
    animation: ani-box 6s infinite;
    width: var(--size);
    height: var(--size);
    //opacity: .9;
    &:before,
    &:after {
      position: absolute;
      width: 100%;
      height: 100%;
      content: '';
    }
    &:before {
      left: 100%;
      bottom: 0;
      transform: rotateY(90deg);
      transform-origin: 0 50%;
    }
    &:after {
      left: 0;
      bottom: 100%;
      transform: rotateX(90deg);
      transform-origin: 0 100%;
    }
  }

  @keyframes ani-box {
    8.33% {
      transform: translate3d(-50%, -50%, 0) scaleZ(2);
    }
    16.7% {
      transform: translate3d(-50%, -50%, calc(-1 * var(--size))) scaleZ(1);
    }
    25% {
      transform: translate3d(-50%, -100%, calc(-1 * var(--size))) scaleY(2);
    }
    33.3% {
      transform: translate3d(-50%, -150%, calc(-1 * var(--size))) scaleY(1);
    }
    41.7% {
      transform: translate3d(-100%, -150%, calc(-1 * var(--size))) scaleX(2);
    }
    50% {
      transform: translate3d(-150%, -150%, calc(-1 * var(--size))) scaleX(1);
    }
    58.3% {
      transform: translate3d(-150%, -150%, 0) scaleZ(2);
    }
    66.7% {
      transform: translate3d(-150%, -150%, 0) scaleZ(1);
    }
    75% {
      transform: translate3d(-150%, -100%, 0) scaleY(2);
    }
    83.3% {
      transform: translate3d(-150%, -50%, 0) scaleY(1);
    }
    91.7% {
      transform: translate3d(-100%, -50%, 0) scaleX(2);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) scaleX(1);
    }
  }
`;

/*
$s: 3em;
$colors: #1FBCD3, #CBE2B4, #F6B6CA;

*, *:before, *:after{
	box-sizing: border-box;
}
body{
	background: #455a64;
}
.container{
	@include cbox;
	transform-style: preserve-3d;
	perspective: 2000px;
	transform: rotateX(-30deg) rotateY(-45deg);
}
.holder{
	@include cbox;
	transform-style: preserve-3d;
	transform: translate3d(0em, $s, $s*.5);
	&:last-child{
		transform: rotateY(-90deg) rotateX(90deg) translate3d(0, $s, $s*.5);
	}
	&:first-child{
		transform: rotateZ(-90deg) rotateX(-90deg) translate3d(0, $s, $s*.5);
	}
	@for $i from 1 through 3{
		$color: nth($colors,$i);
		&:nth-child(#{$i}){
			.box{
				background-color: $color;
				&:before{
					background-color: darken($color,20);
				}
				&:after{
					background-color: darken($color,10);
				}
			}
		}
	}
}
.box{
	@include cbox;
	transform-style: preserve-3d;
	animation: ani-box 6s infinite;
	width: $s;
	height: $s;
	//opacity: .9;
	&:before, &:after{
		position: absolute;
		width: 100%;
		height: 100%;
		content: "";
	}
	&:before{
		left: 100%;
		bottom: 0;
		transform: rotateY(90deg);
		transform-origin: 0 50%;
	}
	&:after{
		left: 0;
		bottom: 100%;
		transform: rotateX(90deg);
		transform-origin: 0 100%;
	}
}

@keyframes ani-box{
	8.33%{
		transform: translate3d(-50%,-50%,0) scaleZ(2);
	}
	16.7%{
		transform: translate3d(-50%,-50%,-$s) scaleZ(1);
	}
	25%{
		transform: translate3d(-50%,-100%,-$s) scaleY(2);
	}
	33.3%{
		transform: translate3d(-50%,-150%,-$s) scaleY(1);
	}
	41.7%{
		transform: translate3d(-100%,-150%,-$s) scaleX(2);
	}
	50%{
		transform: translate3d(-150%,-150%,-$s) scaleX(1);
	}
	58.3%{
		transform: translate3d(-150%,-150%, 0) scaleZ(2);
	}
	66.7%{
		transform: translate3d(-150%,-150%,0) scaleZ(1);
	}
	75%{
		transform: translate3d(-150%,-100%,0) scaleY(2);
	}
	83.3%{
		transform: translate3d(-150%,-50%,0) scaleY(1);
	}
	91.7%{
		transform: translate3d(-100%,-50%,0) scaleX(2);
	}
	100%{
		transform: translate3d(-50%,-50%,0) scaleX(1);
	}
}

 */

export const BoxShuffle: React.FC<{ size?: string }> = () => {
  return (
    <BoxShuffleContainer>
      <div className="holder">
        <div className="box" />
      </div>
      <div className="holder">
        <div className="box" />
      </div>
      <div className="holder">
        <div className="box" />
      </div>
    </BoxShuffleContainer>
  );
};
