'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import {
  deleteBooking as deleteBookingService,
  getBookings,
  updateGuest,
  updateBooking as updateBookingService,
  createBooking as createBookingService,
} from './data-service';
import { redirect } from 'next/navigation';

export async function createBooking(bookingData, formData) {
  console.log('createBooking: ', formData);

  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData
      .get('observations')
      .slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  console.log(newBooking);

  createBookingService(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankyou');
}

export async function updateProfile(prevState, formData) {
  console.log('Server action: ', formData);

  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData
    .get('nationality')
    .split('%');

  if (
    prevState.nationalID === nationalID &&
    prevState.nationality === nationality
  )
    return prevState;

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data } = await updateGuest(
    session.user.guestId,
    updateData,
  );

  revalidatePath('/account/profile');

  return data;
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(
    session.user.guestId,
  );
  const guestBookingIds = guestBookings.map((b) => b.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error(
      'You are now allowed to delete this booking',
    );

  const data = await deleteBookingService(bookingId);

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  console.log('updateBooking: ', formData);
  const bookingId = Number(formData.get('bookingId'));
  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData
      .get('observations')
      .slice(0, 1000),
  };

  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(
    session.user.guestId,
  );
  const guestBookingIds = guestBookings.map((b) => b.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error(
      'You are now allowed to delete this booking',
    );

  await updateBookingService(bookingId, updateData);
  redirect('/account/reservations');
}

export async function singInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirect: '/' });
}
