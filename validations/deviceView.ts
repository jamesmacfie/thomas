import * as Yup from 'yup';

export const createDeviceView = Yup.object().shape({
  name: Yup.string().required('Please enter the name'),
  icon: Yup.string().required('Please select an icon')
});
