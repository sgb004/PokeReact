<?php

namespace App\Jobs;

use Exception;
use App\Models\Pokedex;
use App\Models\PokedexStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

		if(!$isOk){
			PokedexStatus::updateStatus("error", 0);

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

			PokedexStatus::updateStatus("running", $data['count']);

			foreach($data['results'] as $pokemon){
				$this->storePokemon($pokemon);
			}

			if($data['next']){
				return $this->storePokedexFromApi($data['next']);
			}else{
				PokedexStatus::updateStatus("finished", $data['count']);
				return true;
			}
		}else{
			print_r("NO SE PUDO CONECTAR A LA API");

			return false;
		}
	}
}
