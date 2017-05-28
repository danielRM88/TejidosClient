import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { currentPage, totalPages, goToPage } = this.props
    var pages = [];
    var added = [];
    let addedElipsis = false;
    let css = "btn btn-default";
    if (totalPages<=6) {
      for(var i=1; i<=totalPages; i++) {
        let page = i;
        css = "btn btn-default";
        if (i===currentPage) {
          css = "btn btn-default active";
        }
        added.push(i);
        pages.push(<button key={i} className={css} onClick={(event) => goToPage(page)}>{i}</button>);
      }
    } else {
      for(var i=1; i<=3; i++) {
        let page2 = i;
        css = "btn btn-default";
        if (i===currentPage) {
          css = "btn btn-default active";
        }
        if(!added.includes(i)) {
          added.push(i);
          pages.push(<button key={i} className={css} onClick={(event) => goToPage(page2)}>{i}</button>);
        }
      }

      if((currentPage - 6)>0) {
        pages.push(<button key="elipsis" className="btn btn-default">...</button>);
      }

      if(currentPage >= 3 && currentPage <= (totalPages-2)) {
        for(var i=currentPage-2; i<=currentPage; i++) {
          let page3 = i;
          css = "btn btn-default";
          if (i===currentPage) {
            css = "btn btn-default active";
          }
          if(!added.includes(i)) {
            added.push(i);
            pages.push(<button key={i} className={css} onClick={(event) => goToPage(page3)}>{i}</button>);
          }
        }

        for(var i=currentPage; i<=currentPage+2; i++) {
          let page4 = i;
          css = "btn btn-default";
          if (i===currentPage) {
            css = "btn btn-default active";
          }
          if(!added.includes(i)) {
            added.push(i);
            pages.push(<button key={i} className={css} onClick={(event) => goToPage(page4)}>{i}</button>);
          }
        }
      } else {
        if((currentPage - 6)<=0) {
          pages.push(<button key="elipsis2" className="btn btn-default">...</button>);
        }
      }

      if((currentPage+5)<totalPages) {
        if(currentPage >= 3 && currentPage <= (totalPages-2)) {
          pages.push(<button key="elipsis3" className="btn btn-default">...</button>);
        }
      }

      for(var i=totalPages-2; i<=totalPages; i++) {
        let page5 = i;
        css = "btn btn-default";
        if (i===currentPage) {
          css = "btn btn-default active";
        }
        if(!added.includes(i)) {
          added.push(i);
          pages.push(<button key={i} className={css} onClick={(event) => goToPage(page5)}>{i}</button>);
        }
      }
    }
    if(totalPages > 1) {
      return (
        <div>
          <button type="button" className="btn btn-default" onClick={(event) => goToPage(currentPage-1)}>Previous</button>
          {pages}
          <button type="button" className="btn btn-default" onClick={(event) => goToPage(currentPage+1)}>Next</button>
        </div>
      )
    } else {
      return <div></div>
    }
  }
})