<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pokedex;
use Illuminate\Http\Request;

class PokedexController extends Controller
{
    public function index(){
		$data = Pokedex::paginate(30);

		return response()->json($data, 200);
	}
}
