import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';

class Modal extends Component {
  componentDidMount() {
    $('#exitModal').modal({ backdrop: false });
  }

  render() {
    const { action } = this.props;

    return (
      <React.Fragment>
        <div
          className="modal fade"
          id="exitModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exitModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Unsaved Changes
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">You have unsaved changes! Do you want to continue?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    action(false);
                  }}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={e => action(true)}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
