import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux';
import { RootState } from './reducers'
import { TileDto } from './Tile'

const mapStateToProps = (state: RootState) => ({
  spare: state.spare
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  rotateSpare: (spare: TileDto) => {
    dispatch({ type: 'ROTATE_SPARE', value: spare })
  }
})

export type SpareProps = ReturnType<typeof mapDispatchToProps>
  & ReturnType<typeof mapStateToProps>

const _Spare: FunctionComponent<SpareProps> = ({ spare, rotateSpare }) =>
<button className="spare"
        id="spare-tile"
        onClick={() => rotateSpare(spare)}>
  <div className="spare">
    {spare.value}
  </div>
</button>

export const Spare = connect(mapStateToProps, mapDispatchToProps)(_Spare)
