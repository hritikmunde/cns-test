import { State, Action, StateContext } from '@ngxs/store';

export interface Structure {
  name?: string;
  id?: string;
}

export interface StructureStateModel {
  structures: Structure[];
  errorMessages: string[];
}

export class AddStructure {
  static readonly type = '[Structure] Add';
  constructor(public payload: Structure) {}
}

@State<StructureStateModel>({
  name: 'structure',
  defaults: {
    structures: [],
    errorMessages: []
  }
})
export class StructureState {
  @Action(AddStructure)
  addStructure(ctx: StateContext<StructureStateModel>, action: AddStructure) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      structures: [...state.structures, action.payload]
    });
  }
}
