import React, { useState } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Button from '../UI/Button';

type Direction = 'short' | 'long';

const CalculatorSchema = Yup.object().shape({
  direction: Yup.mixed<Direction>().oneOf(['short', 'long']).required('This field is required'),
  'entry-price': Yup.number().typeError('you must specify a number').required('This field is required'),
  'exit-price': Yup.number().typeError('you must specify a number').required('This field is required'),
  collateral: Yup.number().typeError('you must specify a number').required('This field is required'),
  leverage: Yup.number().typeError('you must specify a number').required('This field is required'),
});

// const FormLabel = () => ();
const Calculator = () => {
  const [results, setResults] = useState<number>(0);
  const sectionGroupClasses = 'grid grid-col-2 mb-4';
  const labelClasses = 'text-2xl text-semibold text-black dark:text-white mr-4';
  const fieldClasses = 'rounded-lg p-2';
  const errorMsgClasses = 'text-red-500';

  const handleCalculate = (values: any) => {
    console.log('values:', values);
    const total = values['entry-price'] + values['exit-price'];
    setResults(total);
  };
  return (
    <div className="flex flex-col w-full">
      <Formik
        initialValues={{
          direction: 'short',
          'entry-price': 0,
          'exit-price': 0,
          collateral: 0,
          leverage: 0,
        }}
        onSubmit={(values) => handleCalculate(values)}
        validationSchema={CalculatorSchema}
      >
        <Form className="flex flex-col justify-center bg-gray-100 dark:bg-[#121212] shadow-2xl dark:shadow-[#222] p-4 rounded-lg mx-auto w-4/5 md:w-1/2">
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

          <div id="entry-price-group" className={sectionGroupClasses}>
            <label className={labelClasses} htmlFor="entry-price">
              Entry Price
            </label>
            <Field className={fieldClasses} id="entry-price" name="entry-price" type="number" />
            <ErrorMessage component="a" className={errorMsgClasses} name="entry-price" />
          </div>

          <div id="exit-price-group" className={sectionGroupClasses}>
            <label className={labelClasses} htmlFor="exit-price">
              Exit Price
            </label>
            <Field className={fieldClasses} id="exit-price" name="exit-price" type="number" />
            <ErrorMessage
              component="a"
              className={errorMsgClasses}
              name="exit-price"
            />
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

          <div className="mt-8 flex justify-center">
            <Button type="submit" className="py-2 px-4 animate-bounce" text="Calculate" ariaLabel="calculate" color="primary" />
          </div>
        </Form>
      </Formik>
      <div className="text-3xl font-bold text-blue-400 mx-auto pt-8">
        <p>
          Results:
          {' '}
          {results}
        </p>
      </div>
    </div>
  );
};
export default Calculator;
