<?php

namespace App\Http\Controllers;

use App\Jobs\StorePokedex;
use App\Models\Pokedex;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PokedexController extends Controller
{
    public function storePokedex(){

		/*
		$response = Http::get('https://pokeapi.co/api/v2/pokemon/?limit=1&offset=0');

		$result = ['percentage_completed' => -1];

		if($response->successful()){
			$data = $response->json();

			$count = DB::table('pokedex')->count();
			
			$percentageCompleted = ($count / $data['count']) * 100;

			$result['percentage_completed'] = $percentageCompleted;
		}
		*/

		//StorePokedex::dispatch();

		$POKEDEX_COUNT = 1302;

		$count = DB::table('pokedex')->count();
			
		$percentageCompleted = ($count / $POKEDEX_COUNT) * 100;

		$result['percentage_completed'] = $percentageCompleted;

		return response()->json($result, 200);
	}
}
