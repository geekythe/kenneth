for the animationa type you can also use this 
const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      zIndex: 1,
    }),
    center: {
      y: 0,
      zIndex: 2,
      transition: {
        y: {
          type: "spring",
          stiffness: 50,
          damping: 20,
          duration: 1,
        },
      },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      zIndex: 0,
      transition: {
        y: {
          type: "spring",
          stiffness: 50,
          damping: 20,
          duration: 1,
        },
      },
    }),
  }
