<?php

include_once( $_SERVER['DOCUMENT_ROOT'] . '/IMS/models/Database.php' );

class Users extends Database {
    public static int $id;
    public static string $firstname;
    public static string $lastname;
    public static string $username;
    public static string $password;
    public static string $salt;
    public static string $cin;
    public static string $phone;
    public static string $email;
    public static string $address;
    public static int $type;
    public static bool $status;
    public static string $token;
    public static int $verified;
    private static array|bool|string $retuns;
    public static function fetchAll(): array|bool {
        parent::connect();
        $query = 'SELECT * FROM users ORDER BY id DESC';
        $req = self::$cnx->prepare( $query );
        $res = $req->execute();
        if ( $res ) {
            self::$retuns = $req->fetchAll( PDO::FETCH_ASSOC );
        } else {
            self::$retuns = false;
        }
        parent::disconnect();
        return self::$retuns;
    }
    public static function fetch(): array|bool {
        parent::connect();
        $query = 'SELECT * FROM users WHERE id = :id LIMIT 1';
        $req = self::$cnx->prepare( $query );
        $res = $req->execute( array( 'id' => self::$id ) );
        if ( $res ) {
            self::$retuns = $req->fetch( PDO::FETCH_ASSOC );
        } else {
            self::$retuns = false;
        }
        parent::disconnect();
        return self::$retuns;
    }
    public static function create(): bool {
        parent::connect();
        $query = 'INSERT INTO users(firstname,lastname,username,password,salt,email,phone,cin,address,type,token) 
                    VALUES(:firstname,:lastname,:username,:password,:salt,:email,:phone,:cin,:address,:type,:token)';
        $req = self::$cnx->prepare( $query );
        $res = $req->execute( array(
            'id' => self::$id,
            'firstname' => self::$firstname,
            'lastname' => self::$lastname,
            'username' => self::$username,
            'password' => self::$password,
            'salt' => self::$salt,
            'email' => self::$email,
            'phone' => self::$phone,
            'cin' => self::$cin,
            'address' => self::$address,
            'type' => self::$type,
            'token' => self::$token
        ) );
        if ( $res ) {
            self::$retuns = true;
        } else {
            self::$retuns = false;
        }
        parent::disconnect();
        return self::$retuns;
    }
    public static function update(): bool {
        parent::connect();
        $query = 'UPDATE users SET  firstname = :firstname, lastname = :lastname, username = :username, 
                    email = :email, phone = :phone, cin = :cin, address = :address, type = :type WHERE id = :id';
        $req = self::$cnx->prepare( $query );
        $res = $req->execute( array(
            'id' => self::$id,
            'firstname' => self::$firstname,
            'lastname' => self::$lastname,
            'username' => self::$username,
            'email' => self::$email,
            'phone' => self::$phone,
            'cin' => self::$cin,
            'address' => self::$address,
            'type' => self::$type,
        ) );
        if ( $res ) {
            self::$retuns = true;
        } else {
            self::$retuns = false;
        }
        parent::disconnect();
        return self::$retuns;
    }
    public static function delete(): bool {
        parent::connect();
        $query = 'DELETE FROM users WHERE id = :id';
        $req = self::$cnx->prepare( $query );
        $res = $req->execute( array( 'id' => self::$id ) );
        if ( $res ) {
            self::$retuns = true;
        } else {
            self::$retuns = false;
        }
        parent::disconnect();
        return self::$retuns;
    }
    public static function id(): string|bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function salt(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function type(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }

    public static function last(): string|bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function email(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function phone(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function token(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function status(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function active(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function username(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
    public static function password(): bool {
        parent::connect();
        parent::disconnect();
        return self::$retuns;
    }
}