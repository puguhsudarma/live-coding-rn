import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/storeHooks';

export const useDetailProfile = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const profile = useAppSelector((state) => state.account.profile);

    return { loading, profile };
};
