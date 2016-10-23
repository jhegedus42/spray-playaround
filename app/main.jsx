// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App.jsx';
//
// ReactDOM.render(
//   <App />,
//   document.body.appendChild(document.createElement('div'))
// );

import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement,SortableHandle, arrayMove} from 'react-sortable-hoc';
import $ from 'jquery';

var CustomEvents = (function() {
    var _map = {};

    return {
        subscribe: function(name, cb) {
            _map[name] || (_map[name] = []);
            _map[name].push(cb);
        },

        unsubscribe: function(name) {
            delete _map[name];
        },

        notify: function(name, data) {
            if (!_map[name]) {
                return;
            }

            // if you want canceling or anything else, add it in to this cb loop
            _map[name].forEach(function(cb) {
                cb(data);
            });
        }
    }
})();

const SortableListITEM_SELECTION = "SortableListItemSelection";
const DragHandle = SortableHandle(() => <span>::::</span>); // This can be any component you want

const selectItem= function(id) {
    console.log("Selected item with id = " + id);
    CustomEvents.notify(SortableListITEM_SELECTION, {selectedId:id});
}
const SortableItem = SortableElement(({value,index}) => <li > <DragHandle />{value}
      <span onClick={()=>{selectItem(value); console.log('index='+index+' value='+value)}}>pina</span>
    </li>);

const SortableList = SortableContainer(({items}) => {

    return (
        <ul>
            {items.map((value, index) =>
                <SortableItem
                              key={`item-${index}`} index={index} value={value} />
            )}
        </ul>
    );
});

var DetailPane = React.createClass({

    getInitialState: function() {
        return {selectedId: null};
    },

    componentDidMount: function() {

        var that = this;
        CustomEvents.subscribe(this.props.eventQ, function(data) {
            that.setState({selectedId:data.selectedId});
            console.log("subscriber called")
        });

    },

    componentDidUnMount: function() {
        CustomEvents.unsubscribe(this.props.eventQ);
    },

    render: function() {
        return (
            <div className="detailPane">
                <p>This is the details pane.</p>

                <div id="detailText"/>

                <p>Selected item = {this.state.selectedId} </p>
                <button onClick={()=>console.log("fasz")}>Click me</button>

            </div>
        );
    }
});

class SortableComponent extends Component {
    state = {
        items: ['Item 2', 'Item 1', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });

        var bla=this.state.items
        $.ajax({
          url: "http://localhost:3300/api/comments",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'POST',
          data: JSON.stringify(bla)
        });
        console.log('bla='+this.state.items)
    };
    render() {
        return (
            <div>
                <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle={true}/>
                <hr/>
                {console.log("log:"+SortableListITEM_SELECTION)}
                <DetailPane eventQ={SortableListITEM_SELECTION}/>
            </div>
        )
    }
}

render(<SortableComponent/>, document.body.appendChild(document.createElement('div')));

// i want that the text of a selected list element changes when editing the details page
// => add a button, when i click on it it changes the text
// => we need to update the global state
// => we need to find the element to be updated in the global state and call setState
// => pass the state to selectItem function
// => create a separate state component

// update a selected WHAT ?

