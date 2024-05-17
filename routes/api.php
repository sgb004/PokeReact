<?php

use App\Http\Controllers\Api\PokemonController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/pokemon', [PokemonController::class, 'index']);

Route::get('/pokemon/{id}', [PokemonController::class, 'show']);

Route::post('/pokemon', [PokemonController::class, 'store']);

Route::patch('/pokemon/{id}', [PokemonController::class, 'updatePartial']);

Route::delete('/pokemon/{id}', [PokemonController::class, 'destroy']);

