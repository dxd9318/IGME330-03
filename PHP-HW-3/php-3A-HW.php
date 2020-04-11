<?PHP
    $colors = ["red", "green", "blue"];

    $links = ["RIT"=>"http://www.rit.edu",
   	"RPI"=>"http://www.rpi.edu",
   	"MCC"=>"http://www.monroecc.edu"];
   
    // 1 - access elements by key 
    //$url = $links["RIT"];
    //echo "<p>$url</p>";
   
    // 2 - add new elements by specifying a key:value
    //$links["Brockport"]="https://www.brockport.edu";
   
    // 3 - loop through arrays with longer version of foreach loop

    echo "<ol>";
    foreach($colors as $key){
        echo "<li>$key</li>";
    }
    echo "</ol> <ul>";
    foreach($links as $key=>$value){
        echo "<li><a href=$value>$key</a></li>";
    }
    echo "</ul>";

?>