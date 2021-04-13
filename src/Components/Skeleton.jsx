import React from 'react';
import "../styles/Skeleton.css"

const Skeleton = ({sktype}) => {
  return (
    <div className={`skeleton-wrapper ${sktype}`}>
      <div className="shimmer-wrapper">
         <div className="shimmer"></div>
      </div>
    </div>
  )
}

export default Skeleton;