<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pokedex;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PokemonController extends Controller
{
    public function index(Request $request){
		$filters = [
			'number' => 'api_id', 
			'name' => 'name', 
			'cp' => 'cp', 
			'attack' => 'attack', 
			'defense' => 'defense', 
			'hp' => 'hp', 
			'favorite' => 'favorite'
		];
		$filter = $request->get('filter', 'number');
		$filter = $filters[$filter] ?? 'api_id';

		$sorts = ['asc' => 'asc', 'desc' => 'desc'];
		$sort = $request->get('sort', 'asc');
		$sort = $sorts[$sort] ?? 'asc';

		$search = trim($request->get('search', ''));

		$data = Pokemon::when($search, function($query) use ($search){
			return $query->where('name', 'like', $search . '%');
		})
		->orderBy($filter, $sort)
		->paginate(30)
		->appends([
			'filter' => $filter == 'api_id' ? 'number' : 'name',
			'sort' => $sort,
			'search' => $search
		]);

		return response()->json($data, 200);
	}

	public function store(Request $request){

		$validator = Validator::make($request->all(), [
			'pokemon' => 'required|array',
			'pokemon.*' => 'required|numeric|exists:pokedex,api_id'
		]);

		$result = [];

		if($validator->fails()){
			$result = [
				'status' => 400,
				'errors' => $validator->errors()
			];
		}else{
			$isOk = true;
			$pokemonFromPokedex = Pokedex::whereIn('api_id', $request->pokemon)->get();

			foreach($pokemonFromPokedex as $pokemon){
				$isOk = Pokemon::create([
					'name' => $pokemon->name,
					'api_id' => $pokemon->api_id,
					"cp" => 0,
					"attack" => 0,
					"defense" => 0,
					"hp" => 0,
					"favorite" => false
				]);

				if(!$isOk){
					$result = [
						'status' => 500
					];
					break;
				}
			}

			if($isOk){
				$result = [
					'status' => 200,
					'message' => 'Pokemon added successfully'
				];
			}
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

	public function destroy(Request $request){
		$validator = Validator::make($request->all(), [
			'pokemon' => 'required|array',
			'pokemon.*' => 'required|numeric'
		]);

		$result = [];

		if($validator->fails()){
			$result = [
				'status' => 400,
				'errors' => $validator->errors()
			];
		}else{
			Pokemon::whereIn('id', $request->pokemon)->delete();

			$result = [
				'status' => 200,
				'message' => 'Pokemon deleted successfully'
			];
		}

		return response()->json($result, $result['status']);
	}

	public function updatePartial(Request $request, $id){
		$pokemon = Pokemon::find($id);

		$result = [];

		if(!$pokemon){
			$result = ['status' => 404];
		}else{
			$rules = [
				'name' => 'required|string',
				'cp' => 'required|numeric|min:0|max:4724',
				'attack' => 'required|numeric|min:0|max:15',
				'defense' => 'required|numeric|min:0|max:15',
				'hp' => 'required|numeric|min:0|max:15',
				'favorite' => 'required|boolean'
			];
			$data = [];

			foreach($rules as $key => $rule){
				if($request->has($key)){
					$data[$key] = $request->$key;
				}else{
					unset($rules[$key]);
				}
			}

			$validator = Validator::make($request->all(), $rules);

			if($validator->fails()){
				$result = [
					'status' => 400,
					'errors' => $validator->errors()
				];
			}else{
				$pokemon->update($data);
			
				$result = [
					'status' => 200,
					'pokemon' => $pokemon
				];
			}
		}

		return response()->json($result, $result['status']);
	}
}
