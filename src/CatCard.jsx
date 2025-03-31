import React from 'react';

function CatCard({ cat, addToBanList }) {
  const breed = cat.breeds[0];

  return (
    <div className="cat-card">
      {/* Cat Name */}
      <h2>{breed.name}</h2>

      {/* Clickable Details */}
      <p className="content-button-container" onClick={() => addToBanList(breed.name)}>
        {breed.name}
      </p>
      <p className="content-button-container" onClick={() => addToBanList(breed.origin)}>
        {breed.origin}
      </p>
      <p className="content-button-container" onClick={() => addToBanList(breed.weight.metric)}>
        {breed.weight.metric} kg
      </p>
      <p className="content-button-container" onClick={() => addToBanList(breed.life_span)}>
        {breed.life_span} years
      </p>
      {/* Cat Image */}
      <img src={cat.url} alt={breed.name} />

    </div>
  );
}

export default CatCard;