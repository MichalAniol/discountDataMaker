
var list = [];

var discountTypeData = [
    ["-", 0, [0]],
    ["Fresenius 6 op. 7%", 7, [6, 12, 18, 24, 30]],
    ["op 04", 5, [4, 8, 12, 16]],
    ["op 09 rolki 10%", 10, [9, 18, 27, 36, 45, 54]],
    ["op 10", 5, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110]],
    ["op 100", 5, [100, 200, 300, 400, 500, 600, 700, 800]],
    ["op 12", 5, [12, 24, 36, 48, 60, 72, 84, 96, 108, 120]],
    ["op 20", 5, [20, 40, 60, 80, 100, 120, 140, 160, 180, 200]],
    ["op 24", 5, [24, 48, 72, 96, 120, 144, 168]],
    ["op 25", 5, [25, 50, 75, 100, 125, 150, 175]],
    ["op 30", 5, [30, 60, 90, 120, 150, 180, 210]],
    ["op 35", 5, [35, 70, 105, 140, 175]],
    ["op 36", 5, [36, 72, 108, 144, 180, 216, 254]],
    ["op 40", 5, [40, 80, 120, 160, 200, 240, 280]],
    ["op 45", 5, [45, 90, 135, 180, 225]],
    ["op 5", 5, [5, 10, 15, 20]],
    ["op 50", 5, [50, 100, 150, 200, 250]],
    ["op 6", 5, [6, 12, 18, 24, 30]],
    ["op 60", 5, [60, 120, 180, 240, 300, 360]],
    ["op 65", 5, [65, 130, 195, 260, 320]],
    ["op 70", 5, [70, 140, 210, 280, 350]],
    ["op 8", 5, [8, 12, 24, 32, 40]],
    ["op 9", 5, [9, 18, 27, 36, 45, 54]],
    ["op 90", 5, [90, 180, 270, 360, 450, 540, 630]],
    ["test", 4, [10, 20, 30]]
];

function makeValue() {
    let item = document.getElementById("source");
    let r1 = item.value.split("[edytuj]");

    for (let r of r1) {
        r.replace("\n", "");
    }

    for (let r of r1) {
        let r2 = r.split("\t");

        if (r2[2] == "Brak") { continue }

        let index = null;
        for (let i = 0; i < discountTypeData.length; i++) {
            if (discountTypeData[i][0] == r2[2]) {
                index = i;
                break;
            }
        }

        if (index) {
            list[r2[1]] = index;
        }
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i] == undefined) { list[i] = 0 }
    }



    let r3 = "var discountProdData = [";

    for (let i = 0; i < list.length; i++) {
        r3 += list[i] + ((i == list.length - 1) ? "" : ", ");
        if (!((i + 10) % 60)) { r3 += "<br>" }
    }

    r3 += "];"

    document.getElementById("result").innerHTML = r3;

    let lines = [
        "      88                88",
        "      88                88",
        ".d888b88 .d8888b. .d888b88 .d8888b. 88d888b. .d8888b.",
        "88'  '88 88'  '88 88'  '88      '88 88'  '88 88'  '88",
        "88    88 88    88 88    88 .8888888 88    88 88.  .88",
        "88.  .88 88.  .88 88.  .88 88.  .88 88    88 88.  .88",
        "'8888P'8 '88888P' '8888P'8 '88888'8 88    88 '88888P'"
    ],
        spaces = '        ';


    let showOK = () => {
        let newValue = '\n\n\n';
        for (let l of lines) {
            newValue += spaces + l + '\n'
        }

        item.value = newValue;
    }
    showOK();

    let interval = setInterval(() => {
        spaces += ' ';
        showOK();
    }, 30);

    setTimeout(() => {
        clearInterval(interval);
        item.value = "";
    }, 1500);

    showData();
};

const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

let start = (back = "beige") => {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = back;
    ctx.fill();
}

start();

let showData = () => {
    let oneLine = 40,
        size = 5;

    let h = (Math.ceil(list.length / oneLine));

    let i = 0,
        shower = setInterval(() => {

            let line = Math.floor(i / oneLine),
                y = line * size;

            if (i == h * oneLine) {
                ctx.fillStyle = "beige";
                ctx.beginPath();
                ctx.rect(0, y, 200, 3);
                ctx.fill();

                clearInterval(shower)
                return
            }


            for (let k = 0; k < oneLine; k++) {
                if (i + k > list.length) {
                    ctx.fillStyle = "beige";
                } else {
                    if (list[i + k]) {
                        ctx.fillStyle = "#cf3d3d"; // data on
                    } else {
                        ctx.fillStyle = "#f1e1ca"; // data off
                    }
                }
                ctx.beginPath();
                ctx.rect(k * size, y, size, size);
                ctx.fill();
            }

            ctx.fillStyle = "red";

            ctx.beginPath();
            ctx.rect(0, y + size, 200, 2);
            ctx.fill();

            i += oneLine;
        }, 10, i, size, oneLine);
}

