import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadStatus: false,
			files: [],
		};
		// this.handleUploadImage = this.handleUploadImage.bind(this);
	}

	onDrop(files) {
		console.log(files);
		let name = files.map(n => n.name);
		console.log('name: ', name);
		this.setState({
			files,
			imgagePreview: null,
			name: name,
		});

		const data = new FormData();
		data.append('file', 'img/source');
		data.append('filename', 'url');

		console.log('data: ', data);

		axios.post('http://localhost:8000/upload', data).then(response => {
			console.log('response ', response);
			this.setState({ uploadStatus: true }).catch(err => console.log('err: ', err));
		});
	}

	sendAsync() {
		let fileName = this.state.files.map(f => f);
		// console.log('fileName: ', fileName);
		const data = new FormData();
		data.append('file', fileName);

		// console.log('data: ', data);
	}

	render() {
		let imagePreview = this.state.files.map(src => <img src={src.preview} alt="upload" key={src.name} />);
		return (
			<section className="container">
				<div className="dropzone">
					<Dropzone
						onDrop={this.onDrop.bind(this)}
						onClick={this.sendAsync.bind(this)}
						accept="image/png, image/jpeg, image/bmp"
					>
						<p>Try dropping files, or click to select files to upload</p>
					</Dropzone>
				</div>
				<aside>
					<h2>Dropped Files</h2>
					<ul>
						{this.state.files.map(f => (
							<li key={f.name}>
								{f.name} - {f.size} bytes
							</li>
						))}{' '}
					</ul>
					<h2>Image Preview</h2>
					{imagePreview}
				</aside>
			</section>
		);
	}
}

export default FileUpload;
