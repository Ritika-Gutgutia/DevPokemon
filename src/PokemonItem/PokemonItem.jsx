/* eslint-disable react/prop-types */
import "./PokemonItem.css";

const PokemonItem = ({ data }) => {
  return (
    <div className="item">
      <img
        className="item__img"
        src={data.sprites.other.dream_world.front_default}
        alt={data.name}
      />
      <div className="item__type">
        <p> {data.types.map((currData) => currData.type.name).join(", ")}</p>
      </div>
      <div className="item__info">
        <div className="item__info__row">
          <p>
            <span>Height : </span> {data.height}
          </p>
          <p>
            <span>Weight : </span> {data.weight}
          </p>
          <p>
            <span>Speed : </span> {data.stats[5].base_stat}
          </p>
        </div>
        <div className="item__info__row">
          <p>
            <span> Experience : </span>
            <>{data.base_experience}</>
          </p>
          <p>
            <span> Attack : </span>
            <> {data.stats[1].base_stat}</>
          </p>{" "}
          <p>
            <span>Ability : </span>
            <>{data.abilities[0].ability.name}</>
          </p>
        </div>
      </div>
      <p className="item__name"> {data.name}</p>
    </div>
  );
};

export default PokemonItem;
