<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MyPokedexController extends Controller
{
    public function download(){
		$data = Pokemon::all();
		return response()->json($data, 200)->withHeaders([
			'Content-Type' => 'application/json',
			'Content-Encoding' => 'UTF-8',
			'Content-Length' => strlen(json_encode($data)),
			'Cache-Control' => 'no-cache',
			'Content-Disposition' => 'attachment; filename="pokedex.json"'
		]);
	}

	public function upload(Request $request){
		$deleteCurrentPokemon = $request->get("deleteCurrentPokemon", false);
		$data = $request->get("pokemon", "[]");
		$data = json_decode($data, true);

		$result = [];

		if(gettype($data) == "array"){
			$validator = Validator::make($data, [
				'*.api_id' => 'required|numeric|exists:pokedex,api_id',
				'*.name' => 'required|string',
				'*.cp' => 'required|numeric|min:0|max:4724',
				'*.attack' => 'required|numeric|min:0|max:15',
				'*.defense' => 'required|numeric|min:0|max:15',
				'*.hp' => 'required|numeric|min:0|max:15',
				'*.favorite' => 'required|boolean',
				'*.created_at' => 'required|date',
				'*.updated_at' => 'required|date'
			]);

			if($validator->fails()){
				$result = [
					'status' => 400,
					'errors' => $validator->errors()
				];
			}else{
				if($deleteCurrentPokemon){
					Pokemon::truncate();
				}

				foreach($data as $pokemon){
					$pokemonSaved = Pokemon::create([
						'name' => $pokemon['name'],
						'api_id' => $pokemon['api_id'],
						"cp" => $pokemon['cp'],
						"attack" => $pokemon['attack'],
						"defense" => $pokemon['defense'],
						"hp" => $pokemon['hp'],
						"favorite" => $pokemon['favorite']
					]);;

					if(!$pokemonSaved){
						$result = [
							'status' => 500,
						];
						break;
					}else{
						$pokemonSaved->created_at = date("Y-m-d H:i:s", strtotime($pokemon['created_at']));
						$pokemonSaved->updated_at = date("Y-m-d H:i:s", strtotime($pokemon['updated_at']));
						$pokemonSaved->save();
					}
				}

				$result = [
					'status' => 200,
					'message' => 'Pokemon uploaded successfully'
				];
			}
		}else{
			$result = [
				'status' => 400,
				'message' => 'The data must be a valid JSON array'
			];
		}

		return response()->json($result, $result['status']);
	}

	public function getToken(Request $request){
		$token = $request->session()->token();

		return response()->json(['token' => $token], 200);
	}
}
