import React from 'react';

function ClassificationResult({text}){
  const tags = text.split(',').map(item => item.trim());
  return (
    <div className={"row"}>
      <div className={"col-md-12 text-center"}>
        {tags.map((tag, idx) => <span key={idx} className="mr-3 badge badge-info">{tag}</span>)}
      </div>
    </div>
  );
}

export default ClassificationResult
