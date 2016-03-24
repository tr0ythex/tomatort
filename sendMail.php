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
  $deliveryType = $request->deliveryType;
  $cartData = $request->cartData;
  
  // make html body of message
  $html = "<h2>Информация о заказчике</h2>";
  $html .= "<strong>Имя: </strong>" . $firstName . "<br>";
  $html .= "<strong>Фамилия: </strong>" . $lastName . "<br>";
  $html .= "<strong>E-mail: </strong>" . $email . "<br>";
  $html .= "<strong>Телефон: </strong>" . $tel . "<br>";
  $html .= "<h2>Информация о доставке</h2>";
  $html .= "<strong>Адрес: </strong>" . $address . "<br>";
  $html .= "<strong>Комментарий: </strong>" . $comment . "<br>";
  $html .= "<strong>Способ доставки: </strong>" . $deliveryType . "<br>";
  
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