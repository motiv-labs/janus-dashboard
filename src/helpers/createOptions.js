import R from 'ramda';

const createOptions = (list1, list2) => {
    const isPresent = el => !!el;
    const optionFromOne = item => ({
        label: item,
        value: item,
    });
    const optionFromTwo = item => ({
        label: item[1],
        value: item[0],
    });

    if (isPresent(list2)) return R.zip(list1, list2).map(optionFromTwo);

    return R.map(optionFromOne, list1);

    // isPresent(list2) ?
    //     R.zip(list1, list2).map(optionFromTwo) :
    //     R.map(optionFromOne, list1);
};

export default createOptions;
