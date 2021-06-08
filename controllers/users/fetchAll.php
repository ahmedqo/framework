<?php
ob_start();

include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/__Utils__.php' );
include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Session.php' );
include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Users.php' );

if ( $_SERVER['REQUEST_METHOD'] != 'GET' ) {
    exit;
}

$data = Users::fetchAll();
for ( $i = 0; $i < count( $data );
$i++ ) {
    $data[$i]['id'] = Utils::getHex( $data[$i]['id'] );
}
echo json_encode( $data );
