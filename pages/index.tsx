/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';

const Home: NextPage = () => {
  const [leverage, setLeverage] = useState<number>(0);
  const [collateral, setCollateral] = useState<number>(0);
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [exitPrice, setExitPrice] = useState<number>(0);
  const [tradeDirection, setTradeDirection] = useState<'long' | 'short'>('long');
  return (
    <Layout>
      <div>
        <h2 className="text-red-500">Hello World</h2>
      </div>
    </Layout>

  );
};

export default Home;
