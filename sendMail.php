<?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
  $firstName = $request->firstName;
  $lastName = $request->lastName;
  $email = $request->email;
  $tel = $request->tel;
  $address = $request->address;
  $comment = $request->comment;
  $deliveryType = $request->deliveryType;
  
  $msg_body = "Новый заказ\n\n";
  
  $msg_body .= "Информация о заказчике\n";
  $msg_body .= "Имя: " . $firstName . "\n";
  $msg_body .= "Фамилия: " . $lastName . "\n";
  $msg_body .= "E-mail: " . $email . "\n";
  $msg_body .= "Телефон: " . $tel . "\n";
  
  $msg_body .= "Информация о доставке\n";
  $msg_body .= "Адрес: " . $address . "\n";
  $msg_body .= "Комментарий: " . $comment . "\n";
  $msg_body .= "Способ доставки: " . $deliveryType . "\n";
  
  // echo $msg_body;
  
  // message
  $to = "tr0ythex@gmail.com";
  $subject = "Новый заказ";
  $headers = "From: info@tomatort.ru";
 
  mail($to, $subject, $msg_body, $headers);
?>