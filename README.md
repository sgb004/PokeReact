# PokéReact a Pokédex made in React

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://pokereact.sgb004.com)
[![Author](https://img.shields.io/badge/author-sgb004-green.svg)](https://sgb004.com)

This app was created for learning purposes, not for profit.

The app is a Pokédex where you can add, edit and delete Pokémon in your own Pokédex, you can search Pokémon in a copy of the Pokédex of [https://pokeapi.co](https://pokeapi.co).
The images of the Pokémon are taken from [https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/](https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/).

## Demo

[https://pokereact.sgb004.com](https://pokereact.sgb004.com)

### Desktop

[![Screenshot](https://pokereact.sgb004.com/images/pokereact-desktop.png)](https://www.youtube.com/watch?v=EHav6BBubWQ)

### Mobile

[![Screenshot](https://pokereact.sgb004.com/images/pokereact-mobile.png)](https://studio.youtube.com/video/1bmY-H_mSTI/edit)

## Features

-   Add Pokémon to your Pokédex
-   Edit Pokémon in your Pokédex:
    -   Change the name
    -   Change the Combat Power,
    -   Change the Attack
    -   Change the Defense
    -   Change the HP
    -   Set as a favorite
-   Delete Pokémon in your Pokédex
-   Search Pokémon

## Installation

This app can be use with Sail or with a PHP server.

The minimum requirements are:

-   PHP 8.2
-   MySQL 8.4.0 or MariaDB 10.6.18
-   Node.js 18.3.0
-   npm 8.11.0

It is possible that the app works with other higher versions, but it is not guaranteed.

Download or clone this repository.

Copy the `.env.example` to `.env`

```
cp .env.example .env
```

Configure the `.env` file with your database connections details.

If you want that the Pokémon you add to your Pokédex to be saved in the MySQL database, you need to set the `USE_MY_POKEMON_INDEXEDDB` to `false`. Otherwise, thew Pokémon will be saved in the browser storage where you visit the app.

After that you configure the `.env` file run the next command if you have Docker:

```
sail up
```

If you use a PHP server run:

```
php composer install
```

After run:

```
php artisan key:generate
```

After a few seconds run:

```
npm run build
```

After run to create the database:

```
php artisan migrate
```

And finally you need to load the Api Pokémon into the database, so run:

```
sail artisan queue:work
```

or if you are using a PHP server:

```
php artisan queue:work
```

The last command will load the Pokémon in the database, only is necessary to execute it once.

Open the app in your browser.

Enjoy! :D

## Aditional information

If you want the debug and you want to expose the vite server, you can set the environment variable `VITE_APP_HOST` with the ip of your server.

## To do

-   Connect an AI so that when passing an image of a Pokémon through the Pokédex camera, it can identify and return the Pokémon from the image.

## Disclaimer

This app is not affiliated with Nintendo, or any of the other companies or organizations involved in the development of the Pokémon games.

The Pokémon logos and related marks are trademarks or registered trademarks of Nintendo in the United States and other countries.

This app is not intended to be used for any illegal or unauthorized purpose.

By using this app, you agree to the terms of service and privacy policy of the Pokémon API.

The React name and logo are trademarks of Facebook, Inc.

This app was created for learning purposes, not for profit.

Any misuse will be the responsibility of the person who improperly used this app.

Yo are free to copy the code, modify it, and use it in any way you want, as long as you include the original copyright and license notice.

## License

[MIT](LICENSE)
