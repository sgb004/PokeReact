<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokedexController;

Route::get('/', function () {
    return view('home');
});

Route::get('/pokedex/store-pokedex', [PokedexController::class, 'storePokedex']);

