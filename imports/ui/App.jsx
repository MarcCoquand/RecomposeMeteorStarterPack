import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import { withReducer
       , compose 
       , withProps
       , withContext} from "recompose";
import { Tasks } from '../api/tasks.js';
import { matches } from 'z';

// The state of our app, here you put every value that changes over time.
// Values that change from the server are put in the Subscriptions.
const initModel = {
    count: 0,
    loggedIn: false,
};

// Subscriptions sends incoming updates from the server
const Subscription = withTracker (() => {
    return { sub: 
        { tasks: Tasks.find({}).fetch() 
        }
    }
});

// Update changes the state and can be used to send things to the server. 
// If you know reducers from Redux this is basically the same thing
const Update = (mdl, msg) => {
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

// The view to be rendered rendered. Every view function should be
// pure meaning that you should never assign any variables and change any values
// in this function. Instead you should call a msg reducer.
const TaskView = ({text}) => 
  <div> 
     <li>{text}</li>
  </div>;

const RenderTasks = ({tasks}) =>{ 
  return tasks.map(task => <TaskView key={task._id} text={task.text}/>);
}

const MainView = ({mdl,cmd,sub}) =>
  <div>
    {mdl.count}
    <div>
      <button onClick={() => cmd({type: 'INCREMENT'})}>+</button>
      <button onClick={() => cmd({type: 'DECREMENT'})}>-</button>
    </div>
    <RenderTasks tasks={sub.tasks}/>
  </div>;



// This wires together the subscriptions and model so they work in harmony. 
// This is not necessary to understand to use the system.
const App = 
    withReducer('mdl', 'cmd', Update, initModel);

export const View = compose(
  Subscription,
  App
  )(MainView);
