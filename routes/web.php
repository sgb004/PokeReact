<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokedexController;

Route::get('/', function () {
    return view('home');
});

Route::get('/pokedex/download-from-api', [PokedexController::class, 'downloadFromApi']);
