<?php
ob_start();

if ( $_SERVER['REQUEST_METHOD'] != 'DELETE' ) {
    exit;
}

include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/__Utils__.php' );
include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Session.php' );
include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Users.php' );

echo json_encode( array("id"=>$_REQUEST['id']) );

