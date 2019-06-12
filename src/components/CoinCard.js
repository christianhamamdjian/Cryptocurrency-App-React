import React from "../../node_modules/react";
// import PropTypes from "../../node_modules/prop-types";
import "../App.css";

const CoinCard = props => {
  const { name, price_usd, rank, percent_change_24h } = props || {};

  return (
    <div className="my-coin-card">
      <h4>{name}</h4>
      <p>Price: {price_usd}</p>
      <p>Rank: {rank}</p>
      <p>Change: {percent_change_24h}</p>
    </div>
  );
};

CoinCard.propTypes = {
  name: PropTypes.string.isRequired,
  Price: PropTypes.number.isRequired,
  Rank: PropTypes.number.isRequired,
  Change: PropTypes.number.isRequired
};

export default CoinCard;
