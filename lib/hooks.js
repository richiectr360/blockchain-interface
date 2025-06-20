import {useDispatch, useSelector, useStore } from 'react-redux';

//Use throughout the app
export const useAppDispatch = () => useDispatch.withTypes();
export const useAppSelector = () => useSelector.withTypes();
export const useAppStore = () => useStore.withTypes();

