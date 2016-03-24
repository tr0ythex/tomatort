<?php
  require("sendgrid-php/sendgrid-php.php");
  
  // get data from form and decode it
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
  // set vars from form fields
  $firstName = $request->firstName;
  $lastName = $request->lastName;
  $email = $request->email;
  $tel = $request->tel;
  $address = $request->address;
  $comment = $request->comment;
  
  // make html body of message
  $html = "<h1>Поступил новый заказ</h1>";
  $html .= "<h2>Информация о заказчике</h2>";
  $html .= "Имя: " . $firstName . "<br>";
  $html .= "Фамилия: " . $lastName . "<br>";
  $html .= "E-mail: " . $email . "<br>";
  $html .= "Телефон: " . $tel . "<br>";
  $html .= "<h2>Информация о доставке</h2>";
  $html .= "Адрес: " . $address . "<br>";
  $html .= "Комментарий: " . $comment . "<br>";
  
  // set headers
  $to = "tr0ythex@gmail.com";
  $from = "info@tomatort.ru";
  $subject = "Новый заказ";
  
  // create sendgrid object with api key
  $sendgrid = new SendGrid
    ('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');
  
  // make a sendgrid email message with all previous data
  $email = new SendGrid\Email();
  $email
    ->addTo($to)
    ->setFrom($from)
    ->setSubject($subject)
    ->setHtml($html);
    
  // send email
  $sendgrid->send($email);
?>