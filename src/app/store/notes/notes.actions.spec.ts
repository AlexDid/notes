import * as fromNotes from './notes.actions';

describe('loadNotess', () => {
  it('should return an action', () => {
    expect(fromNotes.loadNotess().type).toBe('[Notes] Load Notess');
  });
});
