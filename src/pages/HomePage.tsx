import { Pokemon } from "../types";
import { useEffect, useState } from "react";
import { getPokemonList } from "../services/pokeApi";

function HomePage() {
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

	// Function to fetch Pokémon with pagination
	useEffect(() => {
		const fetchPokemon = async () => {
			setLoading(true);
			try {
				const data = await getPokemonList(20, offset);
				setPokemonList((prev) => [...prev, ...data.results]);
			} catch (error) {
				console.error("Error fetching Pokémon: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPokemon();
	}, [offset]);

	// Scroll event listener to load more Pokémon
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
				document.documentElement.offsetHeight - 100
			) {
				setOffset((prevOffset) => prevOffset + 20);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div>
			<h1>HomePage</h1>
			<ol
				style={{
					lineHeight: "32px",
				}}
			>
				{pokemonList.map((pokemon, index) => (
					<li key={index}>
						<p>{pokemon.name}</p>
						<p>{pokemon.url}</p>
						<img
							src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
							alt="pokemon image"
							height={300}
						/>
					</li>
				))}
			</ol>
			{loading && <p>Loading more Pokémon...</p>}
		</div>
	);
}

export default HomePage;
