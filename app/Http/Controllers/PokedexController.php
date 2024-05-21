<?php

namespace App\Http\Controllers;

use App\Models\Pokedex;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokedexController extends Controller
{
    public function downloadFromApi(){
		$isOk = $this->storeDataFromApi('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0');

		$result = ['store_pokedex' => $isOk];

		return response()->json($result, 200);
	}

	protected function cleanId($url){
		$id = str_replace('https://pokeapi.co/api/v2/pokemon/', '', $url);
		$id = str_replace('/', '', $id);
		return intval($id);
	}

	protected function storePokemon($pokemon){
		$apiId = $this->cleanId($pokemon['url']);
		$poke = Pokedex::where('api_id', $apiId)->first();

		if(!$poke){
			Pokedex::create([
				'api_id' => $apiId,
				'name' => $pokemon['name'],
			]);
		}
	}

	protected function storeDataFromApi($url){
		$response = Http::get($url);

		if($response->successful()){
			$data = $response->json();

			foreach($data['results'] as $pokemon){
				$this->storePokemon($pokemon);
			}

			if($data['next']){
				$this->storeDataFromApi($data['next']);
			}else{
				return true;
			}
		}else{
			return false;
		}
	}
}
