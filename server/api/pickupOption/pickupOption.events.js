/**
 * PickupOption model events
 */

'use strict';

import {EventEmitter} from 'events';
import PickupOption from './pickupOption.model';
import * as PickupOptionLogic from '../../components/utils/pickupOption.logic';
import _ from 'lodash';
var PickupOptionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PickupOptionEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  PickupOption.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PickupOptionEvents.emit(event + ':' + doc._id, doc);
    PickupOptionEvents.emit(event, doc);
  };
}

PickupOptionEvents.on('remove', pickupOption => {
  PickupOptionLogic.onRemovePickupOption(pickupOption);
});

PickupOptionEvents.on('save', pickupOption => {
  PickupOptionLogic.onUpdatePickupOption(pickupOption);
});

export default PickupOptionEvents;
