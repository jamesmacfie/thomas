import React from 'react';
import * as yup from 'yup';
import PageWrapper from 'containers/pageWrapper';

let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function() {
    return new Date();
  })
});

const Home = () => {
  console.log(schema);
  return (
    <PageWrapper title="Home">
      <p>Home!</p>
    </PageWrapper>
  );
};

export default Home;
