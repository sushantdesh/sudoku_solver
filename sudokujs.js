class sudoku_grid {
    constructor(dict1) {
        this.dict = dict1
        for (let r = 0; r < 9; r++) {
            let temp = {}
            for (let i = 0; i < 9; i++) {
                temp[i] = 0
                this.dict[r] = temp
            }
        }
    }


    update(row, col, val) {


        if (val === 0) {
            this.dict[row][col] = 0

            return true
        }
        if (this.check_col(row, val)) {
            if (this.check_row(col, val)) {
                if (this.check_small_grid(row, col, val)) {
                    this.dict[row][col] = val

                    return true
                }
            }
        }
        return false
    }


    check_row(col, val) {
        for (let i = 0; i < 9; i++) {
            if (this.dict[i][col] == val) {
                return false
            }
        }
        return true
    }

    check_col(row, val) {
        for (let i = 0; i < 9; i++) {
            if (this.dict[row][i] == val) {
                return false
            }
        }
        return true
    }

    check_small_grid(row, col, val) {
        if (row < 3) {
            var r_checkpoint = 0
        } else if (row < 6 && row >= 3) {
            var r_checkpoint = 3
        } else {
            var r_checkpoint = 6
        }

        if (col < 3) {
            var c_checkpoint = 0
        } else if (col < 6 && col >= 3) {
            var c_checkpoint = 3
        } else {
            var c_checkpoint = 6
        }
        for (let i = r_checkpoint; i < r_checkpoint + 3; i++) {
            for (let j = c_checkpoint; j < c_checkpoint + 3; j++) {
                if (this.dict[i][j] === val) {
                    return false
                }
            }
        }
        return true
    }


}

function generate_frame() {


    let maint = document.getElementById("table1")
    maint.style.borderCollapse = "collapse"
    for (let k = 0; k < 3; k++) {
        let trmain = document.createElement("tr")
        maint.appendChild(trmain)
        for (let l = 0; l < 3; l++) {
            let thmain = document.createElement("th")
            trmain.appendChild(thmain)
            let tab = document.createElement("table")

            for (let i = 0; i < 3; i++) {

                let tr = document.createElement("tr");
                tab.style.borderCollapse = "seperate"
                tab.style.borderSpacing = "10px"
                thmain.appendChild(tab)
                tab.appendChild(tr)
                for (let j = 0; j < 3; j++) {

                    let th = document.createElement("th");
                    let para = document.createElement("p");
                    // para.onclick = function () {
                    //     cell(k, l, i, j)
                    // }
                    para.style.outline = "gray solid 3px";
                    para.style.color = "whitesmoke"
                    para.contentEditable = "false"

                    let t = document.createTextNode("0");
                    tr.appendChild(th);
                    th.appendChild(para);
                    para.appendChild(t);
                }
            }
        }
    }


}

//
// function cell(a, b, c, d) {
//     console.log("clicked")
//     // var maintable = document.getElementById("table1")
//     // var current_para = maintable.rows[a].cells[b].childNodes[0].rows[c].cells[d].childNodes[0]
//     // current_para.style.background = "blue"
//
//
// }

// var list1=[]
function backtrack() {
    if (check_vacant_cells() === "false") {

        console.log("Complete")
        let s = document.getElementById("solve")
        s.style.color = "whitesmoke"
        s.style.background = "#4CAF50"
        s.style.outline = "#4CAF50"
        s.disabled = false
        return true
    } else {
        let res = check_vacant_cells()
        var row = res[0]
        var col = res[1]
        var a = parseInt(row / 3, 10)
        var c = row % 3
        var b = parseInt(col / 3, 10)
        var d = col % 3
    }

    var maintable = document.getElementById("table1")
    var current_para = maintable.rows[a].cells[b].childNodes[0].rows[c].cells[d].childNodes[0]
    for (let i = 1; i < 10; i++) {
        if (g.update(row, col, i)) {
            disp(a, b, c, d, i, current_para)

            // list1.push([a,b,c,d,i,current_para])

            if (backtrack()) {
                return true
            }
            undisp(row, col, current_para)
        }
    }

    return false

}


function disp(a, b, c, d, i, current_para) {
    // console.log("disp")
    //document.getElementById("nyt1").innerHTML=a
    current_para.innerHTML = i
    current_para.style.outline = "green solid 3px"
    current_para.style.color = "green"
    return true

}

function undisp(row, col, current_para) {
    g.update(row, col, 0)
    current_para.innerHTML = 0
    current_para.style.color = "whitesmoke"
    current_para.style.outline = "gray solid 3px"
    return true

}

var vacant = []

function check_vacant_cells_for_list() {
    for (let aa = 0; aa < 9; aa++) {
        for (let bb = 0; bb < 9; bb++) {

            if (g.dict[aa][bb] === 0) {
                vacant.push([aa, bb, 0,[]])
                for (let i=1;i<10;i++){
                    if(g.update(aa,bb,i)){
                        vacant[vacant.length-1][3].push(i)

                    }g.update(aa,bb,0)


                }

            }
        }

    }

}

function check_vacant_cells() {
    for (let aa = 0; aa < 9; aa++) {
        for (let bb = 0; bb < 9; bb++) {

            if (g.dict[aa][bb] === 0) {
                return [aa, bb]
            }
        }

    }
    return "false"
}

var inter
async function solve_vis(timeout) {

    check_vacant_cells_for_list()

    var i = 0
    inter = await setInterval(back, timeout)

    function back() {
        if (i >= vacant.length) {
            console.log("hey")
            vacant.length = 0
            let s = document.getElementById("solve")
            s.style.color = "whitesmoke"
            s.style.background = "#4CAF50"
            s.style.outline = "#4CAF50"
            s.disabled = false
            document.getElementById("myRange").disabled=false

            clearInterval(inter)

        } else {
            console.log(vacant[i])
            var a = parseInt(vacant[i][0] / 3, 10)
            var c = vacant[i][0] % 3
            var b = parseInt(vacant[i][1] / 3, 10)
            var d = vacant[i][1] % 3
            var maintable = document.getElementById("table1")
            var current_para = maintable.rows[a].cells[b].childNodes[0].rows[c].cells[d].childNodes[0]

            let num = vacant[i][2]
            if (num>=vacant[i][3].length){

                undisp(vacant[i][0], vacant[i][1], current_para)
                vacant[i][2] = 0
                i--
            } else {
                if (g.update(vacant[i][0], vacant[i][1], vacant[i][3][num])) {
                    disp(a, b, c, d, vacant[i][3][num], current_para)
                    i++
                } else {
                    vacant[i][2]++
                }
            }
        }


    }

}

function medium() {
    clearInterval(inter)
    vacant.length=0
    grid = [[2, 0, 0, 0, 0, 0, 5, 0, 0],
        [0, 5, 8, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 4, 7, 0, 1, 0],
        [0, 4, 2, 0, 8, 0, 0, 9, 0],
        [7, 0, 5, 9, 0, 0, 8, 0, 0],
        [0, 0, 0, 0, 3, 4, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 6],
        [8, 0, 6, 0, 0, 0, 7, 0, 0]]
    populate_frame(grid, "false")
    document.getElementById("reset").disabled = false
}

function easy() {
    clearInterval(inter)
    vacant.length=0
    grid = [[8, 3, 0, 0, 7, 0, 0, 0, 6],
        [0, 0, 9, 3, 0, 1, 5, 0, 2],
        [2, 0, 6, 0, 0, 0, 9, 3, 0],
        [6, 0, 2, 0, 8, 0, 0, 1, 5],
        [0, 0, 0, 0, 5, 0, 6, 2, 9],
        [1, 0, 3, 0, 0, 9, 8, 0, 0],
        [0, 7, 0, 0, 0, 0, 2, 5, 1],
        [0, 2, 0, 5, 3, 0, 0, 6, 0],
        [0, 6, 0, 2, 1, 0, 0, 9, 0]]
    populate_frame(grid, "false")
    document.getElementById("reset").disabled = false


}

function hard() {
    clearInterval(inter)
    vacant.length=0
    grid = [[0, 0, 0, 0, 3, 0, 6, 0, 0],
        [6, 0, 5, 0, 0, 0, 0, 0, 0],
        [0, 9, 0, 8, 0, 0, 1, 0, 0],
        [7, 6, 0, 0, 0, 0, 0, 0, 2],
        [0, 0, 9, 7, 0, 0, 0, 0, 0],
        [0, 3, 1, 0, 0, 2, 0, 0, 4],
        [0, 0, 0, 1, 0, 0, 7, 0, 0],
        [0, 2, 0, 0, 0, 9, 0, 0, 0],
        [0, 7, 0, 0, 4, 3, 0, 0, 5]]
    populate_frame(grid, "false")

    document.getElementById("reset").disabled = false

}

function reset() {
    clearInterval(inter)
    vacant.length=0
    console.log("reset")
    grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    populate_frame(grid, "false")
    let s = document.getElementById("solve")
    s.style.color = "gray"
    s.style.background = "whitesmoke"
    s.style.outline = "gray solid 1px"
    s.disabled = true


}

function populate_frame(grid, inp) {
    var dict = {}
    g = new sudoku_grid(dict)


    var maintable = document.getElementById("table1")


    for (let i = 0; i < 3; i++) {
        let table_rows = maintable.rows[i]
        for (let j = 0; j < 3; j++) {
            let table_cells = table_rows.cells[j]
            for (let k = 0; k < 3; k++) {
                let row1 = table_cells.childNodes[0].rows[k]
                for (let l = 0; l < 3; l++) {
                    let current_para = row1.cells[l].childNodes[0]
                    if (g.update((i * 3) + k, (j * 3) + l, grid[(i * 3) + k][(j * 3) + l])) {
                        if (inp === "true") {
                            grid[(i * 3) + k][(j * 3) + l] = current_para.innerText
                        } else {
                            current_para.innerText = grid[(i * 3) + k][(j * 3) + l]
                        }
                        if (grid[(i * 3) + k][(j * 3) + l] > 0) {
                            current_para.style.color = "black"
                            current_para.style.outline = "black solid 3px"

                        } else {

                            current_para.style.outline = "gray solid 3px"
                            current_para.style.color = "whitesmoke"

                        }
                    } else {
                        alert("your input doesn't follow sudoku rules, change the input and try again")
                        return false
                    }

                }
            }
        }
    }
    let s = document.getElementById("solve")
    s.style.color = "whitesmoke"
    s.style.background = "#4CAF50"
    s.style.outline = "#4CAF50"
    s.disabled = false
    console.log(g.dict)
    return true
}

function solve() {

    // Get the checkbox
    var checkBox = document.getElementById("check");
    // Get the output text

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        var timeout = document.getElementById("myRange").value
        document.getElementById("myRange").disabled=true


        solve_vis(timeout)

    } else {
        backtrack()
    }
    let s = document.getElementById("solve")
    s.style.color = "whitesmoke"
    s.style.background = "gray"
    s.style.outline = "gray"
    s.disabled = true
}
function speed_value() {
   document.getElementById("speed_v").innerText =document.getElementById("myRange").value
}
