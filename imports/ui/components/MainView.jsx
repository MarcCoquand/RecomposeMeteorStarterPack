import React from 'react';

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

export const MainView = ({mdl,cmd,sub}) =>
  <div>
    {mdl.count}
    <div>
      <button onClick={() => cmd({type: 'INCREMENT'})}>+</button>
      <button onClick={() => cmd({type: 'DECREMENT'})}>-</button>
    </div>
    <RenderTasks tasks={sub.tasks}/>
  </div>;



