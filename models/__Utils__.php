<?php

class Utils
{
    public static function setResponse(int $code, string $type, string $message): string
    {
        $data = array(
            'type' => $type,
            'message' => $message,
        );
        http_response_code($code);
        return json_encode($data);
    }
    public static function setObject(array $keys, array $vals): array
    {
        if (count($keys) != count($vals)) {
            return 0;
        }
        $object = array();
        for (
            $i = 0;
            $i < count($keys);
            $i++
        ) {
            $object[$keys[$i]] = $vals[$i];
        }
        return $object;
    }
    public static function getPass(string $data, string $salt): string
    {
        return self::getHex(md5($salt . $data . $salt));
    }
    public static function setJson(string $file, array $data): void
    {
        $data = json_encode($data, true);
        file_put_contents($file, $data);
    }
    public static function fetch(string $url, array $data = null): array|null
    {
        $method = 'GET';
        $sender = null;
        if (isset($data) && isset($data['method'])) {
            $method = strtoupper($data['method']);
        }
        switch ($method) {
            case 'POST':
                $sender = [
                    'method' => $method,
                    'header'  => 'Content-type: application/x-www-form-urlencode, application/json',
                    'content' => http_build_query($data['body'])
                ];
                break;
            case 'PUT':
                $sender = [
                    'method' => $method,
                    'header' => 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' . '\r\n',
                    'content' => json_encode($data['body'])
                ];
                break;
            default:
                if (isset($data) && isset($data['body'])) {
                    $url = sprintf('%s?%s', $url, http_build_query($data['body']));
                }
                $sender =  [
                    'method' => $method,
                    'header'  => 'Content-type: application/json',
                ];
        }
        return json_decode(file_get_contents(
            $url,
            false,
            stream_context_create([
                'http' => $sender
            ])
        ), true);
    }
    public static function getJson(string $data): array
    {
        $data = file_get_contents($data);
        return json_decode($data, true);
    }
    public static function getEmpty(array $data): bool
    {
        $valid = 1;
        foreach ($data as $key => $val) {
            if (!isset($val) || $val == '' || $val == null) {
                $valid = 0;
            }
        }
        return $valid;
    }
    public static function setPass(string $data): array
    {
        $salt = self::getRand();
        return [self::getHex(md5($salt . $data . $salt)), $salt];
    }
    public static function getHex(string $data): string
    {
        return bin2hex(base64_encode($data));
    }
    public static function setName(string $data): string
    {
        $data = explode('.', $data);
        return self::getKey() . '.' . $data[count($data) - 1];
    }
    public static function getBin(string $data): string
    {
        return base64_decode(hex2bin($data));
    }
    public static function getRand(): string
    {
        $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $nums = [5, 6, 7, 8, 9, 10];
        return self::getHex(substr(str_shuffle($chars), 0, $nums[array_rand($nums)]));
    }
    public static function getKey(): string
    {
        return self::getHex(self::getRand() . (new DateTime())->format('YmdHisv'));
    }
}
