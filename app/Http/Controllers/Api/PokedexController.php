<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pokedex;
use Illuminate\Http\Request;

class PokedexController extends Controller
{
    public function index(Request $request){
		$filters = ['number' => 'api_id', 'name' => 'name'];
		$filter = $request->get('filter', 'number');
		$filter = $filters[$filter] ?? 'api_id';

		$sorts = ['asc' => 'asc', 'desc' => 'desc'];
		$sort = $request->get('sort', 'asc');
		$sort = $sorts[$sort] ?? 'asc';

		$search = trim($request->get('search', ''));

		$data = Pokedex::when($search, function ($query) use ($search) {
			return $query->where('name', 'like', $search . '%');
		})
		->orderBy($filter, $sort)
		->paginate(30)
		->appends([
			'filter' => $filter == 'api_id' ? 'number' : 'name',
			'sort' => $sort,
			'search' => $search,
		]);

		return response()->json($data, 200);
	}
}
