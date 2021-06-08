<?php
session_start();

class Session {
    public static function set($session) {
        foreach ($session as $key => $val) {
            $_SESSION['USER'][$key] = $val;
        }
    }
    public static function get() {
        if (isset($_SESSION['USER'])) return $_SESSION['USER'];
        else return false;
    }
    public static function exist() {
        if (isset($_SESSION['USER'])) return true;
        else return false;
    }
    public static function clear() {
        session_unset();
        session_destroy();
        $_SESSION = array();
    }
}
