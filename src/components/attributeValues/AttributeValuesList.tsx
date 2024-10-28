import React, {useEffect, useState} from "react";
import {RootState, useAppDispatch} from "@/store/store";
import {useSelector} from "react-redux";
import {fetchAttributeValues} from "@/slice/attributeValuesSlice"; // Adjust the import path as necessary
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

interface AttributeValueListProps {
    attributeId: number;
}

const AttributeValueList: React.FC<AttributeValueListProps> = ({attributeId}) => {
    const dispatch = useAppDispatch();
    const attributeValues = useSelector(
        (state: RootState) => state.attributeValues.attributeValues
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(fetchAttributeValues(attributeId));
            setLoading(false);
        };

        fetchData();
    }, [dispatch, attributeId]);

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Attribute
                    Value
                    List
                < /h4>
            < /div>

            < div
                className="border-t border-stroke px-4 py-4.5 dark:border-strokedark">
                <div className="flex items-center">
                    <p className="font-medium"> Attribute
                        Value < /p>
                < /div>
            < /div>

            {
                loading ? (
                        Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    className="border-t border-stroke px-4 py-4.5 dark:border-strokedark"
                                    key={index}
                                >
                                    <div className="flex items-center">
                                        <Skeleton width={200}
                                        />
                                    < /div>
                                < /div>
                            ))
                    ) :
                    (
                        attributeValues.map((value) => (
                            <div
                                className="border-t border-stroke px-4 py-4.5 dark:border-strokedark"
                                key={value.id}
                            >
                                <div className="flex items-center">
                                    <p className="text-sm text-black dark:text-white"> {value.value} < /p>
                                < /div>
                            < /div>
                        ))
                    )
            }
            <Link href={'values/add'}>Add new term</Link>
        </div>
    )
};

export default AttributeValueList;
