import * as Yup from 'yup';

export const createDeviceView = Yup.object().shape({
  name: Yup.string().required('Please enter a name'),
  icon: Yup.string().required('Please enter an icon')
});
