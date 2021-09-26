<?php
    $img_pool = [
        "https://cdn.discordapp.com/attachments/891687376760496148/891687713995120640/Ayame_1.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687718218793060/Ayame_2.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687738716348436/Ayame_3.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687745192341524/Ayame_4.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687757821411389/Ayame_5.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687761151660083/Ayame_6.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687763366248478/Ayame_7.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687764448387082/Ayame_8.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687765685698610/Ayame_9.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687767296344104/Ayame_10.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687768898543626/Ayame_11.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687770370736128/Ayame_12.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687772161708052/Ayame_13.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687773772320829/Ayame_14.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891690031654256650/Ayame_15.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891690049417121812/Ayame_16.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891690071009411142/Ayame_17.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891690669880541264/Ayame_18.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687812083105812/Ayame_19.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687814847152158/Ayame_20.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687667010523176/Ayame_21.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687696605511700/Ayame_22.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687698585235456/Ayame_23.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687700002922547/Ayame_24.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891690926278340708/Ayame_25.jpg",
        "https://cdn.discordapp.com/attachments/891687376760496148/891687703010242611/Ayame_26.jpg"
    ];
    $url = $img_pool[rand(0, count($img_pool)-1)];
    header("Cache-control: no-store");
    header("Location: ".$url);
?>