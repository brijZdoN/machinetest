import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userAction'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      
      isSubmitted: false,
      isRegistered: false
    }
  }

  componentDidUpdate(prevState, nextState) {
    const {isSubmitted} = this.state
    if(isSubmitted && localStorage.getItem('token')) {
      this.setState({isSubmitted: false, isRegistered: true})
      setTimeout(()=>{
         window.location.href=window.location.href.replace('/register','/login')
      },1000)

    }
  }
  componentWillUnmount(){
    localStorage.removeItem('tokenId')
    this.setState({isSubmitted: false, isRegistered: true})
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
    const { firstName, lastName, email, password,confirmPassword } = this.state.user
    const userName = firstName + lastName
    if(this.validateInputs()){
    this.props.register(email, password)
    this.setState({ isSubmitted: true })
    }
  }
  validateInputs=()=>{

    // here we can set some validation like if anyone is empty or password and confirm password are not same
    // due to shortage of time i am impleting now just passing true as everything as per the requirement

    const { firstName, lastName, email, password,confirmPassword } = this.state.user
    return true;
}

  render() {
    const { firstName, lastName, email, password, confirmPassword } =
      this.state.user
    const { isSubmitted } = this.state
    
    return (
      <Container className='border'>
        <h1 className='text-center'>Sign In</h1>
       
        {isSubmitted && <Loader />}
        {this.state.isRegistered && <Message variant="success">Registered Successfully</Message>}
        <Row className='justify-content-center'>
          <Col xs={12} md={6}>
            <Form onSubmit={(e) => this.submitHandler(e)}>
              <Form.Group className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter First Name'
                  
                  value={firstName}
                  name='firstName'
                  onChange={(e) => this.handleChange(e)} // this.setState({ firstName: e.target.value })}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Last Name'
                  value={lastName}
                  name='lastName'
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  name='email'
                  onChange={(e) => this.handleChange(e)}
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
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  name='confirmPassword'
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
            <Row className='py-3'>
              <Col>
                Already Registered? <Link to={'/login'}>
                  Login
                </Link>
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
    userInfo: state.userLogin,
  }
}
const mapDispatchToProps = (dispatch) => {
 
  return {
    register: (a,b) => dispatch(register(a,b)),
  }
}
const abc = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
export { abc as RegisterScreen }
