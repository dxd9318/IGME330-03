<?PHP
  // string values may be single or double quoted
  $name = 'Fred';
  $name = "Fred";
   
  // strings may be concatenated with a dot (period)
  $greeting1 = "<p>My name is " . $name . "</p>";
   
  // string variables WILL be interpolated in a double-quoted string
  $greeting2 = "<p>My name is $name</p>";
   
  // string variables WILL NOT interpolate in a single-quoted string
  $greeting3 = '<p>My name is $name</p>';
  
  echo($greeting1); // My name is Fred
  echo($greeting2); // My name is Fred
  echo($greeting3); // My name is $name
?>