/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */
export const NEXT_VERSE     = 'NEXT_VERSE';
export const PREVIOUS_VERSE = 'PREVIOUS_VERSE';
export const ENABLE_RECALL  = 'ENABLE_RECALL';
export const ENABLE_READ = 'ENABLE_READ';
export const CHANGE_MODE    = 'CHANGE_MODE';

export const PLAY_AUDIO  = 'PLAY_AUDIO';
export const PAUSE_AUDIO = 'PAUSE_AUDIO';

export const SINGLE_MODE = 'SINGLE_MODE';
export const MULTI_MODE  = 'MULTI_MODE';

// these could eventually be repalced with translation strings
export const MODES = {
  SINGLE_MODE : 'Single scripture mode',
  MULTI_MODE  : 'Multi scripture mode'
}

export const VERSE_STATES = {
  READ : 'Reading passage',
  RECALL : 'Assisted Recall',
  LISTEN : 'Looping over audio'
}
