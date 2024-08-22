import { PokemonListResponse } from "../types/index";

export async function getPokemonList(
	limit: number = 20,
	offset: number = 0
): Promise<PokemonListResponse> {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
	);
	if (!response.ok) {
		throw new Error("Failed to fetch Pokémon list");
	}
	const data: PokemonListResponse = await response.json();
	return data;
}
