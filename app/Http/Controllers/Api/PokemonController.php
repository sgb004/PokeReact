<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PokemonController extends Controller
{
    public function index(){
		$pokemon = Pokemon::all();

		$result = [
			'status' => 200,
			'data' => $pokemon
		];

		return response()->json($result, 200);
	}

	public function store(Request $request){
		$validator = Validator::make($request->all(), [
			'name' => 'required|max:255',
			'api_id' => 'required|unique:pokemon'
		]);

		$result = [];

		if($validator->fails()){
			$result = [
				'status' => 400,
				'errors' => $validator->errors()
			];
		}else{
			$pokemon = Pokemon::create([
				'name' => $request->name,
				'api_id' => $request->api_id,
				'nickname' => ''
			]);

			$result = !$pokemon ?
				[
					'status' => 500,
				] :
				[
					'status' => 200,
					'pokemon' => $pokemon
				];
		}

		return response()->json($result, $result['status']);
	}

	public function show($id){
		$pokemon = Pokemon::find($id);

		$result = !$pokemon ? 
			[
				'status' => 404
			]:
			[
				'status' => 200,
				'pokemon' => $pokemon
			];

		return response()->json($result, $result['status']);
	}

	public function destroy($id){
		$pokemon = Pokemon::find($id);

		$result = ['status' => 404];

		if($pokemon){
			$result = ['status' => 200];

			$pokemon->delete();
		}

		return response()->json($result, $result['status']);
	}

	public function updatePartial(Request $request, $id){
		$pokemon = Pokemon::find($id);

		$result = [];

		if(!$pokemon){
			$result = ['status' => 404];
		}else{
			if($request->has('nickname')){
				$pokemon->nickname = $request->nickname;

				$pokemon->save();
			}

			$result = [
				'status' => 200,
				'pokemon' => $pokemon
			];
		}

		return response()->json($result, $result['status']);
	}
}
