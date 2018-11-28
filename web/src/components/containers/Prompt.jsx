import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import Modal from './Modal';

class PromptDialog extends Component {
  callback = null;

  state = {
    open: false
  };

  componentDidMount() {
    window[Symbol.for('MODAL_UNSAVED_CHANGES')] = this.showModal;
  }

  componentWillUnmount() {
    delete window[Symbol.for('MODAL_UNSAVED_CHANGES')];
  }

  showModal = (callback) => {
    this.callback = callback;
    this.setState({ open: true });
  };

  dialogAction = (proceed) => {
    if (proceed) {
      return this.callback(true);
    }

    return this.setState({ open: false });
  };

  render() {
    const { when } = this.props;
    return (
      <div>
        <Prompt when={when} message={() => 'MODAL_UNSAVED_CHANGES'} />
        {this.state.open && <Modal action={this.dialogAction} />}
      </div>
    );
  }
}

export default PromptDialog;
