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
  
  /* make html body of message */
  // form order table
  $table = "
    <table border='1'>
      <thead>
        <tr>
          <th>Название</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Упаковка</th>
        </tr>
      </thead>
      <tbody>";
  foreach ($cartData as $item) {
    $set = $item->set ? $item->set . ' шт' : 'кг';
    $row = "
        <tr>
          <td>{$item->name}</td>
          <td>{$item->price}</td>
          <td>{$item->count}</td>
          <td>{$set}</td>
        </tr>";
    $table .= $row;
  }
  $table .= "
      </tbody>
    </table>";
    
  $html = "<h2>Заказ</h2>";
  $html .= $table;
    
  $html .= "<h2>Информация о заказчике</h2>";
  $html .= "<strong>Имя: </strong>" . $firstName . "<br>";
  $html .= "<strong>Фамилия: </strong>" . $lastName . "<br>";
  $html .= "<strong>E-mail: </strong>" . $email . "<br>";
  $html .= "<strong>Телефон: </strong>" . $tel . "<br>";
  
  $html .= "<h2>Информация о доставке</h2>";
  $html .= "<strong>Адрес: </strong>" . $address . "<br>";
  $html .= "<strong>Комментарий: </strong>" . $comment . "<br>";
  $html .= "<strong>Способ доставки: </strong>" . $deliveryType . "<br>";
  
  // set headers
  $admin_email = "scytherclaw@gmail.com";
  $customer_email = $email;
  $subject = "Новый заказ";
  $headers = "From: order@tomatort.ru";
 
  // send email to admin
  mail($admin_email, $subject, $html, $headers);
  
  // make a sendgrid email to customer
  // $html = "<h2>Ваш заказ</h2>";
  // $html .= $table;
  // $html .= "<p>Заказ был успешно отправлен. Скоро с Вами свяжется менеджер для
  //   уточнения заказа</p>";
  
  // // send email to customer
  // mail($customer_email, $subject, $html, $headers);
?>