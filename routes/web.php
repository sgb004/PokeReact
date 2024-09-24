<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokedexController;
use App\Http\Controllers\MyPokedexController;

Route::get('/', function () {
    return view('home');
});

Route::get('/pokedex/store-pokedex', [PokedexController::class, 'storePokedex']);

if(env('USE_MY_POKEMON_INDEXEDDB') === false){
	Route::get('/my-pokedex/download', [MyPokedexController::class, 'download']);
	Route::post('/my-pokedex/upload', [MyPokedexController::class, 'upload']);
	Route::get('/my-pokedex/get-token', [MyPokedexController::class, 'getToken']);
}
