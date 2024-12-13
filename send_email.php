<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = strip_tags(trim($_POST["message"]));

    // Check if all fields are filled (except phone, which is optional)
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill out the form correctly.";
        exit;
    }

    $recipient = "0xkeychain@proton.me";
    $subject = "New Contact from $name";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: $name <$email>";

    if(mail($recipient, $subject, $email_content, $headers)) {
        echo "success";
    } else {
        echo "There was an error sending the email.";
        http_response_code(500);
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
