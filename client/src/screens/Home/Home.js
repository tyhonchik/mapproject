import React, { Component } from 'reactn';
import Map from '../../components/Map';

class Home extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleSubmit = e => {
        e.preventDefault();

        this.dispatch.search(this.state.post);
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

                <Map points={this.state.responseToPost} />
                {
                    // TODO: add Formik || Final-Form
                }
            </div>
        );
    }
}

export default Home;
