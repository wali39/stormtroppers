import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterForm = () => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted " style={{color:"white !important"}}>
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
           
            <Button variant="success" type="submit">
               Sign Up
            </Button>
        </Form>
    );
}

export default RegisterForm;