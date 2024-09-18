<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokedexController;
use App\Http\Controllers\MyPokedexController;

Route::get('/', function () {
    return view('home');
});

Route::get('/pokedex/store-pokedex', [PokedexController::class, 'storePokedex']);
Route::get('/my-pokedex/download', [MyPokedexController::class, 'download']);

