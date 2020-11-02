<?php
    $username       = $_POST['username'];
    $usernumber     = $_POST['usernumber'];
    $to = 'info@viratec.kz';
    $from = "robot@viratec.kz";
    $subject = "Заявка с сайта";
    $headers = "From: $from\r\nReply-To: $to\r\nContent-type: text/html; charset=utf-8\r\n";

    $message = "
        <html>
            <head>
                <title>lol</title>
            </head>
            <body>
            <style>
                .red{
                    color:#ff7f7f;
                }

                a{
                    color: #ff7f7f 
                }
                .wrap-main{
                    border-radius:15px;
                    background:#f6f6f6;
                    width: 400px;
                    margin: 0 auto;
                    padding: 12px;
                }
            </style>
            <div class='wrap-main'> 
                <h3>Пользователь: <span class='red'> $username </span></h3>
                <h3>Номер: <span class='red'> $usernumber </span></h3>
            </div>
            </body>
        </html>     
    ";


    if (mail($to, $subject, $message, $headers)) {
        echo('');
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	<title>Virateck</title>
	<link rel="stylesheet" href="css/main.min.css">
	<div class="container w100p" style="height: 100vh;">
		<div class="dfc " style="height:100%;">
			<div class="center dfc" style="height: 170px;">
				<h1 class="center">Ваша заявка принята.</h1>
				<p class="center">Будет произведет автопереход через:&nbsp;<span class="sec"> 5</span>&nbsp;секунд</p>
				<p class="center">Если переход не произошел нажмите на <a href="index.html">&nbsp; ССЫЛКУ</a></p>
			</div>
		</div>

	</div>

	<script src="js/scripts.min.js"></script>
		<script type="text/javascript">
		$(function(){
			var i = 5;
			setInterval(function(){
				if($('.sec').html()==0){
					location.href = 'index.html';
				}else{
				$('.sec').html(i)
				i=i-1
				}
			},1000)
		})
	</script>
</head>
<body>
				
			