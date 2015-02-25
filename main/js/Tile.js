define(function(){
    var Tile = function(id, path, orientation, treasure){
        this.id          = id
        this.path        = path
        this.orientation = orientation
        this.treasure    = treasure
    }

    // orientation
    Tile.UP     = 1
    Tile.DOWN   = 2
    Tile.LEFT   = 3
    Tile.RIGHT  = 4

    // shape
    Tile.TSHAPE = 1
    Tile.LINE   = 2
    Tile.CORNER = 3

    return Tile
})