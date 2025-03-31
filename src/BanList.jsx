import React from 'react';

function BanList({ banList, handleUnban }) {
  return (
    <div className="ban-list-box">
      <h3>Banned List ({banList.length})</h3>
      <p className="ban-list-description">Click an attribute in your listing to ban it</p>
      <p className="ban-list-description">Click an item from Banned List to unban</p>
      {banList.length > 0 ? (
        <div className="ban-list-items">
          {banList.map((item) => (
            <div
              key={item}
              className="ban-item"
              onClick={() => handleUnban(item)}
            >
              <span>❌</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bans">No banned items yet</p>
      )}
    </div>
  );
}

export default BanList;

