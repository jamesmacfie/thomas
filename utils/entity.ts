export const entityToValue: (entity: Entity, str?: string) => string = (entity, str = '--') => {
  let state;
  if (typeof entity === 'undefined') {
    state = str;
  } else {
    state = entity.state !== 'unknown' ? entity.state.toString() : str;
  }
  return state;
};
