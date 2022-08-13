/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Button from '../UI/Button';

type Direction = 'short' | 'long';

const CalculatorSchema = Yup.object().shape({
  direction: Yup.mixed<Direction>().oneOf(['short', 'long']).required('This field is required'),
  collateral: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
  currentPrice: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
  willingToRiskPercentage: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
  leverage: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
  riskToRewardRatio: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
});

// const FormLabel = () => ();
const Result = ({ text, number, isPercent }: { text: string, number: any, isPercent?: boolean }) => (
  <div className="flex">
    <p className="">{text}</p>
    <p className="">
      &nbsp;
      {number.toFixed(2)}
      {isPercent ? '%' : ''}
    </p>
  </div>
);

const Calculator = () => {
  const [stopPrice, setStopPrice] = useState<number>(0);
  const [takeProfit, setTakeProfit] = useState<number>(0);
  const [maxLost, setMaxLost] = useState<number>(0);
  const [maxProfit, setMaxProfit] = useState<number>(0);
  const [assetPercentChange, setAssetPercentChange] = useState<number>(0);
  const [tradeDirection, setTradeDirection] = useState<Direction>('long');

  const sectionGroupClasses = 'grid grid-col-2 mb-4';
  const labelClasses = 'text-2xl text-semibold text-black dark:text-white mr-4';
  const fieldClasses = 'rounded-lg p-2';
  const errorMsgClasses = 'text-red-500';

  const doCalculations = (values:any) => {
    const {
      direction, collateral, willingToRiskPercentage, currentPrice, leverage, riskToRewardRatio,
    } = values; // long, 100, $10 or 10%, 1000, 40, 2
    setTradeDirection(direction);

    const totalDollarValue = (collateral * leverage); // 4000
    const sharesCanBuy = (collateral * leverage) / currentPrice; // 4 shares
    const liquidationPrice = (totalDollarValue - collateral) / sharesCanBuy; // should be ~975
    const perPercentRate = (currentPrice - liquidationPrice) / 100; // divided by 100 b/c 100%... in example should be .25 per 1% leverage gain
    const maxPossibleLost = collateral * (willingToRiskPercentage / 100);
    const maxPossibleProfit = maxPossibleLost * riskToRewardRatio;

    if (direction === 'long') {
      const stopLostPrice = currentPrice - (willingToRiskPercentage * perPercentRate); // 997.5 --> which would be a $10 and 10% lost... (@TODO is this dollar or percent?)
      const targetProfit = (willingToRiskPercentage * riskToRewardRatio); // WTR $10 and RtR is 2... so 10 * 2
      const takeProfitPrice = currentPrice + (targetProfit * perPercentRate);
      const percentIncreaseNeeded = ((takeProfitPrice - currentPrice) / currentPrice) * 100;

      setTakeProfit(takeProfitPrice);
      setStopPrice(stopLostPrice);
      setMaxLost(maxPossibleLost);
      setMaxProfit(maxPossibleProfit);
      setAssetPercentChange(percentIncreaseNeeded);
    } else if (direction === 'short') {
      const stopLostPrice = currentPrice + (willingToRiskPercentage * perPercentRate); // 997.5 --> which would be a $10 and 10% lost... (@TODO is this dollar or percent?)
      const targetProfit = (willingToRiskPercentage * riskToRewardRatio); // WTR $10 and RtR is 2... so 10 * 2
      const takeProfitPrice = currentPrice - (targetProfit * perPercentRate);
      const percentDecreaseNeeded = ((currentPrice - takeProfitPrice) / currentPrice) * 100;
      setTakeProfit(takeProfitPrice);
      setStopPrice(stopLostPrice);
      setMaxLost(maxPossibleLost);
      setMaxProfit(maxPossibleProfit);
      setAssetPercentChange(percentDecreaseNeeded);
    }
  };
  return (
    <div className="flex flex-col w-full">
      <Formik
        initialValues={{
          direction: 'long',
          collateral: 0,
          willingToRiskPercentage: 0,
          currentPrice: 0,
          leverage: 0,
          riskToRewardRatio: 0,
        }}
        onSubmit={(values) => doCalculations(values)}
        validationSchema={CalculatorSchema}
      >
        <Form className="flex flex-col justify-center bg-gray-100 dark:bg-[#121212] shadow-2xl dark:shadow-[#222] p-4 rounded-lg mx-auto w-4/5 md:w-1/2 border-[1px] border-black dark:border-white">
          <div id="direction-group" className={sectionGroupClasses}>
            <label className={labelClasses} htmlFor="direction">
              Direction
            </label>
            {/* <Field className={fieldClasses} id="direction" name="direction" /> */}
            <Field className={fieldClasses} as="select" name="direction">
              <option value="short">Short</option>
              <option value="long">Long</option>
            </Field>
            <ErrorMessage component="a" className={errorMsgClasses} name="direction" />
          </div>

          <div id="collateral-group" className={sectionGroupClasses}>
            <label className={labelClasses} htmlFor="collateral">
              Collateral
            </label>
            <Field className={fieldClasses} id="collateral" name="collateral" type="number" />
            <ErrorMessage
              component="a"
              className={errorMsgClasses}
              name="collateral"
            />
          </div>

          <div id="willing-to-risk-in-dollar-group" className={sectionGroupClasses}>
            <label className={labelClasses} htmlFor="willingToRiskPercentage">
              Willing to Risk (in %)
            </label>
            <Field className={fieldClasses} id="willingToRiskPercentage" name="willingToRiskPercentage" type="number" />
            <ErrorMessage
              component="a"
              className={errorMsgClasses}
              name="willingToRiskPercentage"
            />
          </div>

          <div id="current-price-group" className={sectionGroupClasses}>
            <label className={labelClasses} htmlFor="currentPrice">
              Current Price
            </label>
            <Field className={fieldClasses} id="currentPrice" name="currentPrice" type="number" />
            <ErrorMessage component="a" className={errorMsgClasses} name="currentPrice" />
          </div>

          <div id="leverage-group" className={sectionGroupClasses}>
            <label className={labelClasses} htmlFor="leverage">
              Leverage
            </label>
            <Field className={fieldClasses} id="leverage" name="leverage" type="number" />
            <ErrorMessage
              component="a"
              className={errorMsgClasses}
              name="leverage"
            />
          </div>

          <div id="risk-to-reward-ratio-group" className={sectionGroupClasses}>
            <label className={labelClasses} htmlFor="riskToRewardRatio">
              Risk to Reward Ratio (i.e. 2 : 1)
            </label>
            <Field className={fieldClasses} id="riskToRewardRatio" name="riskToRewardRatio" type="number" />
            <ErrorMessage
              component="a"
              className={errorMsgClasses}
              name="riskToRewardRatio"
            />
          </div>

          <div className="mt-8 flex justify-center">
            <Button type="submit" className="py-2 px-4 animate-bounce" text="Calculate" ariaLabel="calculate" color="primary" />
          </div>
        </Form>
      </Formik>
      <div className="text-xl md:text-3xl font-bold text-blue-400 mx-auto pt-8">
        <Result text="Stop Lost: $" number={stopPrice} />
        <Result text="Take Profit: $" number={takeProfit} />
        <Result text="Max Possible Lost: $" number={maxLost} />
        <Result text="Max Possible Profit: $" number={maxProfit} />
        {tradeDirection === 'long' ? (
          <Result text="Percent Increase Needed: " number={assetPercentChange} isPercent />
        ) : <Result text="Percent Decrease Needed: " number={assetPercentChange} isPercent />}
      </div>
    </div>
  );
};
export default Calculator;
