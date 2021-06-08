<?php
ob_start();

$_PUT = (array) json_decode(file_get_contents("php://input"));

if ( $_SERVER['REQUEST_METHOD'] != 'PUT' ) {
    exit;
}

include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/__Utils__.php' );
include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Session.php' );
include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Users.php' );

echo json_encode( array("id"=>$_PUT['id']) );
