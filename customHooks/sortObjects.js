export const sortAddsByDate = (input) => {
    const timestampsArray = [];
    const outputArray = [];
    input.forEach((el) => {
        timestampsArray.push(el.timestampFrom.seconds)
    });
    timestampsArray.sort((a, b) => a - b);
    timestampsArray.forEach((el) => {
        input.forEach((inputEl) => {
            if(el === inputEl.timestampFrom.seconds) {
                outputArray.push(inputEl);
            }
        });
    });
    console.log("timestamps", timestampsArray);
    return outputArray;
};