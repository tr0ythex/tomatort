<?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
  $firstName = $request->firstName;
  $lastName = $request->lastName;
  $email = $request->email;
  $tel = $request->tel;
  $address = $request->address;
  $comment = $request->comment;
  
  $output = "Новый заказ\n\n";
  
  $output .= "Информация о заказчике\n";
  $output .= "Имя: " . $firstName . "\n";
  $output .= "Фамилия: " . $lastName . "\n";
  $output .= "E-mail: " . $email . "\n";
  $output .= "Телефон: " . $tel . "\n";
  
  $output .= "Информация о доставке\n";
  $output .= "Адрес: " . $address . "\n";
  $output .= "Комментарий: " . $comment . "\n";
  
  echo $output;
?>