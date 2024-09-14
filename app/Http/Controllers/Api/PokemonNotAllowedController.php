<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PokemonNotAllowedController extends Controller
{
	protected function NotAllowed(){
		return response()->json(['status' => 403,'message' => 'Not allowed'], 403);
	}

    public function index(Request $request){
		return $this->NotAllowed();
	}

	public function store(Request $request){
		return $this->NotAllowed();
	}

	public function show($id){
		return $this->NotAllowed();
	}

	public function destroy(Request $request){
		return $this->NotAllowed();
	}

	public function updatePartial(Request $request, $id){
		return $this->NotAllowed();
	}
}
