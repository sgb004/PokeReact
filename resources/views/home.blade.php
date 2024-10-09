<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>PokéReact a Pokédex made in React</title>

	<link rel="icon" href="favicon.svg" type="image/svg+xml">

	@viteReactRefresh
	@vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>

<body class="overflow-hidden transition-colors duration-200">
	<div id="app" class="font-work-sans font-normal"></div>

	<script>
		window["appUseIndexedDB"] = {{ env('USE_MY_POKEMON_INDEXEDDB') === true ? 'true' : 'false' }};
	</script>
</body>

</html>
