'use client';

import { useActionState, useEffect } from 'react';
import { updateProfile } from '../_lib/actions';

function UpdateProfileForm({ children, guest }) {
  const {
    fullName,
    email,
    nationality,
    nationalID,
    countryFlag,
  } = guest;

  //You can also use useFormStatus, for button loading indicator only:
  // https://chatgpt.com/c/697e74a6-fb78-838e-9b2c-0fc2c5ab6870
  // https://react.dev/reference/react-dom/hooks/useFormStatus
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    {
      nationality,
      nationalID,
    },
  );

  useEffect(() => console.log(isPending), [isPending]);

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={formAction}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          disabled
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          disabled
          defaultValue={email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">
            Where are you from?
          </label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">
          National ID number
        </label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button
          className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update profile'}
        </button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
