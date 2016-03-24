<?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
  $firstName = $request->firstName;
  $lastName = $request->lastName;
  
  echo $firstName . " : " . $lastName;
?>