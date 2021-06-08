<?php
ob_start();

if ( $_SERVER['REQUEST_METHOD'] != 'GET' ) {
    exit;
}

include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/__Utils__.php' );
include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Session.php' );
include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Users.php' );

Users::$id = Utils::getBin( $_GET['id'] );
$data = Users::fetch();
$data['id'] = Utils::getHex( $data['id'] );
echo json_encode( $data );