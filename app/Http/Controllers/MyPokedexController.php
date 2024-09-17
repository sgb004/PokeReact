<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;

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
}
