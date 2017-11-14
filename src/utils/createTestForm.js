import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

const Form = ({ children, initialValues }) => children;

const createTestForm = initialValues => connect(
    () => ({
        initialValues
    }),
    null,
)(
    reduxForm({
        form: 'mockForm',
    })(Form)
);

export default createTestForm;
