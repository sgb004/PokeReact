<?php

use App\Http\Controllers\Api\PokemonController;
use App\Http\Controllers\Api\PokedexController;
use App\Http\Controllers\Api\PokemonNotAllowedController;
use Illuminate\Support\Facades\Route;


$classToUSe = (env('USE_MY_POKEMON_INDEXEDDB') === true) ? PokemonNotAllowedController::class : PokemonController::class;

Route::get('/pokemon', [$classToUSe, 'index']);

Route::get('/pokemon/{id}', [$classToUSe, 'show']);

Route::post('/pokemon', [$classToUSe, 'store']);

Route::patch('/pokemon/{id}', [$classToUSe, 'updatePartial']);

Route::delete('/pokemon/', [$classToUSe, 'destroy']);

Route::get('/pokedex', [PokedexController::class, 'index']);

Route::post('/pokedex/validate_api_ids', [PokedexController::class, 'validateApiIds']);