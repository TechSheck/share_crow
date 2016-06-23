import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getSession } from '../actions/sessionActions.js';
import Landing from './Landing.js';
import NavBar from './NavBar.js';
// import Login from './Login.js';
// import NavbarLoggedIn from './NavbarLoggedIn.js';
import Footer from './Footer.js';
import ProductCarousel from './ProductCarousel.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.products = [  // change this later with listings from database
      {
        name: 'Tent',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
        ownerId: 1,
        rentalFee: 25,
        User: { username: 'Cathy' },
      },
      {
        name: 'Grill',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
        ownerId: 2,
        rentalFee: 30,
        User: { username: 'Justin' },
      },
      {
        name: 'Fishing Rod',
        price: '$10/day',
        owner: 'caathylee',
        image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
        ownerId: 3,
        rentalFee: 15,
        User: { username: 'Arthur' },
      },
    ];

    this.state = {
      isLoggedIn: false,
    };
    this.login = this.login.bind(this, 'Scrum_Lord', 'password');
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    this.methods = this.props.methods;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.session.hasOwnProperty('username')) {
      console.log('session!: ', nextProps.session);
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  login(user, pw) {
    console.log(`logging in as ${user}`);
    const data = {
      username: user,
      password: pw,
    };
    let query = [];
    Object.keys(data).forEach(key => query.push(`${key}=${data[key]}`));
    query = query.join('&');
    this.methods.getSession(query);
  }

  signup() {
    const data = {
      username: 'Scrum_Lord',
      password: 'password',
      email: 'scrum_vader@gmail.com',
      address: 'Death Star, CA 90210',
      phoneNumber: '123-456-7890',
      aboutMe: 'Give me yo WAFFLE FRIES?!!?!',
    };

    this.methods.postUser(data);
  }

  render() {
    return (
      <div id="app">
        <NavBar isLoggedIn={this.state.isLoggedIn} login={this.login} signup={this.signup} />
        <Landing />
        <ProductCarousel products={this.products} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  listing: PropTypes.array.isRequired,
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, session } = state;

  return {
    user,
    listing,
    session,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getUser: (id) => {
        dispatch(getUser(id));
      },
      postUser: (data) => {
        dispatch(postUser(data));
      },
      putUser: (data) => {
        dispatch(putUser(data));
      },
      deleteUser: (data) => {
        dispatch(deleteUser(data));
      },
      getListing: (id) => {
        dispatch(getListing(id));
      },
      postListing: (data) => {
        dispatch(postListing(data));
      },
      putListing: (data) => {
        dispatch(putListing(data));
      },
      deleteListing: (data) => {
        dispatch(deleteListing(data));
      },
      getSession: (data) => {
        dispatch(getSession(data));
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
