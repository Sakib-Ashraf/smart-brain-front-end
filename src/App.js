import React, { Component } from "react";
import Particles from "react-particles-js";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";
import Navigation from "./component/Navigation/Navigation";
import SignIn from "./component/SignIn/SignIn";
import Register from "./component/Register/Register";
import Logo from "./component/Logo/Logo";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Rank from "./component/Rank/Rank";
import Model from "./component/Model/Model";
import Profile from "./component/Profile/Profile";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 0.1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: false,
        mode: "repulse",
      },
      onclick: {
        enable: false,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: false,
};

const initState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    pet: '',
    age: '',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('https://immense-tor-84997.herokuapp.com/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data && data.id) {
					fetch(
						`https://immense-tor-84997.herokuapp.com/${data.id}`,
						{
							method: 'get',
							headers: {
								'Content-Type': 'application/json',
								authorization: token,
							},
						}
					)
						.then((response) => response.json())
						.then((user) => {
							if (user && user.email) {
								this.loadUser(user);
								this.onRouteChange('home');
							}
						})
						.catch(console.log);
				}
			})
			.catch(console.log);
    }
  }

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      };
      });}
    return;
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        pet: data.pet,
        age: data.age,
      },
    });
  };

  displayFaceBoxes = (boxes) => {
    if (boxes) {
      this.setState({ boxes });
    }
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://immense-tor-84997.herokuapp.com/imageurl', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			authorization: window.sessionStorage.getItem('token'),
		},
		body: JSON.stringify({
			input: this.state.input,
		}),
	})
		.then((response) => response.json())
		.then((response) => {
			if (response) {
				fetch('https://immense-tor-84997.herokuapp.com/image', {
					method: 'put',
					headers: {
						'Content-Type': 'application/json',
						authorization: window.sessionStorage.getItem('token'),
					},
					body: JSON.stringify({
						id: this.state.user.id,
					}),
				})
					.then((response) => response.json())
					.then((count) => {
						this.setState(
							Object.assign(this.state.user, { entries: count })
						);
					})
					.catch(console.log);
			}
			this.displayFaceBoxes(this.calculateFaceLocations(response));
		})
		.catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      return this.setState(initState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModel = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user } = this.state;
    return (
		<div className='App'>
			<Particles className='particles' params={particlesOptions} />
			<Navigation
				isSignedIn={isSignedIn}
				onRouteChange={this.onRouteChange}
				toggleModel={this.toggleModel}
			/>
			{isProfileOpen && (
				<Model>
					<Profile
						loadUser={this.loadUser}
						isProfileOpen={isProfileOpen}
						toggleModel={this.toggleModel}
						user={user}
					/>
				</Model>
			)}
			{route === 'home' ? (
				<div>
					<Logo />
					<Rank
						name={this.state.user.name}
						entries={this.state.user.entries}
					/>
					<ImageLinkForm
						onInputChange={this.onInputChange}
						onButtonSubmit={this.onButtonSubmit}
					/>
					<FaceRecognition boxes={boxes} imageUrl={imageUrl} />
				</div>
			) : route === 'signin' ? (
				<SignIn
					loadUser={this.loadUser}
					onRouteChange={this.onRouteChange}
				/>
			) : (
				<Register
					loadUser={this.loadUser}
					onRouteChange={this.onRouteChange}
				/>
			)}
		</div>
	);
  }
}

export default App;
