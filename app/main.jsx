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
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import $ from 'jquery';

const SortableItem = SortableElement(({value}) => <li >{value} </li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
        </ul>
    );
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
                <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
        )
    }
}

render(<SortableComponent/>,
    document.body.appendChild(document.createElement('div')));