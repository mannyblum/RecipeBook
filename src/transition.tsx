import { motion } from "framer-motion";

const transition = (OgComponent: React.FC) => {
  return () => (
    <>
      <OgComponent />
      <motion.div
        className="slide-in fixed top-0 left-0 w-screen bg-gray-800 origin-top-right h-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out fixed top-0 left-0 w-screen bg-gray-800 origin-top-right h-full"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default transition;
