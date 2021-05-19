import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';
import { InteractionManager } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import configureStore from './configureStore';

export type AppStore = ReturnType<typeof configureStore>['store'];
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useBaseFetching = (actionCreator: () => any, isInitFetching = true) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(isInitFetching);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // dont have to refetch again
        if (!isInitFetching) {
            return;
        }

        InteractionManager.runAfterInteractions(() => {
            const dispatcher = dispatch(actionCreator());

            dispatcher.then(() => {
                setLoading(false);
            });

            return () => {
                dispatcher.abort();
                setLoading(false);
            };
        });
    }, [isInitFetching]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await dispatch(actionCreator());
        setRefreshing(false);
    }, []);

    return { loading, setLoading, refreshing, onRefresh };
};

export const useLoadMore = (props: {
    currentPage: number;
    canNextPage: boolean;
    actionCreator: (page?: number) => any;
}) => {
    const [loadMore, setLoadMore] = useState(false);
    const dispatch = useAppDispatch();

    const onLoadMore = useCallback(async () => {
        if (!props.canNextPage || loadMore) {
            return false;
        }

        setLoadMore(true);
        await dispatch(props.actionCreator(props.currentPage + 1));
        setLoadMore(false);
    }, [props.currentPage, props.canNextPage, loadMore]);

    return { loadMore, onLoadMore };
};

export const useBaseDetailFetching = <T = any>(actionCreator: () => any) => {
    const [detail, setDetail] = useState<T | null>(null);
    const [loading, SetLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        InteractionManager.runAfterInteractions(async () => {
            try {
                const response = unwrapResult(await dispatch(actionCreator()));
                setDetail(response);
                SetLoading(false);
            } catch (err) {
                SetLoading(false);
            }
        });
    }, []);

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);
            const response = unwrapResult(await dispatch(actionCreator()));
            setDetail(response);
            setRefreshing(false);
        } catch (err) {
            setRefreshing(false);
        }
    }, [actionCreator]);

    return { detail, setDetail, loading, refreshing, onRefresh };
};
