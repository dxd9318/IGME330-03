<?php
   // In PHP 5, these run as follows
   $foo = "1";  				// $foo is string (ASCII 49)
   $foo *= 2;   				// $foo is now an integer (2)
   $foo = $foo * 1.3;  // $foo is now a float (2.6)
   $foo = 5 * "10 Little Piggies"; 	// $foo is integer (50) *
   $foo = 5 * "Small Pigs = 10";     	// $foo is integer (0)	**
   echo $foo;
   

// * In PHP 7, this currently gives an error: "A non well formed numeric value encountered"
   
// ** In PHP 7, this currently gives an error: "A non-numeric value encountered"	
?>