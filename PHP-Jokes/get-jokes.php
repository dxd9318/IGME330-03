<?php	
	// $jokes contains our data
	// this is an indexed array of associative arrays
	// the associative arrays are jokes -  they have an 'q' key and an 'a' key
	$jokes = [
		["q"=>"What do you call a very small valentine?","a"=>"A valen-tiny!"],
		["q"=>"What did the dog say when he rubbed his tail on the sandpaper?","a"=>"Ruff, Ruff!"],
		["q"=>"Why don't sharks like to eat clowns?","a"=>"Because they taste funny!"],
        ["q"=>"What did the fish say when be bumped his head?","a"=>"Dam!"],
        ["q"=>"What happens when you tickle an Easter egg?", "a"=>"It cracks up!"],
        ["q"=>"Why shouldn't you tease egg whites?", "a"=>"They can't take a yolk!"],
        ["q"=>"Why did the ice cream van break down?", "a"=>"There was a rocky road!"],
        ["q"=>"What kind of ice cream do electricians eat?", "a"=>"Shockalot!"],
        ["q"=>"Why do we put candles on the top of birthday cakes?", "a"=>"Because it's too hard to put them on the bottom"],
        ["q"=>"What did the teddy bear say after blowing out his birthday candles?", "a"=>"No cake for me, I'm stuffed!"]
	];

    // json_encode() turns an associative array into a string of well-formed JSON
    // https://www.php.net/manual/en/function.json-encode.php
    
    //$randomJoke = $jokes[$randomKey];
    //$string = json_encode($randomJoke);
    //$string = json_encode($jokes);
    
    $numJokes = 3; // hard-code the number for now
    $randomKeys = array_rand($jokes, $numJokes);
    $randomJokes = []; // empty array

    for($i = 0; $i < $numJokes; $i++){
        array_push($randomJokes, $jokes[$randomKeys[$i]]);
    }

    $string = json_encode($randomJokes);


    // Send HTTP headers
    // https://www.php.net/manual/en/function.header.php
    // DO THIS **BEFORE** you `echo()` the content!
    header('content-type:application/json');      // tell the requestor that this is JSON
    header("Access-Control-Allow-Origin: *");     // turn on CORS
    header("X-this-330-service-is-kinda-lame: true");   // a custom header - by convention they begin with 'X'

    echo $string;

?>