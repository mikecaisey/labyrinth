define(['Tile'], function(Tile){

    var Main = function(){

        var board = new Array(50)
        
        // corners
        board[1]  = new Tile(1, Tile.CORNER, Tile.RIGHT)
        board[7]  = new Tile(7, Tile.CORNER, Tile.DOWN)
        board[43] = new Tile(42, Tile.CORNER, Tile,LEFT)
        board[49] = new Tile(49, Tile.CORNER, Tile.UP)

        // t-shapes
        board[3]  = new Tile(3, Tile.TSHAPE, Tile.DOWN)
        board[5]  = new Tile(5, Tile.TSHAPE, Tile.DOWN)
        board[15] = new Tile(15, Tile.TSHAPE, Tile.RIGHT)
        board[17] = new Tile(17, Tile.TSHAPE, Tile.RIGHT)
        board[19] = new Tile(19, Tile.TSHAPE, Tile.DOWN)
        board[21] = new Tile(21, Tile.TSHAPE, Tile.LEFT)
        board[29] = new Tile(29, Tile.TSHAPE, Tile.RIGHT)
        board[31] = new Tile(31, Tile.TSHAPE, Tile.UP)
        board[33] = new Tile(33 Tile.TSHAPE, Tile.LEFT)
        board[35] = new Tile(35 Tile.TSHAPE, Tile.LEFT)
        board[45] = new Tile(45 Tile.TSHAPE, Tile.UP)
        board[47] = new Tile(47 Tile.TSHAPE, Tile.UP)

        this.board = board
    }

    Main.prototype.run = function() {

    }

    return Main
})