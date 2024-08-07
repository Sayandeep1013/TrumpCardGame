// import React from "react";
// import styled from "styled-components";

// const CardContainer = styled.div`
//   width: 300px;
//   height: 450px;
//   perspective: 1000px;
// `;

// const CardInner = styled.div`
//   width: 100%;
//   height: 100%;
//   position: relative;
//   transform-style: preserve-3d;
//   transition: transform 0.6s;
//   &:hover {
//     transform: rotateY(30deg) rotateX(15deg);
//   }
// `;

// const CardFace = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   backface-visibility: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 24px;
//   color: white;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// `;

// const CardFront = styled(CardFace)`
//   background-image: url(${(props) => props.image});
//   background-size: cover;
//   background-position: center;
//   border: 1px solid #444;
// `;

// const CardSide = styled(CardFace)`
//   background-image: url(${(props) => props.image});
//   background-size: cover;
//   background-position: center;
//   transform: rotateY(90deg) translateZ(150px);
//   width: 30px;
// `;

// const CardBottom = styled(CardFace)`
//   background-image: url(${(props) => props.image});
//   background-size: cover;
//   background-position: center;
//   transform: rotateX(-90deg) translateZ(225px);
//   height: 30px;
//   border: 1px solid #fff;
// `;

// const Card3D = ({ frontImage, sideImage, bottomImage }) => {
//   return (
//     <CardContainer>
//       <CardInner>
//         <CardFront image={frontImage} />
//         <CardSide image={sideImage} />
//         <CardBottom image={bottomImage} />
//       </CardInner>
//     </CardContainer>
//   );
// };

// export default Card3D;
