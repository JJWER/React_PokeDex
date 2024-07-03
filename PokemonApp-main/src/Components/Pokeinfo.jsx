import React from "react";

const Pokeinfo = ({ data }) => {
    return (
        <>
            {data ? (
                <>
                    <div className="info-container">
                        <h1>{data.name}</h1>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                            alt={data.name}
                        />
                        <div className="abilities">
                            {data.abilities.map((poke) => (
                                <div className="group" key={poke.ability.name}>
                                    <h2>{poke.ability.name}</h2>
                                </div>
                            ))}
                        </div>
                        <div className="base-stat">
                            {data.stats.map((poke) => (
                                <div key={poke.stat.name}>
                                    <h3>{poke.stat.name}: {poke.base_stat}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <h1>No Pokemon selected</h1>
            )}
        </>
    );
};

export default Pokeinfo;
