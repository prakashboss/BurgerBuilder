import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxi/auxi";

const withErrorHandler = (WrapedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    constructor() {
      super();
      this.reqponseInterceptor = axios.interceptors.request.use((request) => {
        this.setState({
          error: null,
        });
        return request;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            error: error,
          });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqponseInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }
    errorCancelHandler = () => {
      this.setState({
        error: null,
      });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorCancelHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapedComponent {...this.props} />;
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
