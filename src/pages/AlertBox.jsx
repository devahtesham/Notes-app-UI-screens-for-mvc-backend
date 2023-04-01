import Alert from 'react-bootstrap/Alert';

function AlertBox(props) {
    const {message} = props
  return (
    <>
      {[
        'danger'
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          {message}
        </Alert>
      ))}
    </>
  );
}

export default AlertBox;