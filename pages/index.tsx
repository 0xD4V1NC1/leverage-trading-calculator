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
      <footer>
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400 text-xs">
          For feature requests, please email me at
          {' '}
          <a href="mailto:0xD4V1NC1@gmail.com" className="hover:text-primary-400"> 0xD4V1NC1@gmail.com</a>
          {' '}
        </p>
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400 text-xs">© 0xD4V1NC1 All rights reserved. Crafted by 0xD4V1NC1</div>
      </footer>
    </div>

  </Layout>

);

export default Home;
