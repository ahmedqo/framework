<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/IMS/models/__Utils__.php');

$users = Utils::fetch('http://localhost:5050/IMS/controllers/users/fetchAll.php');

$user = Utils::fetch('http://localhost:5050/IMS/controllers/users/fetch.php', ['body' => array(
    'id' => '4d5455324f4445794e6a6730'
)]);

$ur = Utils::fetch('http://localhost:5050/IMS/controllers/users/delete.php', ['method' => 'delete', 'body' => array(
    'id' => '4d5455324f4445794e6a6730'
)]);

$usr = Utils::fetch('http://localhost:5050/IMS/controllers/users/update.php', ['method' => "put", 'body' => array(
    'id' => '4d5455324f4445794e6a6730'
)]);

echo '<pre>';
print_r($usr);
print_r($ur);
echo '</pre>';
echo '<br><br>';
echo '<pre>';
print_r($user);
echo '</pre>';
