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
  // isLongTrade: Yup.boolean().required('This field is required'),
  collateral: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
  currentPrice: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
  willingToRiskPercentage: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
  leverage: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
  riskToRewardRatio: Yup.number().positive().typeError('you must specify a number').required('This field is required'),
});

const Result = ({
  text, number, isPercent, numberClasses,
}: { text: string, number: any, isPercent?: boolean, numberClasses?: string }) => (
  <div className="flex">
    <p>{text}</p>
    <p className={`${numberClasses || ''}`}>
      &nbsp;
      {isPercent ? '' : '$'}
      {number.toFixed(2)}
      {isPercent ? '%' : ''}
    </p>
  </div>
);

/* <div id="direction-group" className={sectionGroupClasses}>
          <label className={labelClasses} htmlFor="direction">
            Direction
          </label>
          <Field className={fieldClasses} as="select" name="direction">
            <option value="short">Short</option>
            <option value="long">Long</option>
          </Field>
          <ErrorMessage component="a" className={errorMsgClasses} name="direction" />
        </div> */

const Calculator = () => {
  const [stopPrice, setStopPrice] = useState<number>(0);
  const [takeProfit, setTakeProfit] = useState<number>(0);
  const [maxLost, setMaxLost] = useState<number>(0);
  const [maxProfit, setMaxProfit] = useState<number>(0);
  const [assetPercentChange, setAssetPercentChange] = useState<number>(0);
  const [isLong, setIsLong] = useState<boolean>(false);

  const sectionGroupClasses = 'grid grid-col-2 mb-4';
  const labelClasses = 'text-2xl text-semibold text-black dark:text-white mr-4 mb-4';
  const fieldClasses = 'rounded-lg p-2';
  const errorMsgClasses = 'text-red-500';
  // const tradeDirection = isLong ? 'long' : 'short';

  const doCalculations = (values:any) => {
    console.log('Values (doCalculations): ', values);
    const {
      direction, collateral, willingToRiskPercentage, currentPrice, leverage, riskToRewardRatio,
    } = values;

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
    } else {
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

  console.log('tradeDirection', isLong);
  return (
    <div className="flex flex-col w-full">
      <Formik
        initialValues={{
          direction: isLong ? 'long' : 'short',
          collateral: 0,
          willingToRiskPercentage: 0,
          currentPrice: 0,
          leverage: 0,
          riskToRewardRatio: 0,
        }}
        onSubmit={(values) => {
          console.log('shit was submitted');
          doCalculations(values);
        }}
        validationSchema={CalculatorSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col justify-center bg-gray-100 dark:bg-[#121212] shadow-2xl dark:shadow-[#222] p-4 rounded-lg mx-auto w-4/5 md:w-1/2">

            <div id="direction-group" className={sectionGroupClasses}>
              <label className={labelClasses} htmlFor="direction"> Trade Direction </label>
              <div className="flex w-full">
                <button
                  type="button"
                  name="direction"
                  // @TODO talk to Tim... why do i have to do inverse logic for this to work
                  value={isLong ? 'short' : 'long'}
                  onClick={(e) => {
                    const { value } = e.target as HTMLTextAreaElement;
                    console.log('toggle clicked');
                    console.log('value', value);
                    console.log('direction', values.direction);

                    setIsLong(!isLong);
                    setFieldValue('direction', value);
                  }}
                  className="flex w-full font-bold rounded-lg"
                >
                  <div className={`${isLong ? 'bg-green-500 text-black dark:text-white w-6/12' : 'bg-gray-100 text-black dark:bg-[#121212] dark:text-white w-5/12'} rounded-l-lg py-2`}>
                    <p>Long</p>
                  </div>
                  <div className={`w-1/12 border-solid ${isLong ? 'border-l-green-500 border-l-[20px] border-y-transparent border-y-[20px] border-r-0' : 'border-r-red-500 border-r-[20px] border-y-transparent border-y-[20px] border-l-0'} bg-gray-100 dark:bg-[#121212]`} />

                  <div className={`${isLong ? 'bg-gray-100 text-black dark:bg-[#121212] dark:text-white w-5/12' : 'bg-red-500 text-black dark:text-white w-6/12'} rounded-r-lg py-2`}>
                    <p>Short</p>
                  </div>
                </button>
              </div>
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

            <div id="willing-to-risk-in-percent-group" className={sectionGroupClasses}>
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
              <Button type="submit" className="py-2 px-4 animate-pulse" text="Calculate" ariaLabel="calculate" color="primary" />
            </div>
          </Form>
        )}

      </Formik>
      <div className="text-lg md:text-2xl font-bold text-black dark:text-white mx-auto p-8 bg-gray-100 dark:bg-[#121212] shadow-2xl dark:shadow-[#222] rounded-lg mt-8 w-4/5 md:w-1/2">
        <Result text="Stop Lost:" number={stopPrice} />
        <Result text="Take Profit:" number={takeProfit} />
        <Result text="Max Possible Lost:" number={maxLost} numberClasses="text-red-500" />
        <Result text="Max Possible Profit:" number={maxProfit} numberClasses="text-green-500" />
        {isLong ? (
          <Result text="Percent Increase Needed: " number={assetPercentChange} numberClasses="text-green-500" isPercent />
        ) : <Result text="Percent Decrease Needed: " number={assetPercentChange} numberClasses="text-red-500" isPercent />}
      </div>
    </div>
  );
};
export default Calculator;
