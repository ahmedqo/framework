<?php

class Database
{
    private static  $host = 'localhost';
    private static  $db_name = 'stockmanagement';
    private static  $username = 'root';
    private static  $password = '';
    public static $cnx;
    public static function connect() {
        try {
            self::$cnx =  new PDO('mysql:host=' . self::$host . ';dbname=' . self::$db_name, self::$username, self::$password);
        } catch (PDOException $exception) {
            echo 'Connection error: ' . $exception->getMessage();
        }
    }
    public static function disconnect() {
        self::$cnx = null;
    }
}
