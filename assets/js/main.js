let main_starting_screen = document.querySelector(".main_starting_screen")
let game_board_screen = document.querySelector(".main_game_board_container")
let game_controls = document.querySelector(".controls")
let score_board = document.querySelector(".total_score")
let user_score = document.querySelector(".score")
let game_model = document.querySelector(".action_box")
let main_start_btn = document.querySelector("#main_start_btn")
let bg_audio = document.querySelector("#bg_audio")
let mine_click_audio = document.querySelector("#mine_click_audio")
let tile_click_audio = document.querySelector("#tile_click_audio")
let tile_hover_audio = document.querySelector("#tile_hover_audio")

let input_rows = document.querySelector("#input_rows")
let input_col = document.querySelector("#input_col")
let create_board_btn = document.querySelector("#create_board_btn")
let game_over_screen = document.querySelectorAll(".game_over")

let additional_btns = document.querySelectorAll(".additional_btns")
// let restart_btn = document.querySelector(".restart_btn")
let rows, columns, mine_index, score = 0
let is_game_over = false
let is_sfx_audio_enable = true
let is_bg_audio_enable = true




// ===============main_screen===========================
main_start_btn.addEventListener("click", () => {

    main_starting_screen.classList.add("hide_screen")
    game_board_screen.classList.remove("hide_screen")
    game_controls.classList.remove("hide_screen")
    game_model.classList.remove("hide_screen")
    if (is_bg_audio_enable) {
        bg_audio.play()
    }
})

// model_screen
//  get rows and columns from user
create_board_btn.addEventListener("click", () => {

    game_model.classList.add("hide_screen")
    score_board.classList.remove("hide_screen")

    if (input_col.value == "" || input_rows.value == "" || input_col.value > 10 || input_rows.value > 10 || input_rows.value < 3 || input_col.value < 3) {
        rows = 5
        columns = 5
        draw_board()
    } else {
        rows = Number(input_rows.value)
        columns = Number(input_col.value)
        draw_board()
    }

})


draw_board = () => {

    let append_container = document.querySelector(".game_container")
    let game_tiles = document.querySelectorAll(".tile")
    let tile_index = 0
    let rows_html = '<div class="tile_row"></div>'
    let column_html
    let html_child_row = 1

    // creating mash / board

    for (let r = 0; r < rows; r++) {

        append_container.insertAdjacentHTML("beforeend", rows_html)

        for (let c = 0; c < columns; c++) {

            column_html = `<div class="tile tile_hover tile_hide"  onclick="tile_click(${tile_index})" onmouseenter="tile_hover()"></div>`
            append_container.children[html_child_row].insertAdjacentHTML("beforeend", column_html)
            tile_index++
        }
        html_child_row++
    }

    //  choose random number to place bomb
    random_mine_index = () => {
        mine_index = Math.floor(Math.random() * (rows * columns) - 1)
        if (mine_index < 0) {
            random_mine_index()
        }
    }

    random_mine_index()

    console.log(mine_index)

}


tile_click = (tile_index) => {
    let game_tiles = document.querySelectorAll(".tile")

    game_tiles[tile_index].classList.remove("tile_hide")

    //    game_over
    if (tile_index === mine_index) {

        is_game_over = true

        game_tiles.forEach((elem) => {
            if (elem.classList[2] == "tile_hide") {
                elem.classList.add("remaning_tile_show")
            }
        })

        game_over_screen.forEach((elem) => {
            elem.classList.remove("hide_screen")
        })

        game_tiles[mine_index].classList.add("tile_bomb")

        if (is_sfx_audio_enable) {
            mine_click_audio.play()
        }
        
    } else {
        //  if game not over
        if (!is_game_over) {
            game_tiles[tile_index].classList.add("tile_dimond")
            score++
            user_score.innerHTML = `${"Score: "}${score}`

            if (is_sfx_audio_enable) {
                tile_click_audio.play()
            }
        }
    }
}

tile_hover = () => {
    if (is_sfx_audio_enable) {
        tile_hover_audio.play()
    }
}



// =======================================================
// sound control

additional_btns.forEach((elem) => {
    elem.addEventListener("click", () => {

        if (elem.id == "sfx_audio") {
            if (elem.classList[3] != "btn_active") {
                is_sfx_audio_enable = true
            } else {
                is_sfx_audio_enable = false
            }
        }
        if (elem.id == "bg_music_audio") {
            if (elem.classList[3] != "btn_active") {
                is_bg_audio_enable = true
                bg_audio.play()
            } else {
                is_bg_audio_enable = false
                bg_audio.pause()
            }
        }
        if (elem.id == "restart_btn") {
            location.reload()
        }

        // remove btn active class
        if (elem.classList[3] == "btn_active") {
            elem.classList.remove("btn_active")
        } else {
            elem.classList.add("btn_active")
        }
    })
})