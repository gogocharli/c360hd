import React, { useEffect, useState, useRef } from 'react';
import type { GetStaticProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from '@components/button';

export default function Checkout() {
  const { register, handleSubmit, errors } = useForm();
  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <BaseLayout pageMeta={{ title: 'Checkout' }}>
      <div className='wrapper'>
        <form action='post'>
          <div className='field'>
            <label htmlFor='company' className='field-label'>
              Business Name
            </label>
            <input type='text' name='company' id='company' ref={register()} />
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'site',
        'portfolio',
      ])),
    },
  };
};
