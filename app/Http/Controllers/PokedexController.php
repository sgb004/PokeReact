<?php

namespace App\Http\Controllers;

use App\Jobs\StorePokedex;
use App\Models\Pokedex;
use App\Models\PokedexStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PokedexController extends Controller
{
    public function storePokedex(){
		$pokedexStatus = PokedexStatus::getStatus();
		$status = $pokedexStatus['status'];
		$count = DB::table('pokedex')->count();
		$percentageCompleted = 0;

		if($status != 'running' && ($count < $pokedexStatus['count'] || $pokedexStatus['count'] == 0 )){
			$status = "running";
			$pokedexStatus = PokedexStatus::updateStatus($status, $pokedexStatus['count']);
			StorePokedex::dispatch();
		}else if($pokedexStatus['count'] > 0){
			$percentageCompleted = ($count / $pokedexStatus['count']) * 100;
		}

		$result = [
			'status' => $status,
			'percentage_completed' => $percentageCompleted
		];

		return response()->json($result, 200);
	}
}
