import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main = () => { 
    const [pokeData, setPokeData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/"); 
    const [nextUrl, setNextUrl] = useState(); 
    const [prevUrl, setPrevUrl] = useState(); 
    const [pokeDex, setPokeDex] = useState(); // state สำหรับเก็บข้อมูล Pokemon ที่ถูกเลือกและฟังก์ชันในการอัปเดต state

    // Function to fetch Pokémon data
    const fetchPokemonData = async (url) => { 
        setLoading(true); 
        const res = await axios.get(url); // เรียกใช้ Axios เพื่อเรียก API โดยใช้ URL ที่ได้รับเป็นพารามิเตอร์และเก็บผลลัพธ์ไว้ในตัวแปร res
        setNextUrl(res.data.next); // อัปเดต state nextUrl ด้วย URL ของหน้าถัดไปที่ได้จากข้อมูล API
        setPrevUrl(res.data.previous); // อัปเดต state prevUrl ด้วย URL ของหน้าก่อนหน้าที่ได้จากข้อมูล API
        await getPokemonDetails(res.data.results);
        setLoading(false);
    };


    // Function to get details of each Pokémon
    const getPokemonDetails = async (pokemonList) => {
        const pokemonDetails = await Promise.all(
            pokemonList.map(async (pokemon) => {
                const response = await axios.get(pokemon.url);
                return response.data;
            })
        );
        // Sort Pokémon by ID
        pokemonDetails.sort((a, b) => a.id - b.id);
        setPokeData(pokemonDetails);
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchPokemonData(url);
    }, [url]);

    // Function to handle next and previous buttons
    const handleNextPrevClick = (newUrl) => {
        setPokeData([]);
        setUrl(newUrl);
    };

    return (
        <div className="container">
            <div className="left-content">
                <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

                <div className="btn-group">
                    {prevUrl && (
                        <button onClick={() => handleNextPrevClick(prevUrl)}>Previous</button>
                    )}
                    {nextUrl && <button onClick={() => handleNextPrevClick(nextUrl)}>Next</button>}
                </div>
            </div>
            <div className="right-content">
                <Pokeinfo data={pokeDex} />
            </div>
        </div>
    );
};

export default Main;