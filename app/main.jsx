// @flow
import React, {Component} from 'react';
import {render} from 'react-dom';
var _ = require('lodash');
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

const Event_UpdateSelectedID = "UpdateSelectedID";

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
        CustomEvents.subscribe(that.props.eventQ, function(data) {
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
                <button onClick={
                    ()=>CustomEvents.notify(Event_UpdateSelectedID, {selectedId:this.state.selectedId[1]}) }>
                    Click me
                </button>

            </div>
        );
    }
});


class SortableComponent extends Component {
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.props.items, oldIndex, newIndex)
        });

        var bla=this.props.items
        $.ajax({
          url: "http://localhost:3300/api/comments",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'POST',
          data: JSON.stringify(bla)
        });
        console.log('bla='+this.props.items)
    };
    render() {
        return (
            <div>
                <SortableList items={this.props.items} onSortEnd={this.onSortEnd} useDragHandle={true}/>
                <hr/>
                {console.log("log:"+SortableListITEM_SELECTION)}
                <DetailPane eventQ={SortableListITEM_SELECTION}/>
            </div>
        )
    }
}



class State extends Component {


    itemsV = ['Item 2', 'Item 1', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

    state = {
         items : _.zip(this.itemsV,_.range(6))
    }

    componentDidMount() {
        var that = this;
        CustomEvents.subscribe(Event_UpdateSelectedID, data=> {
            that.updateWithIdx(data,'pina')
            that.setState(this.state);
        });
    }

    render(){
        return (
            <SortableComponent items={this.state.items}></SortableComponent>
        )

    }
    updateWithIdx(el,v){
       var i=this.state.items.findIndex(x=>x[1]==el.selectedId)
       this.state.items[i][0]=v
    }
}

render(<State/>, document.body.appendChild(document.createElement('div')));

// i want that the text of a selected list element changes when editing the details page
// => add a button, when i click on it it changes the text
// => we need to update the global state
// => we need to find the element to be updated in the global state and call setState
// => pass the state to selectItem function

// update a selected WHAT ?

