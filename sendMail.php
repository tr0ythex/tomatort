<?php
  // get data from form and decode it
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
  // set vars from form fields
  $firstName = $request->firstName;
  $lastName = $request->lastName;
  $email = $request->email;
  $tel = $request->tel;
  $comment = $request->comment;
  $cartData = $request->cartData;
  $dreamDessert = $request->dreamDessert;
  
  // set email params
  $admin_email = "tomatort@yandex.ru";
  $customer_email = $email;
  $subject = "Новый заказ";
  // Для отправки HTML-письма должен быть установлен заголовок Content-type
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  $headers .= "From: Tomatort Info <info@tomatort.ru>";
  
  if ($dreamDessert) { // send email from dreamDessert page
    // send email to admin
    $subject = "Десерт мечты";
    
    $dd_content = "<strong>Основа: </strong>" . $dreamDessert->base ."<br>";
    $dd_content .= "<strong>Крем: </strong>" . $dreamDessert->cream->name ."<br>";
    $dd_content .= "<strong>Добавки: </strong>" . $dreamDessert->topping ."<br>";
    $dd_content .= "<strong>Дизайн:</strong><br>";
    foreach ($dreamDessert->design as $item) {
      if ($item->selected) {
        $dd_content .= $item->name . "<br>";
      }
    }
    $dd_content .= "<strong>Размер торта: </strong>" 
      . $dreamDessert->size . " кг<br>";
      
    $html = "<h2>Заказ десерта мечты</h2>";
    $html .= $dd_content;
    $html .= "<h2>Информация о заказчике</h2>";
    $html .= "<strong>Имя: </strong>" . $firstName . "<br>";
    $html .= "<strong>Фамилия: </strong>" . $lastName . "<br>";
    $html .= "<strong>E-mail: </strong>" . $email . "<br>";
    $html .= "<strong>Телефон: </strong>" . $tel . "<br>";
    
    mail($admin_email, $subject, $html, $headers);
    
    $html = "<h2>Ваш десерт мечты</h2>";
    $html .= $dd_content;
    $html .= "<p>Скоро с Вами свяжется менеджер для уточнения заказа</p>";

    mail($customer_email, $subject, $html, $headers);
  } else if ($cartData) { // send email from placeOrder page
    $address = $request->address;
    $deliveryType = $request->deliveryType;
    
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
      $row = "<tr>";
        if ($item->price == 0) {
          $row .= 
            "<td>{$item->name}</td>
            <td colspan='3'>{$item->set}</td>";
        } else {
          $row .= 
            "<td>{$item->name}</td>
            <td>{$item->price}</td>
            <td>{$item->count}</td>
            <td>{$item->set}</td>";
        }
        $row .= "</tr>";
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
    
    // send email to admin
    mail($admin_email, $subject, $html, $headers);
    
    // form and send email to customer
    $html = "<h2>Ваш заказ</h2>";
    $html .= $table;
    $html .= "<p>Заказ был успешно отправлен. Скоро с Вами свяжется менеджер для
      уточнения заказа</p>";
      
    mail($customer_email, $subject, $html, $headers);
  } else { // send email from contacts page
    $html = "<h2>Заказ обратного звонка</h2>";
    $html .= "<strong>Имя: </strong>" . $firstName . "<br>";
    $html .= "<strong>Фамилия: </strong>" . $lastName . "<br>";
    $html .= "<strong>E-mail: </strong>" . $email . "<br>";
    $html .= "<strong>Телефон: </strong>" . $tel . "<br>";
    $html .= "<strong>Комментарий: </strong>" . $comment . "<br>";
    
    mail($admin_email, $subject, $html, $headers);
  }
  
?>