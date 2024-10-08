import { Pokemon } from "../types";
import { useEffect, useState } from "react";
import { getPokemonList } from "../services/pokeApi";

function HomePage() {
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const MAX_OFFSET = 1400;

	// Function to fetch Pokémon with pagination
	useEffect(() => {
		const fetchPokemon = async () => {
			if (offset >= MAX_OFFSET) return;

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
				if (offset + 20 <= MAX_OFFSET) {
					setOffset((prevOffset) => prevOffset + 20);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		// <div>
		// 	<h1>HomePage</h1>
		// 	<ol style={{}}>
		// 		{pokemonList.map((pokemon, index) => (
		// 			<li key={index}>
		// 				<p>{pokemon.name}</p>
		// 				<p>{pokemon.url}</p>
		// 				<img
		// 					src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
		// 					alt="pokemon image"
		// 					height={30}
		// 				/>
		// 			</li>
		// 		))}
		// 	</ol>
		// 	{loading && <p>Loading more Pokémon...</p>}
		// </div>
		<div className="p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">
				Pokémon List
			</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{pokemonList.map((pokemon, index) => (
					<div
						key={index}
						className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
					>
						<img
							src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
							alt="pokemon image"
							className="w-full h-32 object-contain mb-4"
						/>
						<h2 className="text-xl font-semibold text-center capitalize">
							{pokemon.name}
						</h2>
					</div>
				))}
			</div>
			{loading && (
				<p className="text-center mt-4">Loading more Pokémon...</p>
			)}
		</div>
	);
}

export default HomePage;
