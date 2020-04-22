import React from 'react';
import { Spare } from './Square'
import { createTileSet, rotateTile, moveTiles, TileSet } from './Tile'
import Board from './Board'
import './Game.scss'


class Game extends React.Component<any, TileSet> {
  constructor(props: any) {
    super(props)
    this.state = createTileSet()
  }

  handleSpareClick() {
    this.setState({
      board: this.state.board,
      spare: rotateTile(this.state.spare)
    })
  }

  handleBoardClick(squareIndex: number) {
    this.setState(moveTiles(this.state, squareIndex))
  }

  render() {
    return (
      <div className="game">
        <Board
          board={this.state.board}
          playSpareTile={this.handleBoardClick.bind(this)}
        />
        <div className="game-info">
          <div aria-labelledby="spare-label">
            <Spare
              key={50}
              tile={this.state.spare}
              rotateSpare={this.handleSpareClick.bind(this)}
            />
          </div>
          <span id="spare-label">
            Spare tile
          </span>
          <div>
            <p>Lorem ipsum <a href="#asdf">dolor sit amet</a>, consectetur adipiscing elit. Mauris purus mi, posuere in ex ut, commodo aliquet sem. Curabitur non metus in lorem pharetra imperdiet ut eu risus. Pellentesque gravida leo enim, sed ullamcorper enim porttitor ac. Donec ullamcorper purus a leo pretium, in euismod nibh tristique. Nunc aliquet augue nec nunc viverra, ac semper velit facilisis. Nulla aliquam quis lectus vel faucibus. Nulla facilisi. Pellentesque vel purus lacus. Vestibulum dignissim diam nec dolor consectetur, et molestie sem pharetra. Vestibulum at sodales ipsum. Morbi consectetur orci nibh, et aliquam orci accumsan at.</p>
            <p>Suspendisse potenti. Sed lectus lorem, bibendum a ligula a, varius rutrum purus. Ut nec tortor mi. Sed pretium semper quam ut pulvinar. Nam metus lacus, dictum at rhoncus quis, dapibus id quam. Sed interdum nisi id iaculis tempor. Nam magna leo, fringilla sed posuere ac, tincidunt a urna. Morbi ut auctor lorem. In hac habitasse platea dictumst. Mauris mollis nulla sed diam sollicitudin elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean massa dui, luctus efficitur fringilla quis, semper in nunc.</p>
            <p>Donec id tempor tortor, et ullamcorper augue. Donec euismod, arcu eget ornare pretium, lacus nunc dignissim nisi, nec consectetur metus velit vel eros. Duis eget ligula a nulla vulputate pretium sed in felis. Fusce enim urna, volutpat sed feugiat id, venenatis non nisi. Sed at cursus nibh. Curabitur nec turpis nibh. Donec semper enim id placerat pharetra. Suspendisse faucibus eget turpis placerat mollis. Proin sem nunc, maximus et malesuada at, facilisis at lacus. Nulla facilisi. Aliquam laoreet, sapien ut pretium luctus, diam quam imperdiet nunc, non lacinia felis elit at elit. Integer congue libero id viverra fringilla. Quisque hendrerit, metus et molestie aliquet, erat ante rutrum justo, at molestie velit massa nec leo. Curabitur feugiat velit eros, sed tristique metus venenatis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam imperdiet magna porttitor ultricies porta.</p>
            <p>Fusce condimentum iaculis mi, ut malesuada mi malesuada ut. Ut luctus bibendum sem et gravida. Ut dolor metus, viverra maximus nunc ut, laoreet ornare eros. Nulla vehicula viverra urna, nec consequat lacus. Fusce ut ipsum vitae odio interdum lobortis eu consequat diam. Donec sed elit at mauris tincidunt finibus et ut est. Nullam efficitur tellus quis augue consequat gravida. Sed pretium quam quis interdum venenatis. Mauris aliquet metus consectetur ultricies semper. Fusce tempor odio risus, nec cursus felis vulputate nec. Sed rhoncus dolor auctor lorem lobortis, eu luctus diam rutrum. Suspendisse in nulla non magna tempor viverra.</p>
            <p>Cras quis risus ac turpis condimentum auctor id eu magna. Sed neque eros, rhoncus at est nec, scelerisque auctor ante. Curabitur efficitur tellus sed nisl aliquet consectetur. Morbi molestie, felis non pellentesque vehicula, nisi lorem pulvinar nisi, nec vulputate urna sapien id tellus. Nam id lacus nec lacus luctus tempor non ac sem. Praesent pretium egestas sodales. Nunc at lorem varius, bibendum ligula a, porttitor nunc. Vivamus bibendum urna id massa laoreet, quis aliquet velit efficitur. Aliquam scelerisque enim non tortor interdum, a luctus magna rhoncus. Aenean ullamcorper auctor iaculis. Integer egestas et odio at commodo. Sed condimentum augue et nibh porta iaculis.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
