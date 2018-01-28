/* flow */
'use strict' 
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import {View} from '../imports/ui/App.jsx';
 
Meteor.startup(() => {
  render(<View />, document.getElementById('render-target'));
});
