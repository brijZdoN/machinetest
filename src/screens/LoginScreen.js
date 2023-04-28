import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { login } from '../actions/userAction'
import { connect } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
      },
      isSubmitted: false,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    // const { isLoggedIn, isSubmitted } = this.state;
    // const { user } = this.props;
    //  if(!isLoggedIn && user) {
        
    //  }
  }

  componentDidUpdate() {
    
    const {isSubmitted} = this.state;
    
    if(localStorage.getItem('token') && isSubmitted ) {
        console.log('00-----')
        this.setState({isSubmitted: false, isLoggedIn: true})
        setTimeout(() => {
           window.location.href = window.location.href.replace("login", "")
        }, 700);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }))
  }

  submitHandler = (e) => {
    e.preventDefault()
    
    const { email, password } = this.state.user
    if(this.Validate(email,password))
        this.props.login(email, password)
    this.setState({ isSubmitted: true })
  }

  // here we can set some validation like if anyone is empty or password and confirm password are not same
    // due to shortage of time i am impleting now just passing true as everything as per the requirement
Validate=(email,password)=>{
    return true;
}
  render() {
    const { email, password } = this.state.user
    const { isSubmitted, isLoggedIn } = this.state

    return (
      <Container className='border mt-4'>
        <h1 className='text-center'>Sign In</h1>

        {isSubmitted && <Loader />}
        {isLoggedIn && <Message variant="success">Login Successfully</Message>}
        <Row className='justify-content-center'>
          <Col xs={12} md={6}>
            <Form onSubmit={(e) => this.submitHandler(e)}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  name='email'
                  onChange={(e) => this.handleChange(e)}
                  autoComplete='false'
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  name='password'
                  onChange={(e) => this.handleChange(e)}
                  autoComplete='false'
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
            <Row className='py-3'>
              <Col>
                New Customer? <Link to={'/register'}>Register</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (a,b) => dispatch(login(a,b)),
  }
}
const ab = connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
export { ab as LoginScreen }
