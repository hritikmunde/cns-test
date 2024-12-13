import { State, Action, StateContext } from '@ngxs/store';

export interface YourStateModel {
  structures: any[]; 
}

export class AddStructure {
  static readonly type = '[Structure] Add';
  constructor(public payload: any) {} 
}

@State<YourStateModel>({
  name: 'yourState',
  defaults: {
    structures: []
  }
})
export class YourState {
  @Action(AddStructure)
  addStructure(ctx: StateContext<YourStateModel>, action: AddStructure) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      structures: [...state.structures, action.payload]
    });
  }
}
