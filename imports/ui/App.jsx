import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import { withReducer
       , compose 
       } from "recompose";
import { Tasks } from '../api/tasks.js';
import { MainView } from './components/MainView.jsx';

// The state of our app, here you put every value that changes over time.
// Values that change from the server are put in the Subscriptions.
const model = {
    count: 0,
};

// Subscriptions sends incoming updates from the server down to view
const Subscription = withTracker (() => {
    return { sub: 
        { tasks: Tasks.find({}).fetch() 
        }
    }
});

// Update changes the state and can be used to send things to the server. 
// If you know reducers from Redux this is basically the same thing
const update = (mdl, msg) => {
    switch (msg.type) {
        case 'INCREMENT': 
            mdl.count += 1
            return mdl
        case 'DECREMENT': 
            mdl.count -= 1
            return mdl
        default:
            return mdl
    }
};
// This wires together the subscriptions and model so they work in harmony. 
// This is not necessary to understand to use the system.
const App = 
    withReducer('mdl', 'cmd', update, model);

export const View = compose(
  Subscription,
  App
  )(MainView);
