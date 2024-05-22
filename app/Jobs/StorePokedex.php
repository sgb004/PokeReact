<?php

namespace App\Jobs;

use Exception;
use App\Models\Pokedex;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class StorePokedex implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

	 /**
     * Execute the job.
     */
    public function handle(): void
    {
		$isOk = $this->storePokedexFromApi('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0');

		if($isOk){
			throw new Exception('Error on store pokedex');
		}
	}

	protected function cleanId($url){
		$id = str_replace('https://pokeapi.co/api/v2/pokemon/', '', $url);
		$id = str_replace('/', '', $id);
		return intval($id);
	}

	protected function storePokemon($pokemon){
		$apiId = $this->cleanId($pokemon['url']);
		$poke = Pokedex::where('api_id', $apiId)->first();

		if(!$poke){
			Pokedex::create([
				'api_id' => $apiId,
				'name' => $pokemon['name'],
			]);
		}
	}

	protected function storePokedexFromApi($url){
		$response = Http::get($url);

		if($response->successful()){
			$data = $response->json();

			foreach($data['results'] as $pokemon){
				$this->storePokemon($pokemon);
			}

			if($data['next']){
				return $this->storePokedexFromApi($data['next']);
			}else{
				return true;
			}
		}else{
			return false;
		}
	}
}
