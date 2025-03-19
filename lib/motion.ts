// Animation variant for simple text animation
export const textVariant = (delay) => {
    return {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay: delay,
        },
      },
    };
  };
  
  // frammer-motion custom animation
  // Generic fade-in animation
  export const fadeIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  // Zoom-in animation
  export const zoomIn = (delay, duration) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "tween",
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  // Slide-in animation general
  export const slideIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  // Staggered container animation
  export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerChildren,
          delayChildren: delayChildren || 0,
        },
      },
    };
  };

  // Slide-in animation from corner 
export const slideInFromCorner = (delay = 0, duration = 0.5, initX = 100, initY = -100, x = 0, y = 0, opacity = 1) => {
    return {
        hidden: { x: initX, y: initY, opacity: 0 },
        show: {
            x: x,
            y: y,
            opacity: opacity,
            transition: {
                delay: delay,
                duration: duration,
            },
        },
    };
};

// Slide-in animation from side
export const slideInFromSide = (direction = 'right', delay = 0, duration = 0.5, x = 0, y = 0, initPos = 100, opacity = 1) => {
    return {
        hidden: { x: direction === 'left' ? initPos : direction === 'right' ? -initPos : 0, y: direction === 'up' ? initPos : direction === 'down' ? -initPos : 0, opacity: 0 },
        show: {
            x: x,
            y: y,
            opacity: opacity,
            transition: {
                delay: delay,
                duration: duration,
            },
        },
    };
}

// drop from top and bounce multiple times at the bottom animation
export const dropAndBounce = (delay = 0, duration = 1.5, initX = 0, initY = 1000, x = 0, y = 0, opacity = 1) => {
    return {
        hidden: { y: -initY, x: initX, opacity: 0 },
        show: {
            y: y,
            x: x,
            opacity: opacity,
            transition: {
                delay: delay,
                duration: duration,
                type: 'spring',
                damping: 5,
                stiffness: 100,
            },
        },
    };
}

// float based on it original position animation
export const float = (delay = 0, duration = 1.5, initX = 0, initY = 0, x = 0, y = 0, opacity = 1) => {
    return {
        hidden: { y: initY, x: initX, opacity: 0 },
        show: {
            y: y,
            x: x,
            opacity: opacity,
            transition: {
                delay: delay,
                duration: duration,
                type: 'spring',
                damping: 5,
                stiffness: 100,
            },
        },
    };
}