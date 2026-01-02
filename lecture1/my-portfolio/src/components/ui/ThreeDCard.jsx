import { createContext, useState, useContext, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';

/**
 * 3D 카드 효과를 위한 Mouse Enter Context
 */
const MouseEnterContext = createContext(undefined);

/**
 * useMouseEnter Hook
 */
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error('useMouseEnter must be used within a MouseEnterProvider');
  }
  return context;
};

/**
 * CardContainer 컴포넌트
 * 3D perspective를 제공하는 컨테이너
 *
 * Props:
 * @param {node} children - 자식 요소 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 */
export const CardContainer = ({ children, sx = {} }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          perspective: '1000px',
          ...sx
        }}
      >
        <Box
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transition: 'all 0.2s ease-linear',
            transformStyle: 'preserve-3d'
          }}
        >
          {children}
        </Box>
      </Box>
    </MouseEnterContext.Provider>
  );
};

/**
 * CardBody 컴포넌트
 */
export const CardBody = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        transformStyle: 'preserve-3d',
        '& > *': {
          transformStyle: 'preserve-3d'
        },
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

/**
 * CardItem 컴포넌트
 */
export const CardItem = ({
  children,
  sx = {},
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = 'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: 'fit-content',
        transition: 'transform 0.2s ease-linear',
        ...sx
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
