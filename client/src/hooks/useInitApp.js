import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectFilteredTasks } from '../store/dataSlice';

export const useInitApp = (setLoading, setError) => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectFilteredTasks);

    useEffect(() => {
        const init = async () => {
            if (tasks.length === 0) {
                setLoading(true);
                try {
                    await dispatch(fetchTasks()).unwrap();
                } catch (err) {
                    setError(err.message || 'Failed to load tasks');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        init();
    }, [dispatch, tasks.length, setLoading, setError]);
};
