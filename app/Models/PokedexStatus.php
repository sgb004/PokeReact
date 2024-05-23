<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PokedexStatus extends Model
{
    use HasFactory;

	protected $table = 'pokedex_status';

	protected $fillable = [
		'status',
		'count',
	];

	private static function createStatus($status = '', $count = 0){
		$pokedexStatus = PokedexStatus::find(1);

		if (!$pokedexStatus) {
			$pokedexStatus = PokedexStatus::create([
				'id' => 1,
				'status' => $status,
				'count' => $count
			]);
		}

		return $pokedexStatus;
	}

	public static function updateStatus($status, $count){
		$pokedexStatus = PokedexStatus::createStatus($status, $count);
		$pokedexStatus->status = $status;
		$pokedexStatus->count = $count;
		$pokedexStatus->save();
	}

	public static function getStatus(){
		$pokedexStatus = PokedexStatus::createStatus();

		return [
			"status" => $pokedexStatus->status,
			"count" => $pokedexStatus->count
		];
	}
}
