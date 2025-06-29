import { Helmet } from 'react-helmet-async';

function About() {
  return (
    <div className="text-center mt-10">
      <Helmet>
        <title>About | Proof-Port</title>
        <meta name="description" content="Learn more about Proof-Port's mission and team." />
      </Helmet>
      <h1 className="text-3xl font-bold text-blue-600">About Proof-Port</h1>
      <p className="mt-4 text-gray-700">
        Proof-Port is dedicated to providing transparent supplier verification through blockchain technology.
      </p>
    </div>
  );
}

export default About;