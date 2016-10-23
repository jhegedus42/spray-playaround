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

const MASTERLISTITEM_SELECTION = "masterListItemSelection";

const SortableListITEM_SELECTION = "SortableListItemSelection";
const DragHandle = SortableHandle(() => <span>::</span>); // This can be any component you want

const SortableItem = SortableElement(({value}) =>
    <li > <DragHandle />{value}
    <span onClick={console.log('pina')}>pina</span></li>);

const selectItem= function(id) {
    console.log("Selected item with id = " + id);
    CustomEvents.notify(SortableListITEM_SELECTION, {selectedId:id});
}

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

var DetailPane = React.createClass({

    getInitialState: function() {
        return {selectedId: null};
    },

    componentDidMount: function() {

        var that = this;
        CustomEvents.subscribe(this.props.eventQ, function(data) {
            that.setState({selectedId:data.selectedId});
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

                <p>Selected item = {this.state.selectedId && this.state.selectedId} </p>
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
                <DetailPane eventQ="{SortableListITEM_SELECTION}"/>
            </div>
        )
    }
}

render(<SortableComponent/>, document.body.appendChild(document.createElement('div')));
// render(<SortableComponent />,document.getElementById('content'));


var MasterPane = React.createClass({

    render: function() {
        return (
            <div>
                <MasterList masterListArray={masterListArray} />
                <hr/>
                <DetailPane eventQ="{MASTERLISTITEM_SELECTION}"/>
            </div>
        );
    }
});

var MasterList = React.createClass({

    getInitialState: function() {
        return {selectedId: null};
    },

    selectItem: function(id) {
        console.log("Selected item with id = " + id);
        this.setState({selectedId:id});
        CustomEvents.notify(MASTERLISTITEM_SELECTION, {selectedId:id});
    },

    render: function() {

        var that = this;

        var masterListItems = this.props.masterListArray.map(function(item) {
            return (
                <MasterListItem key={item.id} id={item.id}
                                onClick={that.selectItem}
                                selected={that.state.selectedId===item.id}>{item.name}</MasterListItem>
            );
        });

        return (
            <div>
                <p>This is the master list.</p>
                <ul>
                    {masterListItems}
                </ul>
            </div>
        );
    }

});

var MasterListItem = React.createClass({

    render: function() {

        return (
            <li onClick={this.props.onClick.bind(null,this.props.id)} style={{fontWeight: this.props.selected ? "bold" : "normal"}}>
                {this.props.children}
            </li>
        );
    }

});


var masterListArray = [

    {"id":1, "name":"test 1"},
    {"id":2, "name":"test 2"},
    {"id":3, "name":"test 3"}
];


{/*render(<MasterPane />,document.getElementById('content'));*/}
render(<MasterPane/>, document.body.appendChild(document.createElement('div')));
