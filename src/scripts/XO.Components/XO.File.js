import XOElement from "./XO.Element.js"

var ICONS = {
    image: `
        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
            <path d="M1340 5000 l0 -5000 3660 0 3660 0 0 3958 0 3957 -1043 1043 -1042 1042 -2618 0 -2617 0 0 -5000z m6110 3785 l1105 -1105 -1113 0 -1112 0 0 1105 c0 608 3 1105 8 1105 4 0 504 -497 1112 -1105z m-3498 -3476 c29 -6 95 -31 147 -55 79 -37 106 -57 175 -126 93 -93 132 -156 172 -273 23 -69 27 -96 27 -200 0 -103 -4 -132 -26 -200 -36 -108 -89 -194 -169 -274 -82 -81 -152 -125 -266 -164 -77 -26 -101 -30 -202 -31 -104 0 -124 3 -208 32 -126 43 -173 72 -268 167 -92 92 -143 180 -174 301 -24 94 -26 232 -5 324 44 184 180 357 349 440 49 24 112 49 140 56 65 16 239 17 308 3z m3022 -2147 c427 -1179 776 -2147 776 -2153 0 -5 -1024 -9 -2750 -9 -1512 0 -2750 3 -2750 6 0 3 350 599 777 1325 675 1146 779 1318 790 1303 7 -10 255 -428 550 -931 296 -502 540 -913 543 -913 3 0 290 789 639 1753 348 963 636 1756 638 1760 3 5 7 7 8 5 2 -2 353 -968 779 -2146z"></path>
        </g>
    `,
    document: `
        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
            <path d="M2003 8678 l-992 -1323 991 -3 c545 -1 993 -1 995 1 2 2 2 599 1 1326 l-3 1322 -992 -1323z"></path>
            <path d="M3330 8633 c0 -1364 0 -1367 -21 -1410 -28 -58 -102 -138 -158 -171 l-46 -27 -1050 -5 -1050 -5 -3 -3384 c-1 -2326 1 -3396 8 -3423 15 -53 58 -99 132 -139 l63 -34 3728 -3 3727 -2 0 4884 c0 2686 -3 4898 -7 4917 -8 44 -75 109 -146 142 l-56 27 -2560 0 -2561 0 0 -1367z m4420 -3913 l0 -220 -2750 0 -2750 0 0 220 0 220 2750 0 2750 0 0 -220z m0 -870 l0 -220 -2750 0 -2750 0 0 213 c0 118 3 217 7 220 3 4 1241 7 2750 7 l2743 0 0 -220z m0 -880 l0 -220 -2750 0 -2750 0 0 220 0 220 2750 0 2750 0 0 -220z m0 -875 l0 -225 -2747 2 -2748 3 -3 210 c-1 115 0 215 2 222 4 11 534 13 2751 13 l2745 0 0 -225z m0 -875 l0 -220 -2750 0 -2750 0 0 220 0 220 2750 0 2750 0 0 -220z"></path>
        </g>
    `,
    video: `
        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
            <path d="M380 8264 c-185 -49 -331 -201 -369 -382 -8 -38 -11 -856 -11 -2885 0 -3096 -4 -2881 56 -3004 35 -73 114 -156 193 -203 129 -76 -319 -70 4751 -70 5070 0 4622 -6 4751 70 79 47 158 130 193 203 60 123 56 -92 56 3004 0 2023 -3 2847 -11 2885 -28 133 -143 286 -259 341 -129 62 262 57 -4735 56 -3964 0 -4567 -2 -4615 -15z m1197 -495 c50 -18 81 -58 93 -116 7 -34 10 -146 8 -306 -3 -283 -6 -296 -75 -339 l-38 -23 -475 0 c-457 0 -476 1 -509 20 -19 11 -43 33 -55 48 -20 27 -21 42 -24 315 -3 329 0 344 72 387 l41 25 467 0 c306 0 476 -4 495 -11z m5861 -4 c88 -21 151 -56 225 -124 67 -63 105 -124 137 -217 20 -56 20 -99 20 -2424 0 -2325 0 -2368 -20 -2424 -10 -31 -31 -79 -46 -106 -35 -64 -135 -160 -202 -194 -117 -59 38 -56 -2550 -56 -2633 0 -2450 -5 -2569 66 -115 69 -189 162 -233 290 -20 56 -20 99 -20 2424 0 2325 0 2368 20 2424 31 92 69 152 134 215 69 66 139 105 224 125 89 22 4788 22 4880 1z m1982 -7 c18 -13 43 -36 54 -51 20 -27 21 -40 21 -320 0 -323 -2 -332 -63 -373 -18 -13 -56 -26 -85 -29 -29 -3 -245 -5 -482 -3 -410 3 -432 4 -465 23 -21 12 -44 39 -58 65 -22 44 -23 50 -20 327 3 268 4 283 24 310 11 15 36 38 54 51 l33 22 477 0 477 0 33 -22z m-7820 -1600 c18 -13 43 -36 54 -51 20 -27 21 -40 21 -320 0 -328 -1 -334 -72 -379 l-38 -23 -475 0 c-457 0 -476 1 -509 20 -19 11 -43 33 -55 48 -20 27 -21 39 -21 332 0 291 1 305 21 332 47 64 40 63 565 63 l476 0 33 -22z m7820 4 c23 -11 43 -33 58 -62 22 -44 23 -50 20 -325 -3 -309 -5 -321 -66 -361 -18 -13 -56 -26 -85 -29 -29 -3 -245 -5 -482 -3 -410 3 -432 4 -465 23 -21 12 -44 39 -57 65 -22 43 -23 54 -23 312 0 282 3 306 47 355 11 12 31 27 44 32 14 6 220 10 499 10 433 1 478 -1 510 -17z m-7820 -1594 c18 -13 43 -36 54 -51 20 -27 21 -40 21 -322 0 -282 -1 -295 -21 -322 -11 -15 -36 -38 -54 -50 l-33 -23 -476 0 c-525 0 -518 -1 -565 63 -20 27 -21 41 -21 332 0 291 1 305 21 332 47 64 40 63 565 63 l476 0 33 -22z m7820 4 c23 -11 43 -33 58 -62 21 -43 22 -54 22 -315 0 -261 -1 -272 -22 -315 -43 -83 -26 -81 -578 -78 l-485 3 -32 24 c-58 44 -63 71 -63 367 0 278 3 302 47 351 11 12 31 27 44 32 14 6 220 10 499 10 433 1 478 -1 510 -17z m-7817 -1580 c71 -45 72 -51 72 -379 0 -280 -1 -293 -21 -320 -11 -15 -36 -38 -54 -50 l-33 -23 -476 0 c-525 0 -518 -1 -565 63 -20 27 -21 43 -24 320 -2 263 -1 295 15 326 22 41 58 70 104 81 19 5 239 8 489 7 l455 -2 38 -23z m7771 18 c22 -5 51 -17 65 -28 53 -39 56 -55 59 -357 3 -275 2 -281 -20 -324 -43 -84 -25 -82 -578 -79 l-485 3 -32 24 c-58 44 -63 71 -63 369 0 240 2 271 19 309 21 45 53 71 104 83 46 11 884 11 931 0z"></path>
            <path d="M3665 6721 c-77 -20 -139 -72 -174 -145 l-21 -46 0 -1529 c0 -1484 1 -1531 19 -1574 52 -120 188 -183 312 -143 51 17 336 180 2334 1334 315 182 323 187 360 246 41 68 48 173 15 241 -33 68 -73 101 -227 189 -76 44 -349 202 -608 351 -258 149 -652 376 -875 505 -223 128 -522 301 -665 384 -143 82 -276 158 -297 168 -42 21 -130 30 -173 19z"></path>
        </g>
    `,
    audio: `
        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
            <path d="M9490 9979 c-64 -16 -888 -208 -1325 -309 -236 -54 -594 -137 -795 -184 -201 -47 -552 -128 -780 -180 -228 -53 -521 -121 -650 -151 -236 -56 -777 -182 -1635 -380 -253 -58 -640 -148 -860 -200 -220 -51 -446 -104 -502 -117 l-103 -23 -2 -2510 -3 -2510 -440 -6 c-405 -5 -449 -7 -550 -28 -246 -51 -511 -165 -690 -298 -120 -89 -305 -276 -388 -393 -128 -180 -231 -425 -277 -655 -31 -156 -38 -411 -16 -563 44 -297 148 -555 318 -782 157 -211 342 -369 580 -494 239 -126 453 -182 738 -193 484 -17 936 166 1276 519 285 295 444 653 474 1067 5 71 10 1086 10 2333 l0 2207 38 10 c20 6 381 92 802 191 629 149 3188 756 3663 869 71 17 133 31 138 31 5 0 8 -582 7 -1532 l-3 -1533 -450 -5 c-504 -6 -537 -10 -750 -81 -250 -83 -465 -211 -645 -385 -223 -215 -362 -436 -455 -719 -94 -285 -103 -641 -24 -947 46 -182 151 -405 267 -568 86 -122 271 -306 392 -392 116 -83 319 -185 460 -231 560 -185 1170 -66 1627 318 290 244 482 562 575 957 l23 93 2 3893 c2 2140 0 3892 -4 3891 -5 -1 -24 -5 -43 -10z"></path>
        </g>
    `,
    application: `
        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
            <path d="M3725 9286 c-676 -391 -1671 -966 -2210 -1278 -539 -311 -1017 -587 -1062 -614 l-83 -48 28 -17 c88 -55 1649 -951 1657 -952 11 0 -1 -7 1825 1048 734 424 1658 957 2053 1185 549 318 714 417 705 426 -20 17 -1666 964 -1675 963 -4 -1 -561 -321 -1238 -713z"></path>
            <path d="M7795 8185 c-88 -50 -452 -261 -810 -467 -357 -206 -922 -532 -1255 -725 -333 -192 -1002 -578 -1487 -858 -675 -389 -880 -512 -870 -521 6 -6 359 -210 782 -454 424 -243 787 -453 809 -465 l38 -23 227 131 c124 72 714 412 1311 757 597 344 1529 882 2072 1195 543 314 984 573 980 577 -4 4 -356 208 -782 453 -426 246 -793 457 -815 470 l-40 23 -160 -93z"></path>
            <path d="M330 7253 c0 -26 0 -26 23 -7 l22 19 -22 -26 c-20 -22 -23 -36 -23 -119 l0 -95 80 80 c44 44 80 82 80 85 0 6 -143 90 -154 90 -3 0 -6 -12 -6 -27z"></path>
            <path d="M8620 6681 c-569 -329 -1609 -929 -2310 -1334 l-1275 -736 -3 -2295 c-1 -1263 0 -2296 3 -2296 6 0 1279 734 3623 2087 l1012 585 0 2294 c0 1262 -3 2294 -7 2294 -5 0 -474 -270 -1043 -599z m803 -1292 c-5 -4 -426 -249 -938 -544 -511 -296 -956 -552 -988 -571 l-57 -33 2 596 3 597 95 55 c52 31 497 288 990 572 l895 516 3 -590 c1 -325 -1 -594 -5 -598z m-30 -2450 c-5 -4 -267 -156 -583 -339 -316 -183 -590 -341 -608 -352 l-32 -20 2 359 3 358 610 352 610 351 3 -351 c1 -193 -1 -354 -5 -358z m-3354 -1205 c88 -110 161 -203 161 -207 0 -3 -36 -27 -80 -54 l-80 -48 -2 -168 -3 -169 -170 -99 c-93 -54 -176 -99 -182 -99 -10 0 -13 39 -13 160 0 88 -2 160 -5 160 -2 0 -39 -20 -81 -45 -55 -33 -75 -40 -70 -28 4 10 82 199 174 420 126 305 169 400 178 390 6 -6 84 -102 173 -213z"></path>
            <path d="M8540 5989 c-448 -259 -863 -498 -922 -532 l-108 -62 0 -518 0 -518 43 25 c23 14 440 254 927 535 l885 510 3 515 c1 284 -1 516 -5 516 -5 0 -375 -212 -823 -471z"></path>
            <path d="M412 7096 l-82 -84 0 -93 0 -94 144 144 c80 80 143 148 140 152 -7 11 -95 59 -108 59 -7 0 -49 -38 -94 -84z"></path>
            <path d="M482 6957 l-152 -152 0 -95 0 -95 210 210 c116 115 210 213 210 216 0 4 -71 48 -110 67 -3 1 -74 -67 -158 -151z"></path>
            <path d="M547 6822 l-217 -217 0 -95 0 -95 275 275 c309 308 287 272 195 327 l-36 22 -217 -217z"></path>
            <path d="M607 6682 l-277 -277 0 -95 0 -95 342 340 c188 187 318 313 290 280 -28 -33 -181 -190 -341 -350 l-291 -290 0 -90 0 -90 400 400 c220 220 400 402 400 405 0 6 -228 140 -238 140 -4 0 -132 -125 -285 -278z"></path>
            <path d="M737 6402 l-408 -408 3 -89 3 -90 463 466 463 466 -51 32 c-27 17 -54 31 -58 31 -4 0 -191 -184 -415 -408z"></path>
            <path d="M802 6267 l-472 -472 0 -95 0 -95 530 530 c292 291 530 533 530 536 0 4 -71 48 -110 67 -3 1 -218 -211 -478 -471z"></path>
            <path d="M862 6127 l-533 -533 3 -92 3 -92 594 594 594 594 -54 31 c-30 17 -59 31 -64 31 -6 0 -250 -240 -543 -533z"></path>
            <path d="M928 5986 l-598 -603 0 -89 0 -89 659 659 660 660 -55 33 c-30 18 -58 33 -62 32 -4 0 -276 -272 -604 -603z"></path>
            <path d="M996 5851 l-666 -666 0 -95 0 -95 725 725 c398 398 721 728 717 731 -4 4 -30 21 -58 37 l-51 30 -667 -667z"></path>
            <path d="M1057 5712 l-727 -727 0 -95 0 -95 793 790 792 790 -793 -795 -792 -795 0 -95 0 -95 835 835 c769 768 835 837 833 865 -3 27 -14 37 -103 87 -55 32 -102 58 -105 58 -3 0 -332 -327 -733 -728z"></path>
            <path d="M1163 5408 l-833 -833 0 -88 0 -89 300 294 c165 161 541 537 835 835 l536 542 -3 86 -3 85 -832 -832z"></path>
            <path d="M1162 5207 l-833 -833 3 -92 3 -92 833 833 833 833 -3 92 -3 92 -833 -833z"></path>
            <path d="M1162 5007 l-833 -833 3 -92 3 -92 833 833 833 833 -3 92 -3 92 -833 -833z"></path>
            <path d="M1165 4806 l-830 -837 -3 -92 -3 -92 836 835 836 836 -3 94 -3 93 -830 -837z"></path>
            <path d="M3311 5536 c-8 -9 -11 -47 -9 -105 l3 -92 73 74 74 74 -55 32 c-61 35 -70 37 -86 17z"></path>
            <path d="M3377 5402 l-77 -77 0 -95 0 -95 140 140 139 139 -57 33 c-31 18 -59 33 -62 33 -3 0 -40 -35 -83 -78z"></path>
            <path d="M1163 4598 l-833 -833 0 -95 0 -95 116 115 c63 63 439 442 835 842 l720 726 -3 86 -3 86 -832 -832z"></path>
            <path d="M3442 5257 l-143 -143 3 -92 3 -92 204 204 203 203 -55 32 c-30 17 -58 31 -63 31 -5 0 -74 -64 -152 -143z"></path>
            <path d="M3507 5122 l-207 -207 0 -95 0 -95 265 265 c146 146 265 268 265 272 0 7 -99 68 -110 68 -3 0 -99 -93 -213 -208z"></path>
            <path d="M3572 4987 l-272 -272 0 -95 0 -95 330 330 c182 181 330 332 330 335 0 3 -26 20 -58 37 l-58 32 -272 -272z"></path>
            <path d="M1162 4397 l-833 -833 3 -92 3 -92 833 833 833 833 -3 92 -3 92 -833 -833z"></path>
            <path d="M3638 4845 l-338 -335 0 -92 0 -92 393 390 c215 214 393 392 395 396 3 6 -96 68 -108 68 -3 -1 -157 -151 -342 -335z"></path>
            <path d="M3702 4707 l-402 -402 0 -95 0 -95 460 460 c253 253 460 462 460 465 0 3 -26 20 -58 37 l-58 32 -402 -402z"></path>
            <path d="M1162 4197 l-833 -833 3 -92 3 -92 833 833 833 833 -3 92 -3 92 -833 -833z"></path>
            <path d="M3762 4567 l-462 -462 0 -61 0 -61 -116 -124 c-64 -68 -120 -125 -124 -127 -3 -1 -15 16 -25 38 -10 22 -21 40 -24 40 -3 0 -386 -380 -850 -844 l-843 -843 55 -32 c30 -17 58 -31 63 -31 5 0 663 654 1463 1454 l1454 1454 -54 31 c-30 17 -59 31 -64 31 -6 0 -218 -208 -473 -463z"></path>
            <path d="M2900 3505 c-800 -800 -1452 -1456 -1450 -1458 3 -3 30 -18 60 -35 l56 -31 1457 1457 1457 1457 -59 33 c-32 17 -60 32 -62 32 -2 0 -659 -655 -1459 -1455z"></path>
            <path d="M3958 4360 c-293 -290 -948 -946 -1456 -1458 l-923 -931 53 -30 c29 -17 56 -31 59 -31 9 0 2909 2901 2909 2909 0 4 -24 21 -54 38 l-55 31 -533 -528z"></path>
            <path d="M1163 3996 l-833 -836 0 -93 0 -92 835 835 836 836 -3 93 -3 93 -832 -836z"></path>
            <path d="M3160 3355 c-800 -800 -1452 -1456 -1450 -1458 3 -2 58 -35 123 -72 l118 -68 1455 1454 c800 800 1454 1456 1454 1459 0 3 -26 20 -57 38 l-57 33 -1460 -1458 -1461 -1458 1453 1455 c798 800 1452 1458 1452 1462 0 7 -99 68 -110 68 -3 0 -660 -655 -1460 -1455z"></path>
            <path d="M3413 3208 c-798 -798 -1450 -1454 -1448 -1457 2 -3 28 -19 59 -36 l56 -30 1445 1445 c1065 1065 1445 1450 1443 1465 -3 18 -69 64 -93 65 -5 0 -663 -653 -1462 -1452z"></path>
            <path d="M1167 3792 l-837 -837 0 -95 0 -95 576 575 c316 316 706 709 866 873 l290 297 -22 53 c-12 28 -25 55 -29 59 -3 4 -383 -369 -844 -830z"></path>
            <path d="M3527 3113 c-792 -789 -1437 -1436 -1435 -1437 1 -2 28 -17 58 -34 l55 -31 1383 1377 1384 1377 -4 91 -3 92 -1438 -1435z"></path>
            <path d="M1197 3622 c-791 -791 -867 -870 -867 -899 0 -28 6 -36 42 -54 l41 -21 859 859 858 858 -30 63 c-16 34 -30 62 -32 62 -2 0 -393 -390 -871 -868z"></path>
            <path d="M1475 3500 c-511 -511 -927 -931 -925 -933 3 -3 30 -18 60 -35 l56 -31 904 904 904 904 -29 61 c-16 33 -31 60 -34 60 -3 0 -424 -418 -936 -930z"></path>
            <path d="M1271 3496 l-853 -853 55 -32 c30 -17 58 -31 63 -31 5 0 379 370 832 823 l823 823 -27 62 c-15 34 -29 62 -33 62 -3 0 -390 -384 -860 -854z"></path>
            <path d="M3591 2976 l-1373 -1373 55 -32 c30 -17 58 -31 63 -31 5 0 600 591 1322 1313 l1313 1313 -3 92 -3 92 -1374 -1374z"></path>
            <path d="M1576 3391 l-899 -899 54 -31 c30 -17 58 -31 64 -31 5 0 400 390 876 866 l867 867 -25 56 c-14 31 -28 59 -32 63 -3 4 -411 -397 -905 -891z"></path>
            <path d="M2728 4080 c-92 -100 -104 -109 -112 -90 -5 11 -12 20 -15 20 -3 0 -380 -374 -836 -830 -794 -795 -829 -832 -810 -846 11 -9 38 -25 59 -36 l39 -20 914 914 914 914 -16 42 c-10 23 -21 42 -25 42 -5 0 -55 -50 -112 -110z"></path>
            <path d="M1670 3285 c-475 -475 -862 -866 -860 -868 3 -3 30 -18 60 -35 l56 -31 837 837 837 837 -27 63 c-15 34 -30 62 -33 62 -3 0 -394 -389 -870 -865z"></path>
            <path d="M3655 2840 c-720 -720 -1307 -1311 -1305 -1313 3 -3 30 -18 60 -35 l56 -31 1252 1252 1253 1253 -3 92 -3 92 -1310 -1310z"></path>
            <path d="M1969 3179 l-907 -908 58 -34 57 -35 883 883 883 883 -25 58 c-13 32 -29 59 -34 60 -5 1 -417 -407 -915 -907z"></path>
            <path d="M2067 3072 l-877 -877 61 -34 61 -34 850 850 849 849 -28 62 c-15 34 -30 61 -33 62 -3 0 -400 -395 -883 -878z"></path>
            <path d="M3792 2775 c-646 -643 -1205 -1204 -1243 -1247 l-70 -76 57 -32 56 -33 1190 1190 1189 1189 -3 89 -3 90 -1173 -1170z"></path>
            <path d="M3785 2560 c-648 -648 -1177 -1181 -1175 -1183 3 -2 30 -18 60 -35 l56 -31 1122 1122 1123 1123 -3 92 -3 92 -1180 -1180z"></path>
            <path d="M3853 2428 c-612 -612 -1113 -1116 -1113 -1120 0 -3 25 -21 56 -39 l56 -32 1060 1060 1059 1059 -3 92 -3 92 -1112 -1112z"></path>
            <path d="M3912 2287 l-1054 -1054 56 -31 c31 -18 59 -32 63 -32 5 0 455 447 1001 993 l993 993 -3 92 -3 92 -1053 -1053z"></path>
            <path d="M3978 2147 l-987 -987 37 -24 c20 -12 46 -28 58 -34 18 -10 105 74 953 922 l932 932 -3 89 -3 90 -987 -988z"></path>
            <path d="M4042 2007 l-924 -924 56 -31 c31 -18 59 -32 63 -32 5 0 396 388 871 863 l863 863 -3 92 -3 92 -923 -923z"></path>
            <path d="M4106 1871 l-859 -859 39 -24 c21 -14 48 -30 60 -36 18 -10 93 62 823 792 l802 802 -3 92 -3 92 -859 -859z"></path>
            <path d="M4173 1737 c-436 -436 -793 -796 -793 -799 0 -3 25 -20 57 -38 l56 -32 739 739 739 739 -3 92 -3 93 -792 -794z"></path>
            <path d="M4236 1591 l-729 -729 49 -31 c27 -17 56 -30 64 -28 8 1 316 304 683 673 l668 670 -3 87 -3 87 -729 -729z"></path>
            <path d="M4303 1458 c-365 -365 -663 -666 -663 -670 0 -3 25 -20 57 -38 l56 -32 609 609 609 609 -3 92 -3 92 -662 -662z"></path>
            <path d="M4362 1317 l-602 -602 54 -33 c30 -17 58 -32 63 -32 4 0 252 244 551 543 l543 543 -3 92 -3 92 -603 -603z"></path>
            <path d="M4422 1177 c-406 -406 -530 -536 -520 -543 7 -6 34 -22 59 -37 l45 -26 482 482 482 482 0 88 c0 48 -3 87 -8 87 -4 0 -247 -240 -540 -533z"></path>
            <path d="M4492 1037 l-472 -472 56 -34 56 -34 420 420 419 419 -3 87 -3 87 -473 -473z"></path>
            <path d="M4557 902 c-311 -311 -405 -411 -395 -418 7 -6 34 -22 59 -37 l45 -26 353 353 352 352 -3 92 -3 92 -408 -408z"></path>
            <path d="M4620 765 c-189 -189 -342 -346 -340 -348 3 -3 29 -19 59 -37 l53 -33 289 289 290 290 -3 92 -3 92 -345 -345z"></path>
            <path d="M4687 622 c-213 -214 -275 -281 -265 -289 7 -5 32 -21 56 -34 l43 -23 225 225 225 225 -3 87 -3 87 -278 -278z"></path>
            <path d="M4750 486 c-118 -119 -212 -217 -210 -220 3 -2 28 -17 56 -34 l51 -30 162 162 162 162 -3 87 -3 87 -215 -214z"></path>
            <path d="M4812 347 l-152 -153 56 -32 c31 -18 59 -32 63 -32 3 0 48 42 99 93 l93 93 -3 92 -3 92 -153 -153z"></path>
            <path d="M4871 206 l-83 -84 58 -35 59 -34 33 30 c31 30 32 33 32 119 0 48 -3 88 -8 88 -4 0 -45 -38 -91 -84z"></path>
        </g>
    `,

}

export default class extends XOElement {
    static attributes = {
        error: String,
        accept: String,
        success: String,
        blocked: String,
        multiple: String,
        placeholder: String,
        change(n, v) {
            var icons = {
                error: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M4750 9993 c-491 -33 -892 -109 -1305 -247 -621 -207 -1134 -496 -1665 -934 -147 -122 -466 -442 -596 -597 -663 -797 -1049 -1705 -1161 -2735 -25 -231 -25 -746 1 -985 99 -938 421 -1768 975 -2510 786 -1054 1949 -1758 3239 -1960 155 -25 167 -25 782 -25 613 0 628 1 780 24 384 61 770 170 1136 322 1014 421 1899 1201 2431 2144 103 181 246 477 308 635 122 309 225 673 287 1015 l31 175 4 609 c4 577 3 618 -17 755 -137 958 -522 1813 -1154 2561 -117 140 -383 406 -526 529 -369 316 -639 495 -1066 710 -574 287 -1183 454 -1843 506 -169 13 -507 18 -641 8z m551 -1613 c683 -68 1303 -319 1834 -743 126 -101 407 -382 507 -507 424 -533 677 -1160 738 -1830 23 -255 8 -618 -35 -873 -53 -307 -174 -676 -317 -961 l-40 -79 -2299 2299 -2298 2298 72 39 c334 177 813 317 1222 356 130 12 496 13 616 1z m-986 -4073 l2296 -2294 -113 -56 c-318 -157 -645 -257 -1038 -319 -128 -20 -181 -22 -460 -22 -277 0 -333 3 -460 22 -229 36 -411 79 -600 142 -305 101 -566 226 -807 387 -191 127 -346 256 -524 433 -189 189 -279 296 -412 490 -291 428 -475 901 -559 1440 -19 128 -22 183 -22 465 0 255 3 344 17 440 42 283 117 573 206 798 59 148 161 367 172 367 4 0 1041 -1032 2304 -2293z"></path>
                            </g>
                        </svg>`,
                success: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M7515 6559 c-2888 -1952 -3986 -2693 -4001 -2702 -6 -4 -202 70 -435 164 -1485 598 -3062 1229 -3065 1226 -2 -1 784 -790 1746 -1752 l1750 -1750 3243 3243 c1783 1783 3240 3242 3237 3242 -3 -1 -1116 -752 -2475 -1671z"></path>
                            </g>
                        </svg>`
            }
            switch (n) {
                case "accept":
                    this.$.file.accept = v;
                    break;
                case "error":
                    if (v) this.$.error.innerHTML = icons.error + v;
                    else this.$.error.innerHTML = "";
                    break;
                case "success":
                    if (v) this.$.success.innerHTML = icons.success + v;
                    else this.$.success.innerHTML = "";
                    break;
                case "blocked":
                    if (this.matches("[blocked]")) {
                        this.$.text.setAttribute("disabled", "");
                        this.$.file.setAttribute("disabled", "");
                        this.$.icon.setAttribute("disabled", "");
                    } else {
                        this.$.text.removeAttribute("disabled");
                        this.$.file.removeAttribute("disabled");
                        this.$.icon.removeAttribute("disabled");
                    }
                    break;
                case "multiple":
                    if (this.matches("[multiple]"))
                        this.$.file.setAttribute("multiple", "");
                    else
                        this.$.file.removeAttribute("multiple");
                    break;
                case "placeholder":
                    if (v) this.$.label.innerText = v;
                    else this.$.label.innerText = "";
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.files = { length: 0 };
        },
        attach() {
            this.$.text.addEventListener("blur", e => {
                if (e.target.value.trim()) {
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                } else {
                    this.$.label.style.setProperty("top", "");
                    this.$.label.style.setProperty("font-size", "");
                }
            });
            this.$.file.addEventListener("focus", () => {
                if (this.matches("[disabled]")) return;
                this.$.container.style.setProperty("outline", "auto");
            });
            this.$.file.addEventListener("change", e => {
                if (!this.matches("[multiple]")) {
                    this.files = { length: 0 };
                    this.$.items.innerHTML = "";
                }
                Array.from(e.target.files).forEach((file) => {
                    var icon, type = file.type.split("/")[0];
                    console.log(type)
                    switch (type) {
                        case "image":
                            icon = "image";
                            break;
                        case "video":
                            icon = "video";
                            break;
                        case "audio":
                            icon = "audio";
                            break;
                        case "application":
                            icon = "application";
                            break;
                        default:
                            icon = "document";
                            break;
                    }
                    this.files[this.files.length] = file;
                    this.$.items.innerHTML = `<tr><td><div><svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">${ICONS[icon]}</svg>${file.name}</div><a data-index="${this.files.length}" href>&times;</a></td></tr>` + this.$.items.innerHTML;
                    this.files.length = this.files.length + 1;
                });
                __delete__(this);
            });
            this.$.file.addEventListener("blur", () => {
                this.$.container.style.setProperty("outline", "unset");
            });
            this.$.icon.addEventListener("click", () => {
                this.$.file.click();
            });
        },
        detach() {
            this.$.file.removeEventListener("change", () => {});
            this.$.file.removeEventListener("focus", () => {});
            this.$.file.removeEventListener("click", () => {});
            this.$.file.removeEventListener("blur", () => {});
            this.$.text.removeEventListener("blur", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-container section,
        #xo-icon,
        #xo-text {
            all: unset;
        }
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
            --default: #ecf0f1;
            --water: #3498db;
            --fire: #e74c3c;
            --earth: #f1c40f;
            --forest: #2ecc71;
            --night: #34495e;
            --defaultLight: #f8f9f9;
            --waterLight: #ebf5fb;
            --fireLight: #fdedec;
            --earthLight: #fef9e7;
            --forestLight: #eafaf1;
            --nightLight: #ebedef;
            --defaultDark: #979a9a;
            --waterDark: #21618c;
            --fireDark: #943126;
            --earthDark: #9a7d0a;
            --forestDark: #1d8348;
            --nightDark: #212f3c;
        }
        /* Element */
        :host {
            display: inline-block;
            width: 260px;
        }
        :host([blocked]) #xo-container {
            background: #0000001f;
        }
        /* Container */
        #xo-container {
            border: 1px solid #1d1d1d;
            align-items: center;
            position: relative;
            border-radius: 5px;
            background: #fff;
            display: flex;
            width: 100%;
        }
        /* Input */
        #xo-container section {
            position: relative;
            overflow: hidden;
            flex: 1;
        }
        #xo-text {
            box-sizing: border-box;
            padding-right: 9.5px;
            padding-left: 9.5px;
            padding-bottom: 4px;
            padding-top: 15px;
            color: #1d1d1d;
            font-size: 18px;
            width: 100%;
        }
        #xo-label {
            transition: top .3s ease-in-out,
                        font-size .3s ease-in-out;
            transform: translateY(-50%);
            color: rgb(117, 117, 117);
            pointer-events: none;
            position: absolute;
            margin-left: 9.5px;
            font-size: 18px;
            top: 50%;
            left: 0;
        }
        #xo-text:focus+#xo-label {
            font-size: 12px;
            top: 10px;
        }
        #xo-file {
            position: absolute;
            height: 100%;
            width: 100%;
            opacity: 0;
            left: 0;
            top: 0;
        }
        /* Icon */
        #xo-icon {
            margin-right: 12px;
            width: max-content;
            cursor: pointer;
            display: flex;          
        }
        #xo-icon:focus {
            outline: auto;
        }
        #xo-icon svg {
            width: 16px;
            height: 16px;
            fill: #1d1d1d;
        }
        /* Items */
        :host([theme="water"]) #xo-items td {   
            background: var(--waterLight);
        }
        :host([theme="fire"]) #xo-items td {   
            background: var(--fireLight);
        }
        :host([theme="earth"]) #xo-items td {   
            background: var(--earthLight);
        }
        :host([theme="forest"]) #xo-items td {   
            background: var(--forestLight);
        }
        :host([theme="night"]) #xo-items td {   
            background: var(--nightLight);
        }
        #xo-items {
            border-collapse: collapse;
            width: 100%;
        }
        #xo-items td {   
            display: flex;
            color: #1d1d1d;
            margin-top: 10px;
            padding: 0px 8px; 
            border-radius: 5px;
            align-items: center;
            justify-content: space-between;
            background: var(--defaultLight);
        }
        #xo-items td div {
            display: flex;
            align-items: center;
        }
        #xo-items td svg {
            width: 20px;
            height: 20px;
            fill: #1d1d1d;
            display: flex;
            margin-right: 5px;
        }
        #xo-items td a {
            text-decoration: unset;
            font-weight: bold;
            cursor: pointer;
            font-size: 30px;
            color: #1d1d1d;
            display: flex;
        }
        /* Labels */
        #xo-error,
        #xo-success {
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        #xo-error svg,
        #xo-success svg {
            width: 18px;
            height: 18px;
            order: 2;
        }
        #xo-error {
            color: #dc3545;
        }
        #xo-success {
            color: #28a745;
        }
        #xo-error svg {
            fill: #dc3545;
        }
        #xo-success svg {
            fill: #28a745;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Text */
            #xo-text {
                {{--xo-text}}
            }
            #xo-text:hover {
                {{--xo-text-hover}}
            }
            /* Label */
            #xo-label {
                {{--xo-placeholder}}
            }
            #xo-label:hover {
                {{--xo-placeholder-hover}}
            }
            /* Icon */
            #xo-icon {
                {{--xo-icon}}
            }
            #xo-icon:hover {
                {{--xo-icon-hover}}
            }
            #xo-icon svg {
                {{--xo-icon-svg}}
            }
            #xo-icon:hover svg {
                {{--xo-icon-svg-hover}}
            }
            /* items */
            #xo-items {
                {{--xo-items}}
            }
            #xo-items:hover {
                {{--xo-items-hover}}
            }
            /* Item */
            #xo-items td {
                {{--xo-item}}
            }
            #xo-items td:hover {
                {{--xo-item-hover}}
            }
            #xo-items td svg{
                {{--xo-item-icon}}
            }
            #xo-items td svg:hover {
                {{--xo-item-icon-hover}}
            }
            #xo-items td a{
                {{--xo-item-trigger}}
            }
            #xo-items td a:hover {
                {{--xo-item-trigger-hover}}
            }
            /* Success */
            #xo-success {
                {{--xo-success}}
            }
            #xo-success:hover {
                {{--xo-success-hover}}
            }
            #xo-success svg {
                {{--xo-success-icon}}
            }
            #xo-success:hover svg {
                {{--xo-success-icon-hover}}
            }
            /* Error */
            #xo-error {
                {{--xo-error}}
            }
            #xo-error:hover {
                {{--xo-error-hover}}
            }
            #xo-error svg {
                {{--xo-error-icon}}
            }
            #xo-error:hover svg {
                {{--xo-error-icon-hover}}
            }
    `

    render() {
        return /*html*/ `
            <a role="input" id="xo-container">
                <slot name="prefix"></slot>
                <section>
                    <input type="text" id="xo-text" disabled>
                    <label for="xo-text" id="xo-label"></label>
                    <input type="file" id="xo-file">
                </section>
                <button id="xo-icon">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M4905 9990 c-164 -23 -308 -83 -427 -179 -40 -32 -688 -675 -1439 -1427 -1439 -1442 -1421 -1423 -1489 -1581 -63 -149 -75 -212 -74 -393 0 -151 2 -173 28 -255 101 -328 333 -561 661 -661 83 -26 103 -28 260 -28 158 0 176 2 260 27 116 36 232 94 320 159 39 28 287 268 552 532 l482 480 4 -1385 c2 -1280 4 -1389 20 -1449 65 -240 181 -419 357 -550 354 -263 806 -263 1160 0 196 146 324 361 365 615 13 76 15 301 15 1435 l0 1345 508 -507 c533 -532 570 -564 720 -628 215 -91 434 -107 647 -45 322 94 561 332 661 660 26 83 28 103 28 260 0 156 -3 177 -27 258 -42 136 -100 244 -192 359 -102 126 -2664 2687 -2778 2777 -177 139 -420 209 -622 181z"></path>
                            <path d="M840 1909 c-267 -30 -531 -195 -683 -426 -55 -85 -110 -214 -134 -318 -26 -115 -24 -331 5 -437 104 -382 408 -658 792 -717 56 -9 1094 -11 4170 -9 l4095 3 80 23 c95 26 226 87 310 144 295 198 462 588 401 936 -63 362 -300 642 -641 759 -164 56 83 53 -4290 52 -2216 -1 -4064 -6 -4105 -10z"></path>
                        </g>
                    </svg>
                </button>
            </a>
            <table id="xo-items"></table>
            <label for="xo-text" id="xo-success"></label>
            <label for="xo-text" id="xo-error"></label>
        `;
    }

    empty() {
        if (this.files.length === 0) return true;
        else return false;
    }
}

function __delete__(el) {
    if (el.files.length === 0) {
        el.$.label.style.setProperty("top", "");
        el.$.label.style.setProperty("font-size", "");
        el.$.text.value = "";
        return;
    }
    el.$.label.style.setProperty("top", "10px");
    el.$.label.style.setProperty("font-size", "12px");
    if (el.files.length > 1)
        el.$.text.value = el.files.length + " Files Selected";
    else
        el.$.text.value = el.files[0].name;
    el.queryAll("#xo-items td a").forEach(e => {
        e.addEventListener("click", e => {
            e.preventDefault();
            delete el.files[e.target.dataset.index];
            e.target.parentElement.remove();
            __callback__(el);
        });
    });
}

function __callback__(el) {
    var files = { length: 0 };
    el.$.items.innerHTML = "";
    Object.keys(el.files).forEach(k => {
        if (k !== "length") {
            var icon, type = el.files[k].type.split("/")[0];
            switch (type) {
                case "image":
                    icon = "image";
                    break;
                case "video":
                    icon = "video";
                    break;
                case "audio":
                    icon = "audio";
                    break;
                case "application":
                    icon = "application";
                    break;
                default:
                    icon = "document";
                    break;
            }
            files[files.length] = el.files[k];
            el.$.items.innerHTML = `<tr><td><div><svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">${ICONS[icon]}</svg>${el.files[k].name}</div><a data-index="${files.length}" href>&times;</a></td></tr>` + el.$.items.innerHTML;
            files.length = files.length + 1;
        }
    });
    el.files = files;
    __delete__(el);
}