define(['Tile'], function(Tile){

    var Main = function(){

        var board = new Array(50)
        
        // corners
        board[1]  = new Tile(1,  Tile.CORNER, Tile.RIGHT) // ⌈
        board[7]  = new Tile(7,  Tile.CORNER, Tile.DOWN)  // ⌉
        board[43] = new Tile(42, Tile.CORNER, Tile,LEFT)  // ⌋
        board[49] = new Tile(49, Tile.CORNER, Tile.UP)    // ⌊

        // t-shapes
        board[3]  = new Tile(3,  Tile.TSHAPE, Tile.DOWN)
        board[5]  = new Tile(5,  Tile.TSHAPE, Tile.DOWN)
        board[15] = new Tile(15, Tile.TSHAPE, Tile.RIGHT)
        board[17] = new Tile(17, Tile.TSHAPE, Tile.RIGHT)
        board[19] = new Tile(19, Tile.TSHAPE, Tile.DOWN)
        board[21] = new Tile(21, Tile.TSHAPE, Tile.LEFT)
        board[29] = new Tile(29, Tile.TSHAPE, Tile.RIGHT)
        board[31] = new Tile(31, Tile.TSHAPE, Tile.UP)
        board[33] = new Tile(33, Tile.TSHAPE, Tile.LEFT)
        board[35] = new Tile(35, Tile.TSHAPE, Tile.LEFT)
        board[45] = new Tile(45, Tile.TSHAPE, Tile.UP)
        board[47] = new Tile(47, Tile.TSHAPE, Tile.UP)

        this.board = board
    }

    Main.prototype.run = function() {
        
        var gameSpaces = [
            2,4,6,
            8,9,10,11,12,13,14,
            16,18,20,
            22,23,24,25,26,27,28,
            30,32,34,
            36,37,38,39,40,41,42,
            44,46,48
        ] // 33

        var gameTiles = []
        for (var i = 0; i < 15; i++) {
            gameTiles.push(new Tile())
        }

    }

    return Main
})