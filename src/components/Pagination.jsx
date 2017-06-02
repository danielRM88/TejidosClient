import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { currentPage, totalPages, goToPage } = this.props
    var pages = [];
    var added = [];
    let addedElipsis = false;
    let css = "";
    if (totalPages<=6) {
      for(var i=1; i<=totalPages; i++) {
        let page = i;
        css = "";
        if (i===currentPage) {
          css = "active";
        }
        added.push(i);
        pages.push(<li key={i} className={`page-item ${css}`}><a className="page-link" href="#" onClick={(event) => {event.preventDefault(); goToPage(page)}}>{i}</a></li>)
      }
    } else {
      for(var i=1; i<=3; i++) {
        let page2 = i;
        css = "";
        if (i===currentPage) {
          css = "active";
        }
        if(!added.includes(i)) {
          added.push(i);
          pages.push(<li key={i} className={`page-item ${css}`}><a className="page-link" href="#" onClick={(event) => {event.preventDefault(); goToPage(page2)}}>{i}</a></li>)
        }
      }

      if((currentPage - 6)>0) {
        pages.push(<li key="elipsis" className="page-item disabled"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>...</a></li>)
      }

      if(currentPage >= 3 && currentPage <= (totalPages-2)) {
        for(var i=currentPage-2; i<=currentPage; i++) {
          let page3 = i;
          css = "";
          if (i===currentPage) {
            css = "active";
          }
          if(!added.includes(i)) {
            added.push(i);
            pages.push(<li key={i} className={`page-item ${css}`}><a className="page-link" href="#" onClick={(event) => {event.preventDefault(); goToPage(page3)}}>{i}</a></li>)
          }
        }

        for(var i=currentPage; i<=currentPage+2; i++) {
          let page4 = i;
          css = "";
          if (i===currentPage) {
            css = "active";
          }
          if(!added.includes(i)) {
            added.push(i);
            pages.push(<li key={i} className={`page-item ${css}`}><a className="page-link" href="#" onClick={(event) => {event.preventDefault(); goToPage(page4)}}>{i}</a></li>)
          }
        }
      } else {
        if((currentPage - 6)<=0) {
          pages.push(<li key="elipsis2" className="page-item disabled"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>...</a></li>)
        }
      }

      if((currentPage+5)<totalPages) {
        if(currentPage >= 3 && currentPage <= (totalPages-2)) {
          pages.push(<li key="elipsis3" className="page-item disabled"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>...</a></li>)
        }
      }

      for(var i=totalPages-2; i<=totalPages; i++) {
        let page5 = i;
        css = "";
        if (i===currentPage) {
          css = "active";
        }
        if(!added.includes(i)) {
          added.push(i);
          pages.push(<li key={i} className={`page-item ${css}`}><a className="page-link" href="#" onClick={(event) => {event.preventDefault(); goToPage(page5)}}>{i}</a></li>)
        }
      }
    }
    if(totalPages > 1) {
      return (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#" onClick={(event) => {event.preventDefault(); goToPage(currentPage-1)}}>Previous</a></li>
            {pages}
            <li className="page-item"><a className="page-link" href="#" onClick={(event) => {event.preventDefault(); goToPage(currentPage+1)}}>Next</a></li>
          </ul>
        </nav>
      )
    } else {
      return <div></div>
    }
  }
})