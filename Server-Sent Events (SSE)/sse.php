<?php

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$data = '';
$file_chats = 'chats.txt';

while(true) 
{
    if (file_exists($file_chats))
    {
        $data = file_get_contents($file_chats);
        $data = json_decode($data);
        $last = end($data);

        if ($last != $_SESSION['last_chat'])
        {
            $_SESSION['last_chat'] = $last;

            echo "event: update\n";
            echo "data: ".json_encode($last)."\n\n";
        }
    }
    
    ob_flush();
    flush();
    sleep(2);
}

?>