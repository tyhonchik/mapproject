import React, { Component } from 'reactn';
import Map from '../../components/Map';

class Home extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
    };

    handleSubmit = e => {
        e.preventDefault();

        this.dispatch.searchv2(this.state.post);
    };

    render() {
        console.log(this.global);
        return (
            <div className="App">
                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <strong>Post to Server:</strong>
                    </p>
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.setState({ post: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>

                <Map points={this.global.coords} />
                {
                    // TODO: add Formik || Final-Form
                }
            </div>
        );
    }
}

export default Home;
