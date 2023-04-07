<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $name = htmlspecialchars($_POST['name']);
    $msg = htmlspecialchars($_POST['msg']);

    $file_chats = 'chats.txt';
    $data_chat[] = [
        'name' => $name,
        'message' => $msg,
        'time' => date('Y-m-d H:i:s')
    ];

    if (!file_exists($file_chats))
        $output = json_encode($data_chat);

    else
    {
        $get_chat = file_get_contents('chats.txt');
        $json_decode = json_decode($get_chat);
        $output = json_encode(array_merge($json_decode, $data_chat));
    }

    $save = file_put_contents('chats.txt', $output);
    echo ($save) ? 'success' : 'failed';    
}

?>