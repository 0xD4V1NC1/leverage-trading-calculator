import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import Container from '../components/UI/Container';
import Calculator from '../components/Components/Calculator';

const Home: NextPage = () => (
  <Layout noFooter>
    <div className="min-h-screen bg-white dark:bg-primary-dark-500">
      <Container>
        <div className="pt-8">
          <h1 className="text-center text-4xl font-semibold text-black dark:text-white">Leverage Trading Calculator</h1>
        </div>
        <div className="pt-8 flex justify-center">
          <Calculator />
        </div>
      </Container>
    </div>
  </Layout>

);

export default Home;
