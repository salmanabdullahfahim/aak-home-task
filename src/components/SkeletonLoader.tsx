import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse flex space-x-5 h-72 justify-center items-end">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 rounded w-16"
          style={{
            height: `${Math.random() * 100 + 180}px`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
